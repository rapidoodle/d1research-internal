import { formatNumber, roundUpNumber } from "@/app/lib/utils";

export default function OverviewFinancials({zPrev, zFirst, zSecond, zThird, zFourth, generalSymbol, dpsSymbol}) {
    return (<>
        < div className="card flex-fill">
            <h5 className="mb-0">Overview financials</h5>
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
                            <div className='bg-gray font-medium'>
                                <span className="d-none d-sm-block">Profit & Loss ({generalSymbol}m)</span>
                                <span className="d-block d-sm-none">P&L ({generalSymbol}m)</span>
                            </div>
                        </td>
                        </tr>
                        <tr>
                        <td>
                            <span className="d-none d-sm-block">Net Income</span>
                            <span className="d-block d-sm-none">NI</span>
                        </td>
                        <td>{roundUpNumber(zPrev?.net_income)}</td>
                        <td>{roundUpNumber(zFirst?.net_income)}</td>
                        <td>{roundUpNumber(zSecond?.net_income)}</td>
                        <td>{roundUpNumber(zThird?.net_income)}</td>
                        
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
                            <div className='bg-gray font-medium'>
                                <span className="d-none d-sm-block">CF Statement ({generalSymbol}m)</span>
                                <span className="d-block d-sm-none">CF ({generalSymbol}m)</span>
                            </div>
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
                        <td>
                            <span className="d-none d-sm-block">Investments</span>
                            <span className="d-block d-sm-none">Inv.</span>
                        </td>
                        <td>{roundUpNumber(zPrev?.capex)}</td>
                        <td>{roundUpNumber(zFirst?.capex)}</td>
                        <td>{roundUpNumber(zSecond?.capex)}</td>
                        <td>{roundUpNumber(zThird?.capex)}</td>
                        </tr>
                        <tr>
                        <td>FCF</td>
                        <td>{roundUpNumber(zPrev?.free_cash_flow)}</td>
                        <td>{roundUpNumber(zFirst?.free_cash_flow)}</td>
                        <td>{roundUpNumber(zSecond?.free_cash_flow)}</td>
                        <td>{roundUpNumber(zThird?.free_cash_flow)}</td>
                        </tr>
                        <tr>
                        <td>Div</td>
                        <td>{roundUpNumber(zPrev?.dividend)}</td>
                        <td>{roundUpNumber(zFirst?.dividend)}</td>
                        <td>{roundUpNumber(zSecond?.dividend)}</td>
                        <td>{roundUpNumber(zThird?.dividend)}</td>
                        </tr>
                        <tr>
                        <td>Share BB</td>
                        <td>{roundUpNumber(zPrev?.share_buyback)}</td>
                        <td>{roundUpNumber(zFirst?.share_buyback)}</td>
                        <td>{roundUpNumber(zSecond?.share_buyback)}</td>
                        <td>{roundUpNumber(zThird?.share_buyback)}</td>
                        </tr>
                        <tr>
                        <td colSpan={5} className='px-0 second-title'>
                            <div className='bg-gray font-medium'>B/S ({generalSymbol}m)</div>
                        </td>
                        </tr>
                        <tr>
                        <td>
                            <span className="d-none d-sm-block">Net Cash / (Debt)</span>
                            <span className="d-block d-sm-none">Net (Debt)</span>
                        </td>
                        <td>{roundUpNumber(zPrev?.net_debt)}</td>
                        <td>{roundUpNumber(zFirst?.net_debt)}</td>
                        <td>{roundUpNumber(zSecond?.net_debt)}</td>
                        <td>{roundUpNumber(zThird?.net_debt)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </>
    );
}