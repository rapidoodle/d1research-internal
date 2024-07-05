import { formatCurrencyWithDollar } from "@/app/lib/utils";

export default function D1DPSForecast({zFirst, zSecond, zThird, zFourth}) {
    return (
    <div className="card dps-forecast flex-fill">
        <h4>D1 DPS forecast</h4>
        <hr />
        <table className='table-responsive'>
          <thead>
            <tr>
              <th></th>
              <th>Z4</th>
              <th>Z5</th>
              <th>Z6</th>
              <th>Z7</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>DPS forecast</td>
              <td>{formatCurrencyWithDollar(zFirst?.dps_z)}</td>
              <td>{formatCurrencyWithDollar(zSecond?.dps_z)}</td>
              <td>{formatCurrencyWithDollar(zThird?.dps_z)}</td>
              <td>{formatCurrencyWithDollar(zFourth?.dps_z)}</td>
            </tr>
            <tr>
              <td>Current Price</td>
              <td>{formatCurrencyWithDollar(zFirst?.current_price_z)}</td>
              <td>{formatCurrencyWithDollar(zSecond?.current_price_z)}</td>
              <td>{formatCurrencyWithDollar(zThird?.current_price_z)}</td>
              <td>{formatCurrencyWithDollar(zFourth?.current_price_z)}</td>
            </tr>
            <tr>
              <td>Difference %</td>
              <td>0%</td>
              <td className='text-danger'>3%</td>
              <td className='text-success'>-7%</td>
              <td className='text-success'>17%</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
}