import { fomatDisplay, format2Decimal, formatNumber, formatWholeNumber } from "@/app/lib/utils";

export default function RiskScenarios({zFirst, zSecond, zThird, zFourth}) {
    return (<>
        <div className="card flex-fill">
            <h5>Risk scenarios</h5>
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
                        <tr>
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
                        <tr>
                            <td>Risk adj. DPS</td>
                            <td>{format2Decimal(zFirst?.risk_adj_dps_z)}</td>
                            <td>{format2Decimal(zSecond?.risk_adj_dps_z)}</td>
                            <td>{format2Decimal(zThird?.risk_adj_dps_z)}</td>
                            <td>{format2Decimal(zFourth?.risk_adj_dps_z)}</td>
                        </tr>
                        <tr className='highlight'>
                            <td className="bg-cream">Difference to Central</td>
                            <td className="bg-cream">{fomatDisplay(zFirst?.difference_to_central_percentage)}</td>
                            <td className="bg-cream">{fomatDisplay(zSecond?.difference_to_central_percentage)}</td>
                            <td className="bg-cream">{fomatDisplay(zThird?.difference_to_central_percentage)}</td>
                            <td className="bg-cream">{fomatDisplay(zFourth?.difference_to_central_percentage)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </>
    );
}