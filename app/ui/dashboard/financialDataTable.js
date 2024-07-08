import React, { useEffect, useState, useRef } from 'react';
import { FinancialDataTableSkeleton } from '../skeletons';
import Pagination from '@/app/components/Pagination';
import { formatNumber } from '@/app/lib/utils';

const FinancialDataTable = ({ query, currentPage, fileUploaded }) => {
  const [financialData, setFinancialData] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(currentPage);
  const [pageSize] = useState(10); // You can make this adjustable if needed
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(true);

  const initialRender = useRef(true);

  useEffect(() => {
    const fetchFinancialData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/financial-data?&search=${query}&currentPage=${page}&pageSize=${pageSize}`);
        const data = await response.json();
        setFinancialData(data.data);
        setTotalRecords(data.totalRecords);
        setLoading(false);
        console.log(data);
      } catch (error) {
        console.error('Error fetching financial data:', error);
        setError('Error fetching financial data');
        setLoading(false);
      }
    };

      fetchFinancialData();
    
  }, [query, page, pageSize, fileUploaded]);

  const totalPages = Math.ceil(totalRecords / pageSize);

  if (error) {
    return <p>{error}</p>;
  }

  if (!loading) {
    return (
      <div className="container-fluid">
        <div className='table-responsive'>
          <table className="table table-bordered table-striped">
            <thead>
              <tr className='bg-primary'>
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
                  <td>{formatNumber(row.share_price, false)}</td>
                  <td>{row.div_ticker}</td>
                  <td>{row.p_and_l_fx}</td>
                  <td>{row.div_future_fx}</td>
                  <td>{row.index1}</td>
                  <td>{row.index2}</td>
                  <td>{row.index3}</td>
                  <td>{formatNumber(row.dps_z, false)}</td>
                  <td>{formatNumber(row.current_price_z, false)}</td>
                  <td>{formatNumber(row.discount_premium_percent, true)}</td>
                  <td>{formatNumber(row.annual_return_percent, true)}</td>
                  <td>{formatNumber(row.very_bear_z, false)}</td>
                  <td>{formatNumber(row.bear_z, false)}</td>
                  <td>{formatNumber(row.bull_z, false)}</td>
                  <td>{formatNumber(row.very_bull_z, false)}</td>
                  <td>{formatNumber(row.risk_adj_dps_z, false)}</td>
                  <td>{formatNumber(row.net_income, false)}</td>
                  <td>{formatNumber(row.av_weighted_share_cap, false)}</td>
                  <td>{formatNumber(row.eps, false)}</td>
                  <td>{formatNumber(row.dps_fy, false)}</td>
                  <td>{formatNumber(row.dps_payout_ratio, false)}</td>
                  <td>{formatNumber(row.op_cash_flow, false)}</td>
                  <td>{formatNumber(row.capex, false)}</td>
                  <td>{formatNumber(row.free_cash_flow, false)}</td>
                  <td>{formatNumber(row.dividend, false)}</td>
                  <td>{formatNumber(row.share_buyback, false)}</td>
                  <td>{formatNumber(row.total_capital_return, false)}</td>
                  <td>{formatNumber(row.net_debt, false)}</td>
                  <td>{formatNumber(row.share_in_issue, false)}</td>
                  <td>{formatNumber(row.treasury_shares, false)}</td>
                  <td>{formatNumber(row.shares_outstanding, false)}</td>
                  <td>{formatNumber(row.capital_payout_percent, true)}</td>
                  <td>{formatNumber(row.dps_q1, false)}</td>
                  <td>{formatNumber(row.dps_q2, false)}</td>
                  <td>{formatNumber(row.dps_q3, false)}</td>
                  <td>{formatNumber(row.dps_q4, false)}</td>
                  <td>{row.ex_date_q1}</td>
                  <td>{row.ex_date_q2}</td>
                  <td>{row.ex_date_q3}</td>
                  <td>{row.ex_date_q4}</td>
                </tr>
              ))}
              {financialData.length === 0 && (
                <tr>
                  <td colSpan={44} align='center'>No available data</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <Pagination page={page} totalPages={totalPages} setPage={setPage} />
      </div>
    );
  } else {
    return <FinancialDataTableSkeleton />
  }
};

export default FinancialDataTable;
