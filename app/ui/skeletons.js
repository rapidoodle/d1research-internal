export function FinancialDataTableSkeleton() {
    const columns = [
    'Year', 'Company', 'Sector', 'Equity Ticker', 'Share Price', 'Div Ticker', 'P&L FX', 'Div Future FX', 'Index1', 'Index2', 
    'Index3', 'DPS z', 'Current Price z', 'Discount Premium (%)', 'Annual Return (%)', 'z Very Bear', 'z Bear', 'z Bull', 'z Very Bull',
    'Risk Adj. DPS (z)', 'Net Income', 'Av. Weighted Share Cap', 'EPS', 'DPS (FY)', 'DPS Payout Ratio', 'Op Cash Flow', 'Capex', 
    'Free Cash Flow', 'Dividend', 'Share Buyback', 'Total Capital Return', 'Net Debt', 'Share in Issue', 'Treasury Shares', 
    'Shares Outstanding', 'Capital Payout (%)', 'DPSQ1', 'DPSQ2', 'DPSQ3', 'DPSQ4', 'Ex Date Q1', 'Ex Date Q2', 'Ex Date Q3', 'Ex Date Q4'
    ];

    return (
        <div className="table-responsive">
          <table className="table table-striped table-sm table-condensed">
            <thead>
              <tr>
                {columns.map((column, index) => (
                  <th key={index}><div className="shimmer"></div></th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 10 }).map((_, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map((_, colIndex) => (
                    <td key={colIndex}>
                        <div className="shimmer-wrapper mt-3">
                            <div className="shimmer"></div>
                        </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }