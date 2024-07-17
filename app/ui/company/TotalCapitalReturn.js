import ApexStackedBarChart from "@/app/components/ApexBarChartComponent";
import { formatCompanyData, formatNumber } from "@/app/lib/utils";
import { useState } from "react";

export default function TotalCapitalReturn({zPrev, zFirst, zSecond, zThird, zFourth}) {
    const [showChart, setShowChart] = useState(false);


    const chartData = [
        { "Dividend" : [zPrev?.dividend, zFirst?.dividend, zSecond?.dividend, zThird?.dividend] },
        { "Share Buyback" : [zPrev?.share_buyback, zFirst?.share_buyback, zSecond?.share_buyback, zThird?.share_buyback] }
    ];

    console.log('chartData', chartData);
    console.log('xAxis', [`FY${zPrev.year_2digit}`, `FY${zFirst.year_2digit}`, `FY${zThird.year_2digit}`, `FY${zFourth.year_2digit}`]);
    return (<>
        <div className="card total-cap-return flex-fill">
            <div className='d-flex align-items-center'>
                <h4 className='flex-grow-1 mb-0'>Total capital return</h4>
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
                            <th>{`FY${zPrev.year_2digit}`}</th>
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
                        <td className="font-medium">Total Cap Return</td>
                        <td className="font-medium">{formatNumber(zPrev?.total_capital_return)}</td>
                        <td className="font-medium">{formatNumber(zFirst?.total_capital_return)}</td>
                        <td className="font-medium">{formatNumber(zSecond?.total_capital_return)}</td>
                        <td className="font-medium">{formatNumber(zThird?.total_capital_return)}</td>
                        </tr>
                        <tr>
                        <td>Net inc year before</td>
                        <td>{formatNumber(zPrev?.net_income)}</td>
                        <td>{formatNumber(zFirst?.net_income)}</td>
                        <td>{formatNumber(zSecond?.net_income)}</td>
                        <td>{formatNumber(zThird?.net_income)}</td>
                        </tr>
                        <tr>
                        <td className="font-medium">Capital payout (%)</td>
                        <td className="font-medium">{formatNumber(zPrev?.capital_payout_percent, true)}</td>
                        <td className="font-medium">{formatNumber(zFirst?.capital_payout_percent, true)}</td>
                        <td className="font-medium">{formatNumber(zSecond?.capital_payout_percent, true)}</td>
                        <td className="font-medium">{formatNumber(zThird?.capital_payout_percent, true)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            }
        </div>    
    </>
    );
}