import formatDate from "@/app/utils";
import { coloredNumber, customSortFunction, format2Decimal, formatHeatmap, formatNumber, formatSelectorNumber } from "../utils";
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
    { name: 'D1 Central', selector: row => row.d1_central, sortable: true },
    { name: 'Current Price z', selector: row => row.current_price_z, sortable: true },
    { name: 'Discount Premium (%)', selector: row => row.discount_premium_percent, sortable: true },
    { name: 'Annual Return (%)', selector: row => row.annual_return_percent, sortable: true },
    { name: 'D1 Lower', selector: row => row.d1_lower, sortable: true },
    { name: 'D1 Upper', selector: row => row.d1_upper, sortable: true },
    { name: 'Risk distribution', selector: row => row.risk_distribution, sortable: true },
    { name: 'Risk skew', selector: row => row.risk_skew, sortable: true },
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
    cell: row => format2Decimal(row.z1),
    selector: row => formatSelectorNumber(row.z1),
    sortable: true,
  },
  {
    name: 'Z5',
    cell: row => format2Decimal(row.z2),
    selector: row => formatSelectorNumber(row.z2),
    sortable: true,
  },
  {
    name: 'Z6',
    cell: row => format2Decimal(row.z3),
    selector: row => formatSelectorNumber(row.z3),
    sortable: true,
  },
  {
    name: 'Z7',
    cell: row => format2Decimal(row.z4),
    selector: row => formatSelectorNumber(row.z4),
    sortable: true,
  }];


  export const dpsForecastColumns2 = [{
    name: 'Ticker',
    selector: 'equity_ticker',
    sortable: true,
  },
  {
    name: 'Z4',
    selector: 'z1',
    sortable: true,
  },
  {
    name: 'Z5',
    selector: 'z2',
    sortable: true,
  },
  {
    name: 'Z6',
    selector: 'z3',
    sortable: true,
  },
  {
    name: 'Z7',
    selector: 'z4',
    sortable: true,
  }];


  export const annualizedDiscountColumns = [
    {
      name: 'Ticker',
      selector: row => row.equity_ticker,
      sortable: true,
    },
    {
      name: 'Z5',
      cell: row => formatHeatmap(row.z5),
      selector: row => formatSelectorNumber(row.z5.replace(/%/g, '')),
      sortable: true,
      sortFunction: (rowA, rowB) => customSortFunction(rowA, rowB, 'z5'),
    },
    {
      name: 'Z6',
      cell: row => formatHeatmap(row.z6),
      selector: row => formatSelectorNumber(row.z6.replace(/%/g, '')),
      sortable: true,
      sortFunction: (rowA, rowB) => customSortFunction(rowA, rowB, 'z6'),
    },
    {
      name: 'Z7',
      cell: row => formatHeatmap(row.z7),
      selector: row => formatSelectorNumber(row.z7.replace(/%/g, '')),
      sortable: true,
      sortFunction: (rowA, rowB) => customSortFunction(rowA, rowB, 'z7'),
    },
  ];


  export const annualizedDiscountColumns2 = [{
    name: 'Ticker',
    selector: 'equity_ticker',
    sortable: true,
  },
  {
    name: 'Z5',
    selector: 'z5',
    sortable: true,
  },
  {
    name: 'Z6',
    selector: 'z6',
    sortable: true,
  },
  {
    name: 'Z7',
    selector: 'z7',
    sortable: true,
  }];

  export const pendingEventsColumns = (handleReview, hanldeApprove, handleIgnore, handleDelete) => [
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
      cell: row => formatDate(row.start_date),
      selector: row => new Date(row.start_date),
      sortable: true,
    },
    {
      name: 'End date',
      cell: row => formatDate(row.end_date),
      selector: row => new Date(row.end_date),
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
          <a href="#" className="ms-1 text-warning" onClick={ () => handleIgnore(row) }>Ignore</a>
          <a href="#" className="ms-1 text-danger" onClick={ () => handleDelete(row) }>Delete</a>
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
      name: '#',
      selector: (row, index) => index + 1,
      sortable: false,
      width: '60px',
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
  

  export const sensitivitiesMapping = {
    'Year': 'year',
    'Company': 'company',
    'Equity Ticker': 'equity_ticker',
    'Lower Sales (m)': 'lower_sales_m',
    'Lower Sales v Central %': 'lower_sales_v_central_pct',
    'Lower Net income (m)': 'lower_net_income_m',
    'Lower NI margin (%)': 'lower_ni_margin_pct',
    'Lower NI margin change (bp)': 'lower_ni_margin_change_bp',
    'Lower AWSC (m)': 'lower_awsc_m',
    'Lower EPS': 'lower_eps',
    'Lower EPS v Central %': 'lower_eps_v_central_pct',
    'Lower DPS': 'lower_dps',
    'Lower Payout Ratio': 'lower_payout_ratio',
    'Central Sales (m)': 'central_sales_m',
    'Central Sales v Central %': 'central_sales_v_central_pct',
    'Central Net income (m)': 'central_net_income_m',
    'Central NI margin (%)': 'central_ni_margin_pct',
    'Central NI margin change (bp)': 'central_ni_margin_change_bp',
    'Central AWSC (m)': 'central_awsc_m',
    'Central EPS': 'central_eps',
    'Central EPS v Central %': 'central_eps_v_central_pct',
    'Central DPS': 'central_dps',
    'Central Payout Ratio': 'central_payout_ratio',
    'Upper Sales (m)': 'upper_sales_m',
    'Upper Sales v Central %': 'upper_sales_v_central_pct',
    'Upper Net income (m)': 'upper_net_income_m',
    'Upper NI margin (%)': 'upper_ni_margin_pct',
    'Upper NI margin change (bp)': 'upper_ni_margin_change_bp',
    'Upper AWSC (m)': 'upper_awsc_m',
    'Upper EPS': 'upper_eps',
    'Upper EPS v Central %': 'upper_eps_v_central_pct',
    'Upper DPS': 'upper_dps',
    'Upper Payout Ratio': 'upper_payout_ratio',
    'Lo Q1 Div': 'lower_q1_div',
    'Lo Q2 Div': 'lower_q2_div',
    'Lo Q3 Div': 'lower_q3_div',
    'Lo Q4 Div': 'lower_q4_div',
    'Lo Total': 'lower_total',
    'Ce Q1 Div': 'central_q1_div',
    'Ce Q2 Div': 'central_q2_div',
    'Ce Q3 Div': 'central_q3_div',
    'Ce Q4 Div': 'central_q4_div',
    'Ce Total': 'central_total',
    'Up Q1 Div': 'upper_q1_div',
    'Up Q2 Div': 'upper_q2_div',
    'Up Q3 Div': 'upper_q3_div',
    'Up Q4 Div': 'upper_q4_div',
    'Up Total': 'upper_total'
  };

  
// Generate the DataTable columns definition from sensitivitiesMapping
export const sensitivitiesTableColumns = Object.keys(sensitivitiesMapping).map(key => ({
  name: key,
  selector: row => row[sensitivitiesMapping[key]],
  sortable: true,
}));