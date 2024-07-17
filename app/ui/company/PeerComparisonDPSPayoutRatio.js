import ApexLineChartComponent from "@/app/components/ApexLineChartComponent";
import { formatNumber } from "@/app/lib/utils";
import { useEffect, useState } from "react";

export default function PeerComparisonDPSPayoutRatio({zPrev, zFirst, zSecond, zThird, zFourth}) {

    const [peersDPS, setPeersDPS] = useState([]);
    const [chartSeries, setChartSeries] = useState([]);
    const [showChart, setShowChart] = useState(false);

    useEffect(() => {

        const fetchPeerDPS = async () => {
            const peers = []

            for (let i = 1; i <= 4; i++) {
                const peer = zFirst[`peer_${i}`];
                if (peer) {
                    peers.push(peer);
                }
            }
            const responses = await Promise.all(peers.map(async (peer) => {
                const query = `/api/financial-data?equity_ticker=${peer}&type=peer`;
                const data = await fetch(query);
                return await data.json();
            }));
        
            // Update state with all responses at once
            setPeersDPS(responses);

            const chartSeries = responses.map(companyData => {
                return {
                name: companyData[0].equity_ticker,
                data: companyData.map(item => item.dps_z)
                };
            });

            setChartSeries(chartSeries);
            
        }

        fetchPeerDPS();
    }, [zFirst, zSecond, zThird, zFourth]);

    return (<>
        <div className="card peer-comparison flex-fill">
            <div className='d-flex align-items-center'>
                <h4 className='flex-grow-1 mb-0'>Peer comparison DPS payout ratio (%)</h4>
                <a className='page-link me-2' onClick={() => setShowChart(!showChart)}>View {showChart ? 'table' : 'chart'}</a>
            </div>
            <hr />
            {!showChart ? 
            <>
            <div className="table-responsive">
                <table className="table table-responsive">
                    <thead>
                        <tr>
                            <th>Ticker</th>
                            <th>{`FY${zPrev.year_2digit}`}</th>
                            <th>{`FY${zFirst.year_2digit}`}</th>
                            <th>{`FY${zSecond.year_2digit}`}</th>
                            <th>{`FY${zThird.year_2digit}`}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {peersDPS.map((peer, index) => {
                            //reverse peers to show the latest year first
                            return (
                                <tr key={index}>
                                    <td>{peer[0].equity_ticker
                                    }</td>
                                    <td>{formatNumber(peer[4].dps_z)}</td>
                                    <td>{formatNumber(peer[3].dps_z)}</td>
                                    <td>{formatNumber(peer[2].dps_z)}</td>
                                    <td>{formatNumber(peer[1].dps_z)}</td>
                                </tr>
                            );

                        })}
                        {!peersDPS.length &&
                        <tr>
                            <td colSpan={5} align="center" className="pt-4">No records found</td>
                        </tr>
                        }
                    </tbody>
                </table>
            </div>
            </> :

            <ApexLineChartComponent
                xaxisData={[`FY${zFirst.year_2digit}`, `FY${zSecond.year_2digit}`, `FY${zThird.year_2digit}`, `FY${zFourth.year_2digit}`]}
                seriesData={chartSeries}
            />
            }
        </div>    
    </>
    );
}