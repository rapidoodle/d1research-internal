import formatDate from "@/app/utils";
import { coloredNumber, formatNumber } from "../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

export const financialDataColumns = [  { name: 'Year', selector: row => row.year, sortable: true },
    { name: 'Company', selector: row => row.company, sortable: true },
    { name: 'Sector', selector: row => row.sector, sortable: true },
    { name: 'Equity Ticker', selector: row => row.equity_ticker, sortable: true },
    { name: 'Share Price', selector: row => formatNumber(row.share_price, false), sortable: true },
    { name: 'Div Ticker', selector: row => row.div_ticker, sortable: true },
    { name: 'P&L FX', selector: row => row.p_and_l_fx, sortable: true },
    { name: 'Div Future FX', selector: row => row.div_future_fx, sortable: true },
    { name: 'Index1', selector: row => row.index1, sortable: true },
    { name: 'Index2', selector: row => row.index2, sortable: true },
    { name: 'Index3', selector: row => row.index3, sortable: true },
    { name: 'DPS z', selector: row => formatNumber(row.dps_z, false), sortable: true },
    { name: 'Current Price z', selector: row => formatNumber(row.current_price_z, false), sortable: true },
    { name: 'Discount Premium (%)', selector: row => formatNumber(row.discount_premium_percent, true), sortable: true },
    { name: 'Annual Return (%)', selector: row => formatNumber(row.annual_return_percent, true), sortable: true },
    { name: 'z Very Bear', selector: row => formatNumber(row.very_bear_z, false), sortable: true },
    { name: 'z Bear', selector: row => formatNumber(row.bear_z, false), sortable: true },
    { name: 'z Bull', selector: row => formatNumber(row.bull_z, false), sortable: true },
    { name: 'z Very Bull', selector: row => formatNumber(row.very_bull_z, false), sortable: true },
    { name: 'Risk Adj. DPS (z)', selector: row => formatNumber(row.risk_adj_dps_z, false), sortable: true },
    { name: 'Net Income', selector: row => formatNumber(row.net_income, false), sortable: true },
    { name: 'Av. Weighted Share Cap', selector: row => formatNumber(row.av_weighted_share_cap, false), sortable: true },
    { name: 'EPS', selector: row => formatNumber(row.eps, false), sortable: true },
    { name: 'DPS (FY)', selector: row => formatNumber(row.dps_fy, false), sortable: true },
    { name: 'DPS Payout Ratio', selector: row => formatNumber(row.dps_payout_ratio, false), sortable: true },
    { name: 'Op Cash Flow', selector: row => formatNumber(row.op_cash_flow, false), sortable: true },
    { name: 'Capex', selector: row => formatNumber(row.capex, false), sortable: true },
    { name: 'Free Cash Flow', selector: row => formatNumber(row.free_cash_flow, false), sortable: true },
    { name: 'Dividend', selector: row => formatNumber(row.dividend, false), sortable: true },
    { name: 'Share Buyback', selector: row => formatNumber(row.share_buyback, false), sortable: true },
    { name: 'Total Capital Return', selector: row => formatNumber(row.total_capital_return, false), sortable: true },
    { name: 'Net Debt', selector: row => formatNumber(row.net_debt, false), sortable: true },
    { name: 'Share in Issue', selector: row => formatNumber(row.share_in_issue, false), sortable: true },
    { name: 'Treasury Shares', selector: row => formatNumber(row.treasury_shares, false), sortable: true },
    { name: 'Shares Outstanding', selector: row => formatNumber(row.shares_outstanding, false), sortable: true },
    { name: 'Capital Payout (%)', selector: row => formatNumber(row.capital_payout_percent, true), sortable: true },
    { name: 'DPSQ1', selector: row => formatNumber(row.dps_q1, false), sortable: true },
    { name: 'DPSQ2', selector: row => formatNumber(row.dps_q2, false), sortable: true },
    { name: 'DPSQ3', selector: row => formatNumber(row.dps_q3, false), sortable: true },
    { name: 'DPSQ4', selector: row => formatNumber(row.dps_q4, false), sortable: true },
    { name: 'Ex Date Q1', selector: row => row.ex_date_q1, sortable: true },
    { name: 'Ex Date Q2', selector: row => row.ex_date_q2, sortable: true },
    { name: 'Ex Date Q3', selector: row => row.ex_date_q3, sortable: true },
    { name: 'Ex Date Q4', selector: row => row.ex_date_q4, sortable: true },
  ];

  export const dpsForecastColumns = [{
    name: 'Ticker',
    selector: row => row.equity_ticker,
    sortable: true,
    cell: row => <a href={`https://insider.d1research.com/groups/distribution/notes/annualized_discount/view/activity?ticker=${row.equity_ticker}`} className='d1-link' target='_blank'>{row.equity_ticker}</a>
  },
  {
    name: 'Z4',
    selector: row => row.z1,
    sortable: true,
  },
  {
    name: 'Z5',
    selector: row => row.z2,
    sortable: true,
  },
  {
    name: 'Z6',
    selector: row => row.z3,
    sortable: true,
  },
  {
    name: 'Z7',
    selector: row => row.z4,
    sortable: true,
  }];

  export const annualizedDiscountColumns = [{
    name: 'Ticker',
    selector: row => row.equity_ticker,
    sortable: true,
    
  },
  {
    name: 'Z5',
    selector: row => coloredNumber(row.z6, false, true),
    sortable: true,
  },
  {
    name: 'Z6',
    selector: row => coloredNumber(row.z7, false, true),
    sortable: true,
  },
  {
    name: 'Z7',
    selector: row => coloredNumber(row.z8, false, true),
    sortable: true,
  }];

  export const eventsColumns = [
    {
      name: 'Company',
      selector: row => row.company,
      sortable: true,
    },
    {
      name: 'Title',
      selector: row => row.friendly_name,
      sortable: true,
    },
    {
      name: 'Start date',
      selector: row => formatDate(row.start_date),
      sortable: true,
    },
    {
      name: 'End date',
      selector: row => formatDate(row.end_date),
      sortable: true,
    },
    {
      name: 'Location',
      selector: row => row.location,
      sortable: true,
    },
    {
      name: 'Tags',
      selector: row => row.tags.split(',').map((tag, index) => (
        <span className='badge me-1 badge-tag' key={index}>
          { tag }
        </span>
      )),
      sortable: false,
    },
    {
      name: '',
      cell: row => (
        <button className='btn btn-success btn-sm'>
          <span><FontAwesomeIcon icon={faEdit} /> Edit</span>
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    }
  ];
  