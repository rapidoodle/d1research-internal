import { formatCompanyData } from "@/app/lib/utils";

export default function ShareCapital({zFirst, zSecond, zThird, zFourth}) {
    return (<>
        <div className="card share-capital flex-fill">
            <h4>Share Capital</h4>
            <hr />
            <table>
            <thead>
                <tr>
                <th></th>
                <th>FY23</th>
                <th>FY24</th>
                <th>FY25</th>
                <th>FY26</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>Shares in issue</td>
                <td>{formatCompanyData(zFirst?.share_in_issue)}</td>
                <td>{formatCompanyData(zSecond?.share_in_issue)}</td>
                <td>{formatCompanyData(zThird?.share_in_issue)}</td>
                <td>{formatCompanyData(zFourth?.share_in_issue)}</td>
                </tr>
                <tr>
                <td>Treasury shares</td>
                <td>{formatCompanyData(zFirst?.treasury_shares)}</td>
                <td>{formatCompanyData(zSecond?.treasury_shares)}</td>
                <td>{formatCompanyData(zThird?.treasury_shares)}</td>
                <td>{formatCompanyData(zFourth?.treasury_shares)}</td>
                </tr>
                <tr>
                <td>Shares outstanding</td>
                <td>{formatCompanyData(zFirst?.shares_outstanding)}</td>
                <td>{formatCompanyData(zSecond?.shares_outstanding)}</td>
                <td>{formatCompanyData(zThird?.shares_outstanding)}</td>
                <td>{formatCompanyData(zFourth?.shares_outstanding)}</td>
                </tr>
                <tr>
                <td>Av. Weigh. Sh. cap</td>
                <td>{formatCompanyData(zFirst?.av_weighted_share_cap)}</td>
                <td>{formatCompanyData(zSecond?.av_weighted_share_cap)}</td>
                <td>{formatCompanyData(zThird?.av_weighted_share_cap)}</td>
                <td>{formatCompanyData(zFourth?.av_weighted_share_cap)}</td>
                </tr>
            </tbody>
            </table>
        </div>    
    </>
    );
}