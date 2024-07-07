import { formatCurrencyWithDollar } from "@/app/lib/utils";

export default function OverviewFinancials({zFirst, zSecond, zThird, zFourth}) {
    return (<>
        < div className="card flex-fill">
            <h4>Overview Financials</h4>
            <hr />
            <div className="table-responsive">
                <table className="table table-responsive">
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
                        <td colSpan={5} className='py-4 px-0 second-title'>
                            <div className='bg-gray'>Profit & Loss</div>
                        </td>
                        </tr>
                        <tr>
                        <td>Net income</td>
                        <td>{formatCurrencyWithDollar(zFirst?.net_income)}</td>
                        <td>{formatCurrencyWithDollar(zSecond?.net_income)}</td>
                        <td>{formatCurrencyWithDollar(zThird?.net_income)}</td>
                        <td>{formatCurrencyWithDollar(zFourth?.net_income)}</td>
                        
                        </tr>
                        <tr>
                        <td>AWSC</td>
                        <td>{formatCurrencyWithDollar(zFirst?.av_weighted_share_cap)}</td>
                        <td>{formatCurrencyWithDollar(zSecond?.av_weighted_share_cap)}</td>
                        <td>{formatCurrencyWithDollar(zThird?.av_weighted_share_cap)}</td>
                        <td>{formatCurrencyWithDollar(zFourth?.av_weighted_share_cap)}</td>
                        </tr>
                        <tr>
                        <td>EPS</td>
                        <td>{formatCurrencyWithDollar(zFirst?.eps)}</td>
                        <td>{formatCurrencyWithDollar(zSecond?.eps)}</td>
                        <td>{formatCurrencyWithDollar(zThird?.eps)}</td>
                        <td>{formatCurrencyWithDollar(zFourth?.eps)}</td>
                        </tr>
                        <tr>
                        <td>DPS</td>
                        <td>{formatCurrencyWithDollar(zFirst?.dps_fy)}</td>
                        <td>{formatCurrencyWithDollar(zSecond?.dps_fy)}</td>
                        <td>{formatCurrencyWithDollar(zThird?.dps_fy)}</td>
                        <td>{formatCurrencyWithDollar(zFourth?.dps_fy)}</td>
                        </tr>
                        <tr>
                        <td>Payout %</td>
                        <td>{formatCurrencyWithDollar(zFirst?.dps_payout_ratio)}</td>
                        <td>{formatCurrencyWithDollar(zSecond?.dps_payout_ratio)}</td>
                        <td>{formatCurrencyWithDollar(zThird?.dps_payout_ratio)}</td>
                        <td>{formatCurrencyWithDollar(zFourth?.dps_payout_ratio)}</td>
                        </tr>
                        <tr>
                        <td colSpan={5} className='py-4 px-0 second-title'>
                            <div className='bg-gray'>Cf Statement</div>
                        </td>
                        </tr>
                        <tr>
                        <td>op CF</td>
                        <td>{formatCurrencyWithDollar(zFirst?.op_cash_flow)}</td>
                        <td>{formatCurrencyWithDollar(zSecond?.op_cash_flow)}</td>
                        <td>{formatCurrencyWithDollar(zThird?.op_cash_flow)}</td>
                        <td>{formatCurrencyWithDollar(zFourth?.op_cash_flow)}</td>
                        </tr>
                        <tr className='highlight'>
                        <td>Investments</td>
                        <td>{formatCurrencyWithDollar(zFirst?.capex)}</td>
                        <td>{formatCurrencyWithDollar(zSecond?.capex)}</td>
                        <td>{formatCurrencyWithDollar(zThird?.capex)}</td>
                        <td>{formatCurrencyWithDollar(zFourth?.capex)}</td>
                        </tr>
                        <tr>
                        <td>FCF</td>
                        <td>{formatCurrencyWithDollar(zFirst?.free_cash_flow)}</td>
                        <td>{formatCurrencyWithDollar(zSecond?.free_cash_flow)}</td>
                        <td>{formatCurrencyWithDollar(zThird?.free_cash_flow)}</td>
                        <td>{formatCurrencyWithDollar(zFourth?.free_cash_flow)}</td>
                        </tr>
                        <tr className='highlight'>
                        <td>Div</td>
                        <td>{formatCurrencyWithDollar(zFirst?.dividend)}</td>
                        <td>{formatCurrencyWithDollar(zSecond?.dividend)}</td>
                        <td>{formatCurrencyWithDollar(zThird?.dividend)}</td>
                        <td>{formatCurrencyWithDollar(zFourth?.dividend)}</td>
                        </tr>
                        <tr className='highlight'>
                        <td>Share BB</td>
                        <td>{formatCurrencyWithDollar(zFirst?.share_buyback)}</td>
                        <td>{formatCurrencyWithDollar(zSecond?.share_buyback)}</td>
                        <td>{formatCurrencyWithDollar(zThird?.share_buyback)}</td>
                        <td>{formatCurrencyWithDollar(zFourth?.share_buyback)}</td>
                        </tr>
                        <tr>
                        <td colSpan={5} className='py-4 px-0 second-title'>
                            <div className='bg-gray'>B/S</div>
                        </td>
                        </tr>
                        <tr>
                        <td>Net Cash (incl. Div)</td>
                        <td>{formatCurrencyWithDollar(zFirst?.total_capital_return)}</td>
                        <td>{formatCurrencyWithDollar(zSecond?.total_capital_return)}</td>
                        <td>{formatCurrencyWithDollar(zThird?.total_capital_return)}</td>
                        <td>{formatCurrencyWithDollar(zFourth?.total_capital_return)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </>
    );
}