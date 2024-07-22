import { formatNumber, formatWholeNumber } from "@/app/lib/utils";

export default function D1DPSForecast({zFirst, zSecond, zThird, zFourth}) {
  zFirst.difference = ((zFirst.current_price_z / zFirst.dps_z - 1) * - 1) * 100;
  zSecond.difference = (zSecond.current_price_z / zSecond.dps_z - 1) * - 1;
  zThird.difference = (zThird.current_price_z / zThird.dps_z - 1)  * - 1 ;
  zFourth.difference = (zFourth.current_price_z / zFourth.dps_z - 1)  * - 1 * 100;
  //percentrage format
    return (
    <div className="card dps-forecast flex-fill">
        <h5>D1 DPS forecast</h5>
        <hr />
        <div className="table-responsive">
          <table className='table table-responsive'>
            <thead>
              <tr>
                <th></th>
                <th>{`Z${zFirst.year_digit}`}</th>
                <th>{`Z${zSecond.year_digit}`}</th>
                <th>{`Z${zThird.year_digit}`}</th>
                <th>{`Z${zFourth.year_digit}`}</th> 
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>DPS forecast</td>
                <td>{formatNumber(zFirst?.dps_z)}</td>
                <td>{formatNumber(zSecond?.dps_z)}</td>
                <td>{formatNumber(zThird?.dps_z)}</td>
                <td>{formatNumber(zFourth?.dps_z)}</td>
              </tr>
              <tr>
                <td>Current Price</td>
                <td>{formatNumber(zFirst?.current_price_z)}</td>
                <td>{formatNumber(zSecond?.current_price_z)}</td>
                <td>{formatNumber(zThird?.current_price_z)}</td>
                <td>{formatNumber(zFourth?.current_price_z)}</td>
              </tr>
              <tr>
                <td className="bg-cream">Difference %</td>
                <td className="bg-cream">{formatWholeNumber(zFirst?.discount_premium_percent, true)}</td>
                <td className="bg-cream">{formatWholeNumber(zSecond?.discount_premium_percent, true)}</td>
                <td className="bg-cream">{formatWholeNumber(zThird?.discount_premium_percent, true)}</td>
                <td className="bg-cream">{formatWholeNumber(zFourth?.discount_premium_percent, true)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
}