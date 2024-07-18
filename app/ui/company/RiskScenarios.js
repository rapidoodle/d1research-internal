import { formatNumber } from "@/app/lib/utils";

export default function RiskScenarios({zFirst, zSecond, zThird, zFourth}) {
    return (<>
        <div className="card flex-fill">
            <h4>Risk scenarios</h4>
            <hr />
            <div className="table-responsive">
                <table className="table table-responsive">
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
                            <td>{formatNumber(zFirst?.very_bear_z)}</td>
                            <td>{formatNumber(zSecond?.very_bear_z)}</td>
                            <td>{formatNumber(zThird?.very_bear_z)}</td>
                            <td>{formatNumber(zFourth?.very_bear_z)}</td>
                        </tr>
                        <tr>
                            <td>Bear (20%)</td>
                            <td>{formatNumber(zFirst?.bear_z)}</td>
                            <td>{formatNumber(zSecond?.bear_z)}</td>
                            <td>{formatNumber(zThird?.bear_z)}</td>
                            <td>{formatNumber(zFourth?.bear_z)}</td>
                        </tr>
                        <tr>
                            <td>Central (40%)</td>
                            <td>{formatNumber(zFirst?.dps_z)}</td>
                            <td>{formatNumber(zSecond?.dps_z)}</td>
                            <td>{formatNumber(zThird?.dps_z)}</td>
                            <td>{formatNumber(zFourth?.dps_z)}</td>
                        </tr>
                        <tr>
                            <td>Bull (20%)</td>
                            <td>{formatNumber(zFirst?.bull_z)}</td>
                            <td>{formatNumber(zSecond?.bull_z)}</td>
                            <td>{formatNumber(zThird?.bull_z)}</td>
                            <td>{formatNumber(zFourth?.bull_z)}</td>
                        </tr>
                        <tr>
                            <td>V Bull (10%)</td>
                            <td>{formatNumber(zFirst?.z_very_bull)}</td>
                            <td>{formatNumber(zSecond?.z_very_bull)}</td>
                            <td>{formatNumber(zThird?.z_very_bull)}</td>
                            <td>{formatNumber(zFourth?.z_very_bull)}</td>
                        </tr>
                        <tr>
                            <td>Risk adj. DPS</td>
                            <td>{formatNumber(zFirst?.risk_adj_dps_z)}</td>
                            <td>{formatNumber(zSecond?.risk_adj_dps_z)}</td>
                            <td>{formatNumber(zThird?.risk_adj_dps_z)}</td>
                            <td>{formatNumber(zFourth?.risk_adj_dps_z)}</td>
                        </tr>
                        <tr className='highlight'>
                            <td>Difference to Central</td>
                            <td>-</td>
                            <td>-3%</td>
                            <td>-5%</td>
                            <td>-8%</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </>
    );
}