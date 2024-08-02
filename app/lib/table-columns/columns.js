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
    { name: 'DPS z', selector: row => row.dps_z, sortable: true },
    { name: 'Current Price z', selector: row => row.current_price_z, sortable: true },
    { name: 'Discount Premium (%)', selector: row => row.discount_premium_percent, sortable: true },
    { name: 'Annual Return (%)', selector: row => row.annual_return_percent, sortable: true },
    { name: 'z Very Bear', selector: row => row.very_bear_z, sortable: true },
    { name: 'z Bear', selector: row => row.bear_z, sortable: true },
    { name: 'z Bull', selector: row => row.bull_z, sortable: true },
    { name: 'z Very Bull', selector: row => row.very_bull_z, sortable: true },
    { name: 'Risk Adj. DPS (z)', selector: row => row.risk_adj_dps_z, sortable: true },
    { name: 'Difference to Central (%)', selector: row => row.difference_to_central_percentage, sortable: true },
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
  

  export const sensitivitiesMapping = {
    "Year": "year",
    "Company": "company",
    "Equity Ticker": "equity_ticker",
    "V Bear": "v_bear",
    "Bear": "bear",
    "Central": "central",
    "Bull": "bull",
    "V Bull": "v_bull",
    "Risk adj.": "risk_adj",
    "Discount to Central (%)": "discount_to_central_percent",
    "Payout % Very Bear": "payout_percent_very_bear",
    "Payout % Bear": "payout_percent_bear",
    "Payout % Central": "payout_percent_central",
    "Payout % Bull": "payout_percent_bull",
    "Payout % Very Bull": "payout_percent_very_bull",
    "Vbe - Sales (m) VBe": "vbe_sales_m_vbe",
    "Vbe - Sales v Central % VBe": "vbe_sales_v_central_percent_vbe",
    "Vbe - Net income (m) Vbe": "vbe_net_income_m_vbe",
    "Vbe - NI margin (%) Vbe": "vbe_ni_margin_percent_vbe",
    "Vbe - NI margin change (bp) Vbe": "vbe_ni_margin_change_bp_vbe",
    "Vbe - AWSC (m) Vbe": "vbe_awsc_m_vbe",
    "Vbe - EPS Vbe": "vbe_eps_vbe",
    "Vbe - EPS v Central % Vbe": "vbe_eps_v_central_percent_vbe",
    "DPS VBe1": "dps_vbe1",
    "DPS VBe2": "dps_vbe2",
    "DPS VBe3": "dps_vbe3",
    "DPS VBe4": "dps_vbe4",
    "DPS VBe5": "dps_vbe5",
    "Be - Sales (m) Be": "be_sales_m_be",
    "Be - Sales v Central % Be": "be_sales_v_central_percent_be",
    "Be - Net income (m) Be": "be_net_income_m_be",
    "Be - NI margin (%) Be": "be_ni_margin_percent_be",
    "Be - NI margin change (bp) Be": "be_ni_margin_change_bp_be",
    "Be - AWSC (m) Be": "be_awsc_m_be",
    "Be - EPS Be": "be_eps_be",
    "Be - EPS v Central % Be": "be_eps_v_central_percent_be",
    "DPS Be1": "dps_be1",
    "DPS Be2": "dps_be2",
    "DPS Be3": "dps_be3",
    "DPS Be4": "dps_be4",
    "DPS Be5": "dps_be5",
    "Ce - Sales (m) Ce": "ce_sales_m_ce",
    "Ce - Sales v Central % Ce": "ce_sales_v_central_percent_ce",
    "Ce - Net income (m) Ce": "ce_net_income_m_ce",
    "Ce - NI margin (%) Ce": "ce_ni_margin_percent_ce",
    "Ce - NI margin change (bp) Ce": "ce_ni_margin_change_bp_ce",
    "Ce - AWSC (m) Ce": "ce_awsc_m_ce",
    "Ce - EPS Ce": "ce_eps_ce",
    "Ce - EPS v Central % Ce": "ce_eps_v_central_percent_ce",
    "DPS Ce1": "dps_ce1",
    "DPS Ce2": "dps_ce2",
    "DPS Ce3": "dps_ce3",
    "DPS Ce4": "dps_ce4",
    "DPS Ce5": "dps_ce5",
    "Bu - Sales (m) Bu": "bu_sales_m_bu",
    "Bu - Sales v Central % Bu": "bu_sales_v_central_percent_bu",
    "Bu - Net income (m) Bu": "bu_net_income_m_bu",
    "Bu - NI margin (%) Bu": "bu_ni_margin_percent_bu",
    "Bu - NI margin change (bp) Bu": "bu_ni_margin_change_bp_bu",
    "Bu - AWSC (m) Bu": "bu_awsc_m_bu",
    "Bu - EPS Bu": "bu_eps_bu",
    "Bu - EPS v Buntral % Bu": "bu_eps_v_buntral_percent_bu",
    "DPS Bu1": "dps_bu1",
    "DPS Bu2": "dps_bu2",
    "DPS Bu3": "dps_bu3",
    "DPS Bu4": "dps_bu4",
    "DPS Bu5": "dps_bu5",
    "VBu - Sales (m) VBu": "vbu_sales_m_vbu",
    "VBu - Sales v Central % VBu": "vbu_sales_v_central_percent_vbu",
    "VBu - Net income (m) VBu": "vbu_net_income_m_vbu",
    "VBu - NI margin (%) VBu": "vbu_ni_margin_percent_vbu",
    "VBu - NI margin change (bp) VBu": "vbu_ni_margin_change_bp_vbu",
    "VBu - AWSC (m) VBu": "vbu_awsc_m_vbu",
    "VBu - EPS VBu": "vbu_eps_vbu",
    "VBu - EPS v Central % VBu": "vbu_eps_v_central_percent_vbu",
    "DPS VBu1": "dps_vbu1",
    "DPS VBu2": "dps_vbu2",
    "DPS VBu3": "dps_vbu3",
    "DPS VBu4": "dps_vbu4",
    "DPS VBu5": "dps_vbu5",
    "Pay24VBe": "pay24vbe",
    "Pay24Be": "pay24be",
    "Pay24C": "pay24c",
    "Pay24Bu": "pay24bu",
    "Pay24VBu": "pay24vbu",
    "Sales24": "sales24",
    "SvC24": "svc24",
    "NI24": "ni24",
    "NIM24": "nim24",
    "NIMc24": "nimc24",
    "AWSC24": "awsc24",
    "EPS24": "eps24",
    "EPSvC24": "epsvc24",
    "Sales25": "sales25",
    "SvC25": "svc25",
    "NI25": "ni25",
    "NIM25": "nim25",
    "NIMc25": "nimc25",
    "AWSC25": "awsc25",
    "EPS25": "eps25",
    "EPSvC25": "epsvc25",
    "Pay25VBe": "pay25vbe",
    "Pay25Be": "pay25be",
    "Pay25C": "pay25c",
    "Pay25Bu": "pay25bu",
    "Pay25VBu": "pay25vbu",
    "Sales26": "sales26",
    "SvC26": "svc26",
    "NI26": "ni26",
    "NIM26": "nim26",
    "NIMc26": "nimc26",
    "AWSC26": "awsc26",
    "EPS26": "eps26",
    "EPSvC26": "epsvc26",
    "Pay26VBe": "pay26vbe",
    "Pay26Be": "pay26be",
    "Pay26C": "pay26c",
    "Pay26Bu": "pay26bu",
    "Pay26VBu": "pay26vbu",
    "2020VBe": "2020vbe",
    "2021VBe": "2021vbe",
    "2022VBe": "2022vbe",
    "2023VBe": "2023vbe",
    "2024VBe": "2024vbe",
    "2025VBe": "2025vbe",
    "2026VBe": "2026vbe",
    "2027VBe": "2027vbe",
    "2020Be": "2020be",
    "2021Be": "2021be",
    "2022Be": "2022be",
    "2023Be": "2023be",
    "2024Be": "2024be",
    "2025Be": "2025be",
    "2026Be": "2026be",
    "2027Be": "2027be",
    "2020Bu": "2020bu",
    "2021Bu": "2021bu",
    "2022Bu": "2022bu",
    "2023Bu": "2023bu",
    "2024Bu": "2024bu",
    "2025Bu": "2025bu",
    "2026Bu": "2026bu",
    "2027Bu": "2027bu",
    "2020VBu": "2020vbu",
    "2021VBu": "2021vbu",
    "2022VBu": "2022vbu",
    "2023VBu": "2023vbu",
    "2024VBu": "2024vbu",
    "2025VBu": "2025vbu",
    "2026VBu": "2026vbu",
    "2027VBu": "2027vbu"
}