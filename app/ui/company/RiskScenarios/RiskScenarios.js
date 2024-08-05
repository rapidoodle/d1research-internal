import ModalComponent from "@/app/components/ModalComponent";
import { fomatDisplay, format2Decimal, formatColoredPercentDisplay, formatNumber, formatWholeNumber } from "@/app/lib/utils";
import { useEffect, useState } from "react";
import Sensitivities from "./Sensitivities";

export default function RiskScenarios({zFirst, zSecond, zThird, zFourth, allData}) {
    const ticker = allData[0].equity_ticker;
    const companyName = allData[0].company;
    const [sensData, setSensData] = useState([]);
    const [loading, setLoading] = useState (false);
    const [showSens, setShowSens] = useState(false);

    const handleCloseSensitivities = () => setShowSens(false);

    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true);
            const response = await fetch(`/api/sensitivities?equity_ticker=${ticker}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    }
                }
            );
            
            const data = await response.json();
            setSensData(data);
            setLoading(false);

            console.log('Risk scenarios data:', data);
            return data;
        }
        
        fetchEvents();
    }, []);

    return (<>
        <div className="card flex-fill">
            <div className='d-flex align-items-center'>
                <h5 className='flex-grow-1 mb-0'>Risk scenarios</h5>
                {/* { peersDPS.length > 0 && <a className='page-link me-2' onClick={() => setShowChart(!showChart)}>View {showChart ? 'table' : 'chart'}</a> } */}
                {sensData?.length > 0 &&
                <a className='page-link me-2' onClick={() => setShowSens(!showSens)}>View sensitivities</a> 
                }
            </div>
            <hr />
            <div className="table-responsive">
                <table className="table table-responsive aligned-table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>{`Z${zFirst.year_digit}`}</th>
                            <th>{`Z${zSecond.year_digit}`}</th>
                            <th>{`Z${zThird.year_digit}`}</th>
                            <th>{`Z${zFourth.year_digit}`}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>V Bear (10%)</td>
                            <td>{format2Decimal(zFirst?.very_bear_z)}</td>
                            <td>{format2Decimal(zSecond?.very_bear_z)}</td>
                            <td>{format2Decimal(zThird?.very_bear_z)}</td>
                            <td>{format2Decimal(zFourth?.very_bear_z)}</td>
                        </tr>
                        <tr>
                            <td>Bear (20%)</td>
                            <td>{format2Decimal(zFirst?.bear_z)}</td>
                            <td>{format2Decimal(zSecond?.bear_z)}</td>
                            <td>{format2Decimal(zThird?.bear_z)}</td>
                            <td>{format2Decimal(zFourth?.bear_z)}</td>
                        </tr>
                        <tr className="bold-row">
                            <td>Central (40%)</td>
                            <td>{format2Decimal(zFirst?.dps_z)}</td>
                            <td>{format2Decimal(zSecond?.dps_z)}</td>
                            <td>{format2Decimal(zThird?.dps_z)}</td>
                            <td>{format2Decimal(zFourth?.dps_z)}</td>
                        </tr>
                        <tr>
                            <td>Bull (20%)</td>
                            <td>{format2Decimal(zFirst?.bull_z)}</td>
                            <td>{format2Decimal(zSecond?.bull_z)}</td>
                            <td>{format2Decimal(zThird?.bull_z)}</td>
                            <td>{format2Decimal(zFourth?.bull_z)}</td>
                        </tr>
                        <tr>
                            <td>V Bull (10%)</td>
                            <td>{format2Decimal(zFirst?.very_bull_z)}</td>
                            <td>{format2Decimal(zSecond?.very_bull_z)}</td>
                            <td>{format2Decimal(zThird?.very_bull_z)}</td>
                            <td>{format2Decimal(zFourth?.very_bull_z)}</td>
                        </tr>
                        <tr className="bold-row">
                            <td>Risk adj. DPS</td>
                            <td>{format2Decimal(zFirst?.risk_adj_dps_z)}</td>
                            <td>{format2Decimal(zSecond?.risk_adj_dps_z)}</td>
                            <td>{format2Decimal(zThird?.risk_adj_dps_z)}</td>
                            <td>{format2Decimal(zFourth?.risk_adj_dps_z)}</td>
                        </tr>
                        <tr className='highlight'>
                            <td className="bg-cream">Difference to Central</td>
                            <td className="bg-cream">{formatColoredPercentDisplay(zFirst?.difference_to_central_percentage)}</td>
                            <td className="bg-cream">{formatColoredPercentDisplay(zSecond?.difference_to_central_percentage)}</td>
                            <td className="bg-cream">{formatColoredPercentDisplay(zThird?.difference_to_central_percentage)}</td>
                            <td className="bg-cream">{formatColoredPercentDisplay(zFourth?.difference_to_central_percentage)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <ModalComponent
            show={showSens}
            handleClose={handleCloseSensitivities}
            loading={loading}
            size="xl"
            bodyColor='#fefcf8'
            isSavable={false}
            rightTitle={companyName}
            title="Sensitivities">
                <div className="p-3">
                    <Sensitivities 
                        sensData={sensData} 
                        />
                </div>
        </ModalComponent>
    </>
    );
}