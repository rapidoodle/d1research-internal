import ApexLineChartComponent from "@/app/components/ApexLineChartComponent";
import { formatNumber, formatPercentage, formatWholeNumber } from "@/app/lib/utils";
import { useEffect, useState } from "react";

export default function PeerComparisonDPSPayoutRatio({zPrev, zFirst, zSecond, zThird, zFourth}) {

    const [peersDPS, setPeersDPS] = useState([]);
    const [chartSeries, setChartSeries] = useState([]);
    const [showChart, setShowChart] = useState(false);
    const formatChartNumber = (value) => {
        return formatWholeNumber(value);
    }

    useEffect(() => {

        const fetchPeerDPS = async () => {
            const peers = []

            for (let i = 1; i <= 4; i++) {
                const peer = zFirst[`peer_${i}`];
                if (peer && peer !== 'n/a') {
                    peers.push(peer);
                }
            }

                const responses = await Promise.all(peers.map(async (peer) => {

                    if(peer !== 'n/a'){
                        const query = `/api/financial-data?equity_ticker=${peer}&type=peer`;
                        const data = await fetch(query);
                        return await data.json();
                    }else{
                        return [];
                    }

                }));
            
                // Update state with all responses at once
                setPeersDPS(responses);

                const chartSeriesData = responses.map((companyData)=> {
                    console.log(companyData);
                    if(companyData){
                        return {
                            name: companyData[0]?.equity_ticker,
                            data: companyData.map((item, i) => {
                                return Math.round(Number(item.dps_payout_ratio.replace('%', '')))
                            }
                        )};
                    }

                });

                chartSeriesData.push({
                    name: zPrev.equity_ticker,
                    data: [zPrev.dps_payout_ratio, zFirst.dps_payout_ratio, zSecond.dps_payout_ratio, zThird.dps_payout_ratio, zFourth.dps_payout_ratio]
                });  
                
                setChartSeries(chartSeriesData);
        }

        fetchPeerDPS();
    }, [zFirst, zSecond, zThird, zFourth]);

    return (<>
        <div className="card peer-comparison flex-fill">
            <div className='d-flex align-items-center'>
                <h5 className='flex-grow-1 mb-0'>Peer comparison DPS payout ratio (%)</h5>
                {/* { peersDPS.length > 0 && <a className='page-link me-2' onClick={() => setShowChart(!showChart)}>View {showChart ? 'table' : 'chart'}</a> } */}
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
                        <tr className="tr-bold">
                            <td>{zPrev.equity_ticker}</td>
                            <td>{zPrev.dps_payout_ratio}</td>
                            <td>{zFirst.dps_payout_ratio}</td>
                            <td>{zSecond.dps_payout_ratio}</td>
                            <td>{zThird.dps_payout_ratio}</td>
                        </tr>
                        {peersDPS.map((peer, index) => {
                            //reverse peers to show the latest year first
                            return (
                                <tr key={index}>
                                    <td>{peer[0]?.equity_ticker
                                    }</td>
                                    <td>{peer[0]?.dps_payout_ratio}</td>
                                    <td>{peer[3]?.dps_payout_ratio}</td>
                                    <td>{peer[2]?.dps_payout_ratio}</td>
                                    <td>{peer[1]?.dps_payout_ratio}</td>
                                </tr>
                            );

                        })}
                        {/* {!peersDPS.length &&
                        <tr>
                            <td colSpan={5} align="center" className="pt-4">No records found</td>
                        </tr>
                        } */}
                    </tbody>
                </table>
            </div>
            </> :
            // <>{JSON.stringify(chartSeries)}</>
            <ApexLineChartComponent
                xaxisData={[`FY${zPrev.year_2digit}`, `FY${zFirst.year_2digit}`, `FY${zSecond.year_2digit}`, `FY${zThird.year_2digit}`, `FY${zFourth.year_2digit}`]}
                seriesData={chartSeries}
            />
            }
        </div>    
    </>
    );
}