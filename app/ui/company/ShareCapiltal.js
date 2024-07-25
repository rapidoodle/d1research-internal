import { formatNumber, roundUpNumber } from "@/app/lib/utils";

export default function ShareCapital({zPrev, zFirst, zSecond, zThird, zFourth}) {
    return (<>
        <div className="card share-capital flex-fill">
            <h5>Share capital</h5>
            <hr />
            <div className="table-responsive">
                <table className="table table-responsive aligned-table">
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
                            <td>{zPrev?.share_in_issue}</td>
                            <td>{zFirst?.share_in_issue}</td>
                            <td>{zSecond?.share_in_issue}</td>
                            <td>{zThird?.share_in_issue}</td>
                        </tr>
                        <tr>
                        <td>Treasury shares</td>
                        <td>{formatNumber(zPrev?.treasury_shares)}</td>
                        <td>{formatNumber(zFirst?.treasury_shares)}</td>
                        <td>{formatNumber(zSecond?.treasury_shares)}</td>
                        <td>{formatNumber(zThird?.treasury_shares)}</td>
                        </tr>
                        <tr>
                        <td>Shares outstanding</td>
                        <td>{roundUpNumber(zPrev?.shares_outstanding)}</td>
                        <td>{roundUpNumber(zFirst?.shares_outstanding)}</td>
                        <td>{roundUpNumber(zSecond?.shares_outstanding)}</td>
                        <td>{roundUpNumber(zThird?.shares_outstanding)}</td>
                        </tr>
                        <tr>
                        <td>Avg. weighted shares</td>
                        <td>{roundUpNumber(zPrev?.av_weighted_share_cap)}</td>
                        <td>{roundUpNumber(zFirst?.av_weighted_share_cap)}</td>
                        <td>{roundUpNumber(zSecond?.av_weighted_share_cap)}</td>
                        <td>{roundUpNumber(zThird?.av_weighted_share_cap)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>    
    </>
    );
}