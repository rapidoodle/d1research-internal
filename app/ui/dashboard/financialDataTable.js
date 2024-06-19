import React, { useEffect, useState } from 'react';

const FinancialDataTable = ({query, currentPage}) => {
  const [financialData, setFinancialData] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(currentPage);
  const [pageSize] = useState(10); // You can make this adjustable if needed
  const [totalRecords, setTotalRecords] = useState(0);

  useEffect(() => {
    const fetchFinancialData = async () => {
      try {
        const response = await fetch(`/api/financialData?type=financial_data&search=${query}&currentPage=${page}&pageSize=${pageSize}`);
        const data = await response.json();
        setFinancialData(data.data);
        setTotalRecords(data.totalRecords);

        console.log(data);
        
      } catch (error) {
        console.error('Error fetching financial data:', error);
        setError('Error fetching financial data');
      } finally {
      }
    };

    fetchFinancialData();
  }, [query, page, pageSize]);

  const totalPages = Math.ceil(totalRecords / pageSize);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container">
      <div className='table-responsive'>
        <table className="table table-bordered table-striped">
            <thead>
            <tr>
                <th>Year</th>
                <th>Company</th>
                <th>Sector</th>
                <th>Equity Ticker</th>
                <th>Share Price</th>
                <th>Div Ticker</th>
                <th>P&L FX</th>
                <th>Div Future FX</th>
                <th>Index1</th>
                <th>Index2</th>
                <th>Index3</th>
                <th>DPS z</th>
                <th>Current Price z</th>
                <th>Discount Premium (%)</th>
                <th>Annual Return (%)</th>
                <th>z Very Bear</th>
                <th>z Bear</th>
                <th>z Bull</th>
                <th>z Very Bull</th>
                <th>Risk Adj. DPS (z)</th>
                <th>Net Income</th>
                <th>Av. Weighted Share Cap</th>
                <th>EPS</th>
                <th>DPS (FY)</th>
                <th>DPS Payout Ratio</th>
                <th>Op Cash Flow</th>
                <th>Capex</th>
                <th>Free Cash Flow</th>
                <th>Dividend</th>
                <th>Share Buyback</th>
                <th>Total Capital Return</th>
                <th>Net Debt</th>
                <th>Share in Issue</th>
                <th>Treasury Shares</th>
                <th>Shares Outstanding</th>
                <th>Capital Payout (%)</th>
                <th>DPSQ1</th>
                <th>DPSQ2</th>
                <th>DPSQ3</th>
                <th>DPSQ4</th>
                <th>Ex Date Q1</th>
                <th>Ex Date Q2</th>
                <th>Ex Date Q3</th>
                <th>Ex Date Q4</th>
            </tr>
            </thead>
            <tbody>
            {financialData.map((row) => (
                <tr key={row.id}>
                <td>{row.year}</td>
                <td>{row.company}</td>
                <td>{row.sector}</td>
                <td>{row.equity_ticker}</td>
                <td>{row.share_price}</td>
                <td>{row.div_ticker}</td>
                <td>{row.p_and_l_fx}</td>
                <td>{row.div_future_fx}</td>
                <td>{row.index1}</td>
                <td>{row.index2}</td>
                <td>{row.index3}</td>
                <td>{row.dps_z}</td>
                <td>{row.current_price_z}</td>
                <td>{row.discount_premium_percent}</td>
                <td>{row.annual_return_percent}</td>
                <td>{row.very_bear_z}</td>
                <td>{row.bear_z}</td>
                <td>{row.bull_z}</td>
                <td>{row.very_bull_z}</td>
                <td>{row.risk_adj_dps_z}</td>
                <td>{row.net_income}</td>
                <td>{row.av_weighted_share_cap}</td>
                <td>{row.eps}</td>
                <td>{row.dps_fy}</td>
                <td>{row.dps_payout_ratio}</td>
                <td>{row.op_cash_flow}</td>
                <td>{row.capex}</td>
                <td>{row.free_cash_flow}</td>
                <td>{row.dividend}</td>
                <td>{row.share_buyback}</td>
                <td>{row.total_capital_return}</td>
                <td>{row.net_debt}</td>
                <td>{row.share_in_issue}</td>
                <td>{row.treasury_shares}</td>
                <td>{row.shares_outstanding}</td>
                <td>{row.capital_payout_percent}</td>
                <td>{row.dps_q1}</td>
                <td>{row.dps_q2}</td>
                <td>{row.dps_q3}</td>
                <td>{row.dps_q4}</td>
                <td>{row.ex_date_q1}</td>
                <td>{row.ex_date_q2}</td>
                <td>{row.ex_date_q3}</td>
                <td>{row.ex_date_q4}</td>
                </tr>
            ))}
            </tbody>
        </table>
      </div>
      <div className="pagination">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="btn btn-primary"
        >
          Previous
        </button>
        <span className="mx-2">Page {page} of {totalPages}</span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="btn btn-primary"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default FinancialDataTable;
