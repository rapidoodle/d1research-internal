import { formatCompanyData, formatCurrencyWithDollar } from "@/app/lib/utils";

export default function TotalCapitalReturn({zFirst, zSecond, zThird, zFourth}) {
    return (<>
        <div className="card total-cap-return flex-fill">
            <h4>Total capital return</h4>
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
                    <td>Dividend</td>
                    <td>{formatCurrencyWithDollar(zFirst?.dividend)}</td>
                    <td>{formatCurrencyWithDollar(zSecond?.dividend)}</td>
                    <td>{formatCurrencyWithDollar(zThird?.dividend)}</td>
                    <td>{formatCurrencyWithDollar(zFourth?.dividend)}</td>
                    </tr>
                    <tr>
                    <td>Share Buyback</td>
                    <td>{formatCurrencyWithDollar(zFirst?.share_buyback)}</td>
                    <td>{formatCurrencyWithDollar(zSecond?.share_buyback)}</td>
                    <td>{formatCurrencyWithDollar(zThird?.share_buyback)}</td>
                    <td>{formatCurrencyWithDollar(zFourth?.share_buyback)}</td>
                    </tr>
                    <tr>
                    <td>Total Cap Return</td>
                    <td>{formatCurrencyWithDollar(zFirst?.total_capital_return)}</td>
                    <td>{formatCurrencyWithDollar(zSecond?.total_capital_return)}</td>
                    <td>{formatCurrencyWithDollar(zThird?.total_capital_return)}</td>
                    <td>{formatCurrencyWithDollar(zFourth?.total_capital_return)}</td>
                    </tr>
                    <tr>
                    <td>Net inc per before</td>
                    <td>{formatCurrencyWithDollar(zFirst?.net_debt)}</td>
                    <td>{formatCurrencyWithDollar(zSecond?.net_debt)}</td>
                    <td>{formatCurrencyWithDollar(zThird?.net_debt)}</td>
                    <td>{formatCurrencyWithDollar(zFourth?.net_debt)}</td>
                    </tr>
                    <tr>
                    <td>Capital payout (%)</td>
                    <td>{formatCompanyData(zFirst?.capital_payout_percent, true)}</td>
                    <td>{formatCompanyData(zSecond?.capital_payout_percent, true)}</td>
                    <td>{formatCompanyData(zThird?.capital_payout_percent, true)}</td>
                    <td>{formatCompanyData(zFourth?.capital_payout_percent, true)}</td>
                    </tr>
                </tbody>
            </table>
            </div>
        </div>    
    </>
    );
}