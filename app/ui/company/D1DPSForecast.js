import { formatNumber } from "@/app/lib/utils";

export default function D1DPSForecast({zFirst, zSecond, zThird, zFourth}) {
    return (
    <div className="card dps-forecast flex-fill">
        <h4>D1 DPS forecast</h4>
        <hr />
        <div className="table-responsive">
          <table className='table table-responsive'>
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
                <td className="font-medium">DPS forecast</td>
                <td>{formatNumber(zFirst?.dps_z)}</td>
                <td>{formatNumber(zSecond?.dps_z)}</td>
                <td>{formatNumber(zThird?.dps_z)}</td>
                <td>{formatNumber(zFourth?.dps_z)}</td>
              </tr>
              <tr>
                <td className="font-medium">Current Price</td>
                <td>{formatNumber(zFirst?.current_price_z)}</td>
                <td>{formatNumber(zSecond?.current_price_z)}</td>
                <td>{formatNumber(zThird?.current_price_z)}</td>
                <td>{formatNumber(zFourth?.current_price_z)}</td>
              </tr>
              <tr>
                <td className="bg-cream font-medium">Difference %</td>
                <td className="bg-cream">0%</td>
                <td className='bg-cream'>3%</td>
                <td className='bg-cream text-danger'>-7%</td>
                <td className='bg-cream text-success'>17%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
}