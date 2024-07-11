import { formatNumber } from "@/app/lib/utils";

export default function D1DPSForecast({zFirst, zSecond, zThird, zFourth}) {
  zFirst.difference = ((zFirst.current_price_z / zFirst.dps_z - 1) * - 1) * 100;
  zSecond.difference = (zSecond.current_price_z / zSecond.dps_z - 1) * - 1;
  zThird.difference = (zThird.current_price_z / zThird.dps_z - 1)  * - 1 ;
  zFourth.difference = (zFourth.current_price_z / zFourth.dps_z - 1)  * - 1 * 100;
  //percentrage format
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
                <td>{formatNumber(zFirst?.difference)}</td>
                <td>{formatNumber(zSecond?.difference)}</td>
                <td>{formatNumber(zThird?.difference)}</td>
                <td>{formatNumber(zFourth?.difference)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
}