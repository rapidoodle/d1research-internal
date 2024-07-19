import { formatNumber } from "@/app/lib/utils";

export default function OverviewFinancials({zPrev, zFirst, zSecond, zThird, zFourth}) {
    return (<>
        < div className="card flex-fill">
            <h5>Overview financials</h5>
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
                        <td colSpan={5} className='px-0 second-title'>
                            <div className='bg-gray font-medium'>Profit & Loss (€m)</div>
                        </td>
                        </tr>
                        <tr>
                        <td>Net income</td>
                        <td>{formatNumber(zPrev?.net_income)}</td>
                        <td>{formatNumber(zFirst?.net_income)}</td>
                        <td>{formatNumber(zSecond?.net_income)}</td>
                        <td>{formatNumber(zThird?.net_income)}</td>
                        
                        </tr>
                        <tr>
                        <td>Avg. weighted shares</td>
                        <td>{formatNumber(zPrev?.av_weighted_share_cap)}</td>
                        <td>{formatNumber(zFirst?.av_weighted_share_cap)}</td>
                        <td>{formatNumber(zSecond?.av_weighted_share_cap)}</td>
                        <td>{formatNumber(zThird?.av_weighted_share_cap)}</td>
                        </tr>
                        <tr>
                        <td>EPS (€)</td>
                        <td>{formatNumber(zPrev?.eps)}</td>
                        <td>{formatNumber(zFirst?.eps)}</td>
                        <td>{formatNumber(zSecond?.eps)}</td>
                        <td>{formatNumber(zThird?.eps)}</td>
                        </tr>
                        <tr>
                        <td>DPS (€)</td>
                        <td>{formatNumber(zPrev?.dps_fy)}</td>
                        <td>{formatNumber(zFirst?.dps_fy)}</td>
                        <td>{formatNumber(zSecond?.dps_fy)}</td>
                        <td>{formatNumber(zThird?.dps_fy)}</td>
                        </tr>
                        <tr>
                        <td>Payout %</td>
                        <td>{formatNumber(zPrev?.dps_payout_ratio)}</td>
                        <td>{formatNumber(zFirst?.dps_payout_ratio)}</td>
                        <td>{formatNumber(zSecond?.dps_payout_ratio)}</td>
                        <td>{formatNumber(zThird?.dps_payout_ratio)}</td>
                        </tr>
                        <tr>
                        <td colSpan={5} className='px-0 second-title'>
                            <div className='bg-gray font-medium'>CF Statement (€m)</div>
                        </td>
                        </tr>
                        <tr>
                        <td>op CF</td>
                        <td>{formatNumber(zFirst?.op_cash_flow)}</td>
                        <td>{formatNumber(zSecond?.op_cash_flow)}</td>
                        <td>{formatNumber(zThird?.op_cash_flow)}</td>
                        <td>{formatNumber(zFourth?.op_cash_flow)}</td>
                        </tr>
                        <tr className='highlight'>
                        <td>Investments</td>
                        <td>{formatNumber(zFirst?.capex)}</td>
                        <td>{formatNumber(zSecond?.capex)}</td>
                        <td>{formatNumber(zThird?.capex)}</td>
                        <td>{formatNumber(zFourth?.capex)}</td>
                        </tr>
                        <tr>
                        <td>FCF</td>
                        <td>{formatNumber(zFirst?.free_cash_flow)}</td>
                        <td>{formatNumber(zSecond?.free_cash_flow)}</td>
                        <td>{formatNumber(zThird?.free_cash_flow)}</td>
                        <td>{formatNumber(zFourth?.free_cash_flow)}</td>
                        </tr>
                        <tr className='highlight'>
                        <td>Div</td>
                        <td>{formatNumber(zFirst?.dividend)}</td>
                        <td>{formatNumber(zSecond?.dividend)}</td>
                        <td>{formatNumber(zThird?.dividend)}</td>
                        <td>{formatNumber(zFourth?.dividend)}</td>
                        </tr>
                        <tr className='highlight'>
                        <td>Share BB</td>
                        <td>{formatNumber(zFirst?.share_buyback)}</td>
                        <td>{formatNumber(zSecond?.share_buyback)}</td>
                        <td>{formatNumber(zThird?.share_buyback)}</td>
                        <td>{formatNumber(zFourth?.share_buyback)}</td>
                        </tr>
                        <tr>
                        <td colSpan={5} className='px-0 second-title'>
                            <div className='bg-gray font-medium'>B/S (€m)</div>
                        </td>
                        </tr>
                        <tr>
                        <td>Net Cash / (Debt)</td>
                        <td>{formatNumber(zFirst?.net_debt)}</td>
                        <td>{formatNumber(zSecond?.net_debt)}</td>
                        <td>{formatNumber(zThird?.net_debt)}</td>
                        <td>{formatNumber(zFourth?.net_debt)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </>
    );
}