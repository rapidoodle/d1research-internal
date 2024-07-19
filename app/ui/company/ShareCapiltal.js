import { formatNumber } from "@/app/lib/utils";

export default function ShareCapital({zPrev, zFirst, zSecond, zThird, zFourth}) {
    return (<>
        <div className="card share-capital flex-fill">
            <h5>Share capital</h5>
            <hr />
            <div className="table-responsive">
                <table className="table table-responsive">
                    <thead>
                    <tr>
                            <th></th>
                            <th>{`FY${zPrev.year_2digit}`}</th>
                            <th>{`FY${zFirst.year_2digit}`}</th>
                            <th>{`FY${zSecond.year_2digit}`}</th>
                            <th>{`FY${zThird.year_2digit}`}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>Shares in issue</td>
                        <td>{formatNumber(zPrev?.share_in_issue)}</td>
                        <td>{formatNumber(zFirst?.share_in_issue)}</td>
                        <td>{formatNumber(zSecond?.share_in_issue)}</td>
                        <td>{formatNumber(zThird?.share_in_issue)}</td>
                        </tr>
                        <tr>
                        <td>Treasury shares</td>
                        <td>{formatNumber(zPrev?.treasury_shares)}</td>
                        <td>{formatNumber(zSecond?.treasury_shares)}</td>
                        <td>{formatNumber(zThird?.treasury_shares)}</td>
                        <td>{formatNumber(zFourth?.treasury_shares)}</td>
                        </tr>
                        <tr>
                        <td>Shares outstanding</td>
                        <td>{formatNumber(zPrev?.shares_outstanding)}</td>
                        <td>{formatNumber(zFirst?.shares_outstanding)}</td>
                        <td>{formatNumber(zSecond?.shares_outstanding)}</td>
                        <td>{formatNumber(zThird?.shares_outstanding)}</td>
                        </tr>
                        <tr>
                        <td>Avg. weighted shares</td>
                        <td>{formatNumber(zPrev?.av_weighted_share_cap)}</td>
                        <td>{formatNumber(zFirst?.av_weighted_share_cap)}</td>
                        <td>{formatNumber(zSecond?.av_weighted_share_cap)}</td>
                        <td>{formatNumber(zThird?.av_weighted_share_cap)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>    
    </>
    );
}