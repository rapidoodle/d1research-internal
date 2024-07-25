import { formatNumber, roundUpNumber } from "@/app/lib/utils";

export default function OverviewFinancials({zPrev, zFirst, zSecond, zThird, zFourth, generalSymbol, dpsSymbol}) {
    return (<>
        < div className="card flex-fill">
            <h5>Overview financials</h5>
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
                        <td colSpan={5} className='px-0 second-title'>
                            <div className='bg-gray font-medium'>Profit & Loss ({generalSymbol}m)</div>
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
                        <td>{roundUpNumber(zPrev?.av_weighted_share_cap)}</td>
                        <td>{roundUpNumber(zFirst?.av_weighted_share_cap)}</td>
                        <td>{roundUpNumber(zSecond?.av_weighted_share_cap)}</td>
                        <td>{roundUpNumber(zThird?.av_weighted_share_cap)}</td>
                        </tr>
                        <tr>
                        <td>EPS ({generalSymbol})</td>
                        <td>{formatNumber(zPrev?.eps)}</td>
                        <td>{formatNumber(zFirst?.eps)}</td>
                        <td>{formatNumber(zSecond?.eps)}</td>
                        <td>{formatNumber(zThird?.eps)}</td>
                        </tr>
                        <tr>
                        <td>DPS ({dpsSymbol})</td>
                        <td>{formatNumber(zPrev?.dps_fy)}</td>
                        <td>{formatNumber(zFirst?.dps_fy)}</td>
                        <td>{formatNumber(zSecond?.dps_fy)}</td>
                        <td>{formatNumber(zThird?.dps_fy)}</td>
                        </tr>
                        <tr>
                        <td>Payout %</td>
                        <td>{zPrev?.dps_payout_ratio}</td>
                        <td>{zFirst?.dps_payout_ratio}</td>
                        <td>{zSecond?.dps_payout_ratio}</td>
                        <td>{zThird?.dps_payout_ratio}</td>
                        </tr>
                        <tr>
                        <td colSpan={5} className='px-0 second-title'>
                            <div className='bg-gray font-medium'>CF Statement ({generalSymbol}m)</div>
                        </td>
                        </tr>
                        <tr>
                        <td>op CF</td>
                        <td>{formatNumber(zPrev?.op_cash_flow)}</td>
                        <td>{formatNumber(zFirst?.op_cash_flow)}</td>
                        <td>{formatNumber(zSecond?.op_cash_flow)}</td>
                        <td>{formatNumber(zThird?.op_cash_flow)}</td>
                        </tr>
                        <tr>
                        <td>Investments</td>
                        <td>{formatNumber(zPrev?.capex)}</td>
                        <td>{formatNumber(zFirst?.capex)}</td>
                        <td>{formatNumber(zSecond?.capex)}</td>
                        <td>{formatNumber(zThird?.capex)}</td>
                        </tr>
                        <tr>
                        <td>FCF</td>
                        <td>{formatNumber(zPrev?.free_cash_flow)}</td>
                        <td>{formatNumber(zFirst?.free_cash_flow)}</td>
                        <td>{formatNumber(zSecond?.free_cash_flow)}</td>
                        <td>{formatNumber(zThird?.free_cash_flow)}</td>
                        </tr>
                        <tr>
                        <td>Div</td>
                        <td>{formatNumber(zPrev?.dividend)}</td>
                        <td>{formatNumber(zFirst?.dividend)}</td>
                        <td>{formatNumber(zSecond?.dividend)}</td>
                        <td>{formatNumber(zThird?.dividend)}</td>
                        </tr>
                        <tr>
                        <td>Share BB</td>
                        <td>{formatNumber(zPrev?.share_buyback)}</td>
                        <td>{formatNumber(zFirst?.share_buyback)}</td>
                        <td>{formatNumber(zSecond?.share_buyback)}</td>
                        <td>{formatNumber(zThird?.share_buyback)}</td>
                        </tr>
                        <tr>
                        <td colSpan={5} className='px-0 second-title'>
                            <div className='bg-gray font-medium'>B/S ({generalSymbol}m)</div>
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