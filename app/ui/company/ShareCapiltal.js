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
                            <td>
                                <span className="d-none d-sm-block">Shares in issue</span>
                                <span className="d-block d-sm-none">Issued</span>
                            </td>
                            <td>{roundUpNumber(zPrev?.share_in_issue)}</td>
                            <td>{roundUpNumber(zFirst?.share_in_issue)}</td>
                            <td>{roundUpNumber(zSecond?.share_in_issue)}</td>
                            <td>{roundUpNumber(zThird?.share_in_issue)}</td>
                        </tr>
                        <tr>
                        <td>
                            <span className="d-none d-sm-block">Treasury shares</span>
                            <span className="d-block d-sm-none">Treasury</span>
                        </td>
                        <td>{roundUpNumber(zPrev?.treasury_shares)}</td>
                        <td>{roundUpNumber(zFirst?.treasury_shares)}</td>
                        <td>{roundUpNumber(zSecond?.treasury_shares)}</td>
                        <td>{roundUpNumber(zThird?.treasury_shares)}</td>
                        </tr>
                        <tr>
                        <td>
                            <span className="d-none d-sm-block">Shares outstanding</span>
                            <span className="d-block d-sm-none">Outstanding</span>
                        </td>
                        <td>{roundUpNumber(zPrev?.shares_outstanding)}</td>
                        <td>{roundUpNumber(zFirst?.shares_outstanding)}</td>
                        <td>{roundUpNumber(zSecond?.shares_outstanding)}</td>
                        <td>{roundUpNumber(zThird?.shares_outstanding)}</td>
                        </tr>
                        <tr>
                        <td>
                            <span className="d-none d-sm-block">Avg. weighted shares</span>
                            <span className="d-block d-sm-none">AWS</span>
                        </td>
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