import { formatCompanyData, formatNumber } from "@/app/lib/utils";

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
                    <td>{formatNumber(zFirst?.dividend)}</td>
                    <td>{formatNumber(zSecond?.dividend)}</td>
                    <td>{formatNumber(zThird?.dividend)}</td>
                    <td>{formatNumber(zFourth?.dividend)}</td>
                    </tr>
                    <tr>
                    <td>Share Buyback</td>
                    <td>{formatNumber(zFirst?.share_buyback)}</td>
                    <td>{formatNumber(zSecond?.share_buyback)}</td>
                    <td>{formatNumber(zThird?.share_buyback)}</td>
                    <td>{formatNumber(zFourth?.share_buyback)}</td>
                    </tr>
                    <tr>
                    <td className="font-medium">Total Cap Return</td>
                    <td className="font-medium">{formatNumber(zFirst?.total_capital_return)}</td>
                    <td className="font-medium">{formatNumber(zSecond?.total_capital_return)}</td>
                    <td className="font-medium">{formatNumber(zThird?.total_capital_return)}</td>
                    <td className="font-medium">{formatNumber(zFourth?.total_capital_return)}</td>
                    </tr>
                    <tr>
                    <td>Net inc per before</td>
                    <td>{formatNumber(zFirst?.net_debt)}</td>
                    <td>{formatNumber(zSecond?.net_debt)}</td>
                    <td>{formatNumber(zThird?.net_debt)}</td>
                    <td>{formatNumber(zFourth?.net_debt)}</td>
                    </tr>
                    <tr>
                    <td className="font-medium">Capital payout (%)</td>
                    <td className="font-medium">{formatCompanyData(zFirst?.capital_payout_percent, true)}</td>
                    <td className="font-medium">{formatCompanyData(zSecond?.capital_payout_percent, true)}</td>
                    <td className="font-medium">{formatCompanyData(zThird?.capital_payout_percent, true)}</td>
                    <td className="font-medium">{formatCompanyData(zFourth?.capital_payout_percent, true)}</td>
                    </tr>
                </tbody>
            </table>
            </div>
        </div>    
    </>
    );
}