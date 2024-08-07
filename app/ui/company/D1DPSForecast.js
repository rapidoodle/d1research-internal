import { calculatePercent, calculatePercentageColored, format2Decimal, formatNumber, formatWholeNumber } from "@/app/lib/utils";

export default function D1DPSForecast({zFirst, zSecond, zThird, zFourth}) {
  zFirst.difference = ((zFirst.current_price_z / zFirst.d1_central - 1) * - 1) * 100;
  zSecond.difference = (zSecond.current_price_z / zSecond.d1_central - 1) * - 1;
  zThird.difference = (zThird.current_price_z / zThird.d1_central - 1)  * - 1 ;
  zFourth.difference = (zFourth.current_price_z / zFourth.d1_central - 1)  * - 1 * 100;
  //percentrage format
    return (
    <div className="card dps-forecast flex-fill">
        <h5>D1 DPS forecast</h5>
        <hr />
        <div className="table-responsive">
          <table className='table table-responsive aligned-table'>
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
                <td>{format2Decimal(zFirst?.d1_central)}</td>
                <td>{format2Decimal(zSecond?.d1_central)}</td>
                <td>{format2Decimal(zThird?.d1_central)}</td>
                <td>{format2Decimal(zFourth?.d1_central)}</td>
              </tr>
              <tr>
                <td>Current Price</td>
                <td>{format2Decimal(zFirst?.current_price_z)}</td>
                <td>{format2Decimal(zSecond?.current_price_z)}</td>
                <td>{format2Decimal(zThird?.current_price_z)}</td>
                <td>{format2Decimal(zFourth?.current_price_z)}</td>
              </tr>
              <tr className="highlight">
                <td className="bg-cream">Premium/Discount %</td>
                <td className="bg-cream">{calculatePercent(zFirst?.current_price_z, zFirst?.d1_central, true)}</td>
                <td className="bg-cream">{calculatePercent(zSecond?.current_price_z, zSecond?.d1_central, true)}</td>
                <td className="bg-cream">{calculatePercent(zThird?.current_price_z, zThird?.d1_central, true)}</td>
                <td className="bg-cream">{calculatePercent(zFourth?.current_price_z, zFourth?.d1_central, true)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
}