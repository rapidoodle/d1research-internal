import DataTableComponent from "../components/DataTablesComponent";
import { financialDataColumns } from "../lib/table-columns/columns";

export function FinancialDataTableSkeleton() {


    return (
      <table className="table">
        <thead>
          <tr>
            {financialDataColumns.map((column, index) => (
              <th key={index}>{column.name}</th>
            ))}
          </tr>
        </thead>
            <tbody>
              {Array.from({ length: 5 }).map((_, rowIndex) => (
                <tr key={rowIndex}>
                  {Array.from({ length: financialDataColumns.length }).map((_, colIndex) => (
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
      );
  }

  export function CompaniesTableSkeleton() {
    const columns = ['Company name', 'Sector', 'Tags', ''];

    return (
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                {columns.map((column, index) => (
                  <th key={index}>
                    <div className="shimmer-wrapper mt-3">
                      <div className="shimmer">
                    </div>
              </div></th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 5 }).map((_, rowIndex) => (
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


  export function EventsTableSkeleton() {
    const columns = ['Company', 'Title', 'Start date', 'End date', 'Location', 'Tags'];

    return (
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                {columns.map((column, index) => (
                  <th key={index}>
                    <div className="shimmer-wrapper mt-3">
                      <div className="shimmer">
                    </div>
              </div></th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 5 }).map((_, rowIndex) => (
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