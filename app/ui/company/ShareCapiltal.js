import { formatCompanyData } from "@/app/lib/utils";

export default function ShareCapital({zFirst, zSecond, zThird, zFourth}) {
    return (<>
        <div className="card share-capital flex-fill">
            <h4>Share capital</h4>
            <hr />
            <div className="table-responsive">
                <table className="table table-responsive">
                    <thead>
                    <tr>
                            <th></th>
                            <th>{`FY${zFirst.year_2digit}`}</th>
                            <th>{`FY${zSecond.year_2digit}`}</th>
                            <th>{`FY${zThird.year_2digit}`}</th>
                            <th>{`FY${zFourth.year_2digit}`}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td className="font-medium">Shares in issue</td>
                        <td className="font-medium">{formatCompanyData(zFirst?.share_in_issue)}</td>
                        <td className="font-medium">{formatCompanyData(zSecond?.share_in_issue)}</td>
                        <td className="font-medium">{formatCompanyData(zThird?.share_in_issue)}</td>
                        <td className="font-medium">{formatCompanyData(zFourth?.share_in_issue)}</td>
                        </tr>
                        <tr>
                        <td>Treasury shares</td>
                        <td>{formatCompanyData(zFirst?.treasury_shares)}</td>
                        <td>{formatCompanyData(zSecond?.treasury_shares)}</td>
                        <td>{formatCompanyData(zThird?.treasury_shares)}</td>
                        <td>{formatCompanyData(zFourth?.treasury_shares)}</td>
                        </tr>
                        <tr>
                        <td className="font-medium">Shares outstanding</td>
                        <td className="font-medium">{formatCompanyData(zFirst?.shares_outstanding)}</td>
                        <td className="font-medium">{formatCompanyData(zSecond?.shares_outstanding)}</td>
                        <td className="font-medium">{formatCompanyData(zThird?.shares_outstanding)}</td>
                        <td className="font-medium">{formatCompanyData(zFourth?.shares_outstanding)}</td>
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
        </div>    
    </>
    );
}