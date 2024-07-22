import ApexStackedBarChart from "@/app/components/ApexBarChartComponent";
import { formatCompanyData, formatNumber, formatWholeNumber, getPercentage, roundUpNumber } from "@/app/lib/utils";
import { useState } from "react";

export default function TotalCapitalReturn({zPrev, zFirst, zSecond, zThird, zFourth}) {
    const [showChart, setShowChart] = useState(false);

    const PrevPer = zPrev?.dividend / zPrev?.net_income * 100;
    const FirstPer = zFirst?.dividend / zFirst?.net_income * 100;
    const SecPer = zSecond?.dividend / zSecond?.net_income * 100;
    const ThirdPer = zThird?.dividend / zThird?.net_income * 100;

    const chartData = [
        { "Dividend" : [getPercentage(zPrev.dividend, zPrev.net_income), 
            getPercentage(zFirst.dividend, zFirst.net_income), 
            getPercentage(zSecond.dividend, zSecond.net_income),
            getPercentage(zThird.dividend, zThird.net_income)] },
        { "Share Buyback" : [getPercentage(zPrev.share_buyback, zPrev.net_income), 
            getPercentage(zFirst.share_buyback, zFirst.net_income), 
            getPercentage(zSecond.share_buyback, zSecond.net_income),
            getPercentage(zThird.share_buyback, zThird.net_income)] }
    ];

    return (<>
        <div className="card total-cap-return flex-fill">
            <div className='d-flex align-items-center'>
                <h5 className='flex-grow-1 mb-0'>Total capital return</h5>
                <a className='page-link me-2' onClick={() => setShowChart(!showChart)}>View {showChart ? 'table' : 'chart'}</a>
            </div>
            <hr />
            {showChart ? 
                <ApexStackedBarChart
                    xAxisData={[`FY${zPrev.year_2digit}`, `FY${zFirst.year_2digit}`, `FY${zThird.year_2digit}`, `FY${zFourth.year_2digit}`]} 
                    chartData={chartData}
                /> : 
            <div className="table-responsive">
                <table className="table table-responsive">
                    <thead>
                        <tr>
                            <th></th>
                            <th>{`FY${zPrev.year_2digit}`}e</th>
                            <th>{`FY${zFirst.year_2digit}`}</th>
                            <th>{`FY${zSecond.year_2digit}`}</th>
                            <th>{`FY${zThird.year_2digit}`}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Dividend</td>
                            <td>{formatNumber(zPrev?.dividend)}</td>
                            <td>{formatNumber(zFirst?.dividend)}</td>
                            <td>{formatNumber(zSecond?.dividend)}</td>
                            <td>{formatNumber(zThird?.dividend)}</td>
                        </tr>
                        <tr>
                            <td>Share Buyback</td>
                            <td>{formatNumber(zPrev?.share_buyback)}</td>
                            <td>{formatNumber(zFirst?.share_buyback)}</td>
                            <td>{formatNumber(zSecond?.share_buyback)}</td>
                            <td>{formatNumber(zThird?.share_buyback)}</td>
                        </tr>
                        <tr>
                            <td>Total Cap Return</td>
                            <td>{formatNumber(zPrev?.total_capital_return)}</td>
                            <td>{formatNumber(zFirst?.total_capital_return)}</td>
                            <td>{formatNumber(zSecond?.total_capital_return)}</td>
                            <td>{formatNumber(zThird?.total_capital_return)}</td>
                        </tr>
                        <tr>
                            <td>Net inc year before</td>
                            <td>{formatNumber(zPrev?.net_income)}</td>
                            <td>{formatNumber(zFirst?.net_income)}</td>
                            <td>{formatNumber(zSecond?.net_income)}</td>
                            <td>{formatNumber(zThird?.net_income)}</td>
                        </tr>
                        <tr>
                            <td>Capital payout (%)</td>
                            <td>{roundUpNumber(zPrev?.capital_payout_percent)}</td>
                            <td>{roundUpNumber(zFirst?.capital_payout_percent)}</td>
                            <td>{roundUpNumber(zSecond?.capital_payout_percent)}</td>
                            <td>{roundUpNumber(zThird?.capital_payout_percent)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            }
        </div>    
    </>
    );
}