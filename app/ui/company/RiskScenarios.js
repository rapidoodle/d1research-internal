import { formatCompanyData } from "@/app/lib/utils";

export default function RiskScenarios({zFirst, zSecond, zThird, zFourth}) {
    return (<>
        <div className="card flex-fill">
            <h4>Risk scenarios</h4>
            <hr />
            <table>
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
                <td>Central (40%)</td>
                <td>5.30</td>
                <td>4.75</td>
                <td>4.90</td>
                <td>5.10</td>
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
                <td>Risk adj. DPS</td>
                <td>{formatCompanyData(zFirst?.risk_adj_dps_z)}</td>
                <td>{formatCompanyData(zSecond?.risk_adj_dps_z)}</td>
                <td>{formatCompanyData(zThird?.risk_adj_dps_z)}</td>
                <td>{formatCompanyData(zFourth?.risk_adj_dps_z)}</td>
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
    </>
    );
}