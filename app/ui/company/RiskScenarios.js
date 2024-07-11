import { formatCompanyData } from "@/app/lib/utils";

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
                        <th>Z4</th>
                        <th>Z5</th>
                        <th>Z6</th>
                        <th>Z7</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>V Bear (10%)</td>
                        <td>{formatCompanyData(zFirst?.z_very_bear)}</td>
                        <td>{formatCompanyData(zSecond?.z_very_bear)}</td>
                        <td>{formatCompanyData(zThird?.z_very_bear)}</td>
                        <td>{formatCompanyData(zFourth?.z_very_bear)}</td>
                        </tr>
                        <tr>
                        <td>Bear (20%)</td>
                        <td>{formatCompanyData(zFirst?.z_bear)}</td>
                        <td>{formatCompanyData(zSecond?.z_bear)}</td>
                        <td>{formatCompanyData(zThird?.z_bear)}</td>
                        <td>{formatCompanyData(zFourth?.z_bear)}</td>
                        </tr>
                        <tr>
                            <td className="font-medium">Central (40%)</td>
                        <td>{formatCompanyData(zFirst?.dps_z)}</td>
                        <td>{formatCompanyData(zSecond?.dps_z)}</td>
                        <td>{formatCompanyData(zThird?.dps_z)}</td>
                        <td>{formatCompanyData(zFourth?.dps_z)}</td>
                        </tr>
                        <tr>
                        <td>Bull (20%)</td>
                        <td>{formatCompanyData(zFirst?.z_bull)}</td>
                        <td>{formatCompanyData(zSecond?.z_bull)}</td>
                        <td>{formatCompanyData(zThird?.z_bull)}</td>
                        <td>{formatCompanyData(zFourth?.z_bull)}</td>
                        </tr>
                        <tr>
                        <td>V Bull (10%)</td>
                        <td>{formatCompanyData(zFirst?.z_very_bull)}</td>
                        <td>{formatCompanyData(zSecond?.z_very_bull)}</td>
                        <td>{formatCompanyData(zThird?.z_very_bull)}</td>
                        <td>{formatCompanyData(zFourth?.z_very_bull)}</td>
                        </tr>
                        <tr>
                        <td className="font-medium">Risk adj. DPS</td>
                        <td className="font-medium">{formatCompanyData(zFirst?.risk_adj_dps_z)}</td>
                        <td className="font-medium">{formatCompanyData(zSecond?.risk_adj_dps_z)}</td>
                        <td className="font-medium">{formatCompanyData(zThird?.risk_adj_dps_z)}</td>
                        <td className="font-medium">{formatCompanyData(zFourth?.risk_adj_dps_z)}</td>
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