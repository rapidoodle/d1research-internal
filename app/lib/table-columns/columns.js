import formatDate from "@/app/utils";
import { coloredNumber, formatNumber } from "../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

// export const financialDataColumns = [  { name: 'Year', selector: row => row.year, sortable: true },
//     { name: 'Company', selector: row => row.company, sortable: true },
//     { name: 'Sector', selector: row => row.sector, sortable: true },
//     { name: 'Equity Ticker', selector: row => row.equity_ticker, sortable: true },
//     { name: 'Share Price', selector: row => formatNumber(row.share_price, false), sortable: true },
//     { name: 'Div Ticker', selector: row => row.div_ticker, sortable: true },
//     { name: 'P&L FX', selector: row => row.p_and_l_fx, sortable: true },
//     { name: 'Div Future FX', selector: row => row.div_future_fx, sortable: true },
//     { name: 'Index1', selector: row => row.index1, sortable: true },
//     { name: 'Index2', selector: row => row.index2, sortable: true },
//     { name: 'Index3', selector: row => row.index3, sortable: true },
//     { name: 'DPS z', selector: row => formatNumber(row.dps_z, false), sortable: true },
//     { name: 'Current Price z', selector: row => formatNumber(row.current_price_z, false), sortable: true },
//     { name: 'Discount Premium (%)', selector: row => formatNumber(row.discount_premium_percent, true), sortable: true },
//     { name: 'Annual Return (%)', selector: row => formatNumber(row.annual_return_percent, true), sortable: true },
//     { name: 'z Very Bear', selector: row => formatNumber(row.very_bear_z, false), sortable: true },
//     { name: 'z Bear', selector: row => formatNumber(row.bear_z, false), sortable: true },
//     { name: 'z Bull', selector: row => formatNumber(row.bull_z, false), sortable: true },
//     { name: 'z Very Bull', selector: row => formatNumber(row.very_bull_z, false), sortable: true },
//     { name: 'Risk Adj. DPS (z)', selector: row => formatNumber(row.risk_adj_dps_z, false), sortable: true },
//     { name: 'Net Income', selector: row => formatNumber(row.net_income, false), sortable: true },
//     { name: 'Av. Weighted Share Cap', selector: row => formatNumber(row.av_weighted_share_cap, false), sortable: true },
//     { name: 'EPS', selector: row => formatNumber(row.eps, false), sortable: true },
//     { name: 'DPS (FY)', selector: row => formatNumber(row.dps_fy, false), sortable: true },
//     { name: 'DPS Payout Ratio', selector: row => formatNumber(row.dps_payout_ratio, false), sortable: true },
//     { name: 'Op Cash Flow', selector: row => formatNumber(row.op_cash_flow, false), sortable: true },
//     { name: 'Capex', selector: row => formatNumber(row.capex, false), sortable: true },
//     { name: 'Free Cash Flow', selector: row => formatNumber(row.free_cash_flow, false), sortable: true },
//     { name: 'Dividend', selector: row => formatNumber(row.dividend, false), sortable: true },
//     { name: 'Share Buyback', selector: row => formatNumber(row.share_buyback, false), sortable: true },
//     { name: 'Total Capital Return', selector: row => formatNumber(row.total_capital_return, false), sortable: true },
//     { name: 'Net Debt', selector: row => formatNumber(row.net_debt, false), sortable: true },
//     { name: 'Share in Issue', selector: row => formatNumber(row.share_in_issue, false), sortable: true },
//     { name: 'Treasury Shares', selector: row => formatNumber(row.treasury_shares, false), sortable: true },
//     { name: 'Shares Outstanding', selector: row => formatNumber(row.shares_outstanding, false), sortable: true },
//     { name: 'Capital Payout (%)', selector: row => formatNumber(row.capital_payout_percent, true), sortable: true },
//     { name: 'DPSQ1', selector: row => formatNumber(row.dps_q1, false), sortable: true },
//     { name: 'DPSQ2', selector: row => formatNumber(row.dps_q2, false), sortable: true },
//     { name: 'DPSQ3', selector: row => formatNumber(row.dps_q3, false), sortable: true },
//     { name: 'DPSQ4', selector: row => formatNumber(row.dps_q4, false), sortable: true },
//     { name: 'Ex Date Q1', selector: row => row.ex_date_q1, sortable: true },
//     { name: 'Ex Date Q2', selector: row => row.ex_date_q2, sortable: true },
//     { name: 'Ex Date Q3', selector: row => row.ex_date_q3, sortable: true },
//     { name: 'Ex Date Q4', selector: row => row.ex_date_q4, sortable: true },
//     { name: 'Peer 1', selector: row => row.peer_1, sortable: true },
//     { name: 'Peer 2', selector: row => row.peer_2, sortable: true },
//     { name: 'Peer 3', selector: row => row.peer_3, sortable: true },
//     { name: 'Peer 4', selector: row => row.peer_4, sortable: true },
//   ];

  //rewrite the columns for the financial data table withhout formatNumber
  export const financialDataColumns = [  { name: 'Year', selector: row => row.year, sortable: true },
    { name: 'Company', selector: row => row.company, sortable: true },
    { name: 'Sector', selector: row => row.sector, sortable: true },
    { name: 'Equity Ticker', selector: row => row.equity_ticker, sortable: true },
    { name: 'Share Price', selector: row => row.share_price, sortable: true },
    { name: 'Div Ticker', selector: row => row.div_ticker, sortable: true },
    { name: 'P&L FX', selector: row => row.p_and_l_fx, sortable: true },
    { name: 'Div Future FX', selector: row => row.div_future_fx, sortable: true },
    { name: 'Index1', selector: row => row.index1, sortable: true },
    { name: 'Index2', selector: row => row.index2, sortable: true },
    { name: 'Index3', selector: row => row.index3, sortable: true },
    { name: 'DPS z', selector: row => row.dps_z, sortable: true },
    { name: 'Current Price z', selector: row => row.current_price_z, sortable: true },
    { name: 'Discount Premium (%)', selector: row => row.discount_premium_percent, sortable: true },
    { name: 'Annual Return (%)', selector: row => row.annual_return_percent, sortable: true },
    { name: 'z Very Bear', selector: row => row.very_bear_z, sortable: true },
    { name: 'z Bear', selector: row => row.bear_z, sortable: true },
    { name: 'z Bull', selector: row => row.bull_z, sortable: true },
    { name: 'z Very Bull', selector: row => row.very_bull_z, sortable: true },
    { name: 'Risk Adj. DPS (z)', selector: row => row.risk_adj_dps_z, sortable: true },
    { name: 'Net Income', selector: row => row.net_income, sortable: true },
    { name: 'Av. Weighted Share Cap', selector: row => row.av_weighted_share_cap, sortable: true },
    { name: 'EPS', selector: row => row.eps, sortable: true },
    { name: 'DPS (FY)', selector: row => row.dps_fy, sortable: true },
    { name: 'DPS Payout Ratio', selector: row => row.dps_payout_ratio, sortable: true },
    { name: 'Op Cash Flow', selector: row => row.op_cash_flow, sortable: true },
    { name: 'Capex', selector: row => row.capex, sortable: true },
    { name: 'Free Cash Flow', selector: row => row.free_cash_flow, sortable: true },
    { name: 'Dividend', selector: row => row.dividend, sortable: true },
    { name: 'Share Buyback', selector: row => row.share_buyback, sortable: true },
    { name: 'Total Capital Return', selector: row => row.total_capital_return, sortable: true },
    { name: 'Net Debt', selector: row => row.net_debt, sortable: true },
    { name: 'Share in Issue', selector: row => row.share_in_issue, sortable: true },
    { name: 'Treasury Shares', selector: row => row.treasury_shares, sortable: true },
    { name: 'Shares Outstanding', selector: row => row.shares_outstanding, sortable: true },
    { name: 'Capital Payout (%)', selector: row => row.capital_payout_percent, sortable: true },
    { name: 'DPSQ1', selector: row => row.dps_q1, sortable: true },
    { name: 'DPSQ2', selector: row => row.dps_q2, sortable: true },
    { name: 'DPSQ3', selector: row => row.dps_q3, sortable: true },
    { name: 'DPSQ4', selector: row => row.dps_q4, sortable: true },
    { name: 'Ex Date Q1', selector: row => row.ex_date_q1, sortable: true },
    { name: 'Ex Date Q2', selector: row => row.ex_date_q2, sortable: true },
    { name: 'Ex Date Q3', selector: row => row.ex_date_q3, sortable: true },
    { name: 'Ex Date Q4', selector: row => row.ex_date_q4, sortable: true },
    { name: 'Peer 1', selector: row => row.peer_1, sortable: true },
    { name: 'Peer 2', selector: row => row.peer_2, sortable: true },
    { name: 'Peer 3', selector: row => row.peer_3, sortable: true },
    { name: 'Peer 4', selector: row => row.peer_4, sortable: true }]

  export const dpsForecastColumns = [{
    name: 'Ticker',
    selector: row => row.equity_ticker,
    sortable: true,
    cell: row => <a href={`https://insider.d1research.com/groups/distribution/notes/annualized_discount/view/activity?ticker=${row.equity_ticker}`} className='d1-link' target='_blank'>{row.equity_ticker}</a>
  },
  {
    name: 'Z4',
    selector: row => formatNumber(row.z1),
    sortable: true,
  },
  {
    name: 'Z5',
    selector: row => formatNumber(row.z2),
    sortable: true,
  },
  {
    name: 'Z6',
    selector: row => formatNumber(row.z3),
    sortable: true,
  },
  {
    name: 'Z7',
    selector: row => formatNumber(row.z4),
    sortable: true,
  }];

  export const annualizedDiscountColumns = [{
    name: 'Ticker',
    selector: row => row.equity_ticker,
    sortable: true,
    
  },
  {
    name: 'Z5',
    cell: row => formatNumber(row.z6, false, true),
    selector: row => row.z6,
    sortable: true,
  },
  {
    name: 'Z6',
    cell: row => formatNumber(row.z7, false, true),
    selector: row => row.z7,
    sortable: true,
  },
  {
    name: 'Z7',
    cell: row => formatNumber(row.z8, false, true),
    selector: row => row.z8,
    sortable: true,
  }];

  export const pendingEventsColumns = (handleReview, hanldeApprove, handleIgnore) => [
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
      name: 'Actions',
      cell: row => (
        <div className="d-flex">
          <a href="#" onClick={ () => handleReview(row) }>Review</a>
          <a href="#" className="ms-1 text-success" onClick={ () => hanldeApprove(row) }>Approve</a>
          <a href="#" className="ms-1 text-danger" onClick={ () => handleIgnore(row) }>Ignore</a>
        </div>
      ),
      ignoreRowClick: true,
      button: true,
    }
  ];

  export const approvedEventsColumns = (handleDelete, handleEdit) => [
    {
      name: 'Title',
      selector: row => row.friendlyName,
      sortable: true,
    },
    {
      name: 'Event date',
      selector: row => row.startDate,
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
      name: 'Actions',
      cell: row => (
        <div className="d-flex" style={{width: '300px'}}>
          <a href="#" className="ms-2 text-danger" onClick={ () => handleDelete(row) }>Delete</a>
        </div>
      ),
      ignoreRowClick: true,
      button: true,
    }
  ];

  export const ignoredEventsColumns = (handleReview, hanldeApprove) => [
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
      name: 'Actions',
      cell: row => (
        <div className="d-flex">
          {/* <a href="#" onClick={ () => handleReview(row) }>Review</a> */}
          <a href="#" className="ms-1 text-success" onClick={ () => hanldeApprove(row) }>Approve</a>
        </div>
      ),
      ignoreRowClick: true,
      button: true,
    }
  ];

  export const companiesTableColumns = [
    {
      name: 'ID',
      selector: row => row.id,
      sortable: true,
      omit: true, // omit this column from being displayed
    },
    {
      name: 'Name',
      selector: row => row.company,
      sortable: true,
    },
    {
      name: 'Equity Ticker',
      selector: row => row.equity_ticker,
      sortable: true,
    },
    {
      name: 'Tags',
      selector: row => row.tags.split(',').map((tag, index) => (
        <span className='badge me-1 badge-tag' key={index}>
          { tag }
        </span>
      )),
      sortable: true,
    },
  ];
  
  