import ApexStackedBarChart from "@/app/components/ApexBarChartComponent";
import { formatCompanyData, formatNumber, formatWholeNumber, getPercentage, roundUpNumber } from "@/app/lib/utils";
import { useState } from "react";

export default function TotalCapitalReturn({zPrev, zFirst, zSecond, zThird, zFourth}) {
    const [showChart, setShowChart] = useState(false);

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
                <a className='page-link me-2 not-printable' onClick={() => setShowChart(!showChart)}>View {showChart ? 'table' : 'chart'}</a>
            </div>
            <hr />
            {showChart ? 
                <ApexStackedBarChart
                    xAxisData={[`FY${zPrev.year_2digit}`, `FY${zFirst.year_2digit}`, `FY${zSecond.year_2digit}`, `FY${zThird.year_2digit}`]} 
                    chartData={chartData}
                /> : 
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
                                <span className="d-none d-sm-block">Dividend</span>
                                <span className="d-block d-sm-none">Div</span>
                            </td>
                            <td>{roundUpNumber(zPrev?.dividend)}</td>
                            <td>{roundUpNumber(zFirst?.dividend)}</td>
                            <td>{roundUpNumber(zSecond?.dividend)}</td>
                            <td>{roundUpNumber(zThird?.dividend)}</td>
                        </tr>
                        <tr>
                            <td>
                                <span className="d-none d-sm-block">Share Buyback</span>
                                <span className="d-block d-sm-none">Share BB</span>
                            </td>
                            <td>{roundUpNumber(zPrev?.share_buyback)}</td>
                            <td>{roundUpNumber(zFirst?.share_buyback)}</td>
                            <td>{roundUpNumber(zSecond?.share_buyback)}</td>
                            <td>{roundUpNumber(zThird?.share_buyback)}</td>
                        </tr>
                        <tr>
                            <td>
                                <span className="d-none d-sm-block">Total Cap Return</span>
                                <span className="d-block d-sm-none">Cap Return</span>
                            </td>
                            <td>{roundUpNumber(zPrev?.total_capital_return)}</td>
                            <td>{roundUpNumber(zFirst?.total_capital_return)}</td>
                            <td>{roundUpNumber(zSecond?.total_capital_return)}</td>
                            <td>{roundUpNumber(zThird?.total_capital_return)}</td>
                        </tr>
                        <tr>
                            <td>
                                <span className="d-none d-sm-block">Net inc year before</span>
                                <span className="d-block d-sm-none">NI year before</span>
                            </td>
                            <td>{roundUpNumber(zPrev?.net_income)}</td>
                            <td>{roundUpNumber(zFirst?.net_income)}</td>
                            <td>{roundUpNumber(zSecond?.net_income)}</td>
                            <td>{roundUpNumber(zThird?.net_income)}</td>
                        </tr>
                        <tr>
                            <td>
                                <span className="d-none d-sm-block">Capital payout (%)</span>
                                <span className="d-block d-sm-none">Cap Payout (%)</span>
                            </td>
                            <td>{zPrev?.capital_payout_percent}</td>
                            <td>{zFirst?.capital_payout_percent}</td>
                            <td>{zSecond?.capital_payout_percent}</td>
                            <td>{zThird?.capital_payout_percent}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            }
        </div>    
    </>
    );
}