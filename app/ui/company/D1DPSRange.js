import { calculatePercent, calculatePercentageColored, format2Decimal, formatNumber, formatRiskSkew, formatWholeNumber } from "@/app/lib/utils";

export default function D1DPSRange({zFirst, zSecond, zThird, zFourth}) {
  zFirst.difference = ((zFirst.current_price_z / zFirst.dps_z - 1) * - 1) * 100;
  zSecond.difference = (zSecond.current_price_z / zSecond.dps_z - 1) * - 1;
  zThird.difference = (zThird.current_price_z / zThird.dps_z - 1)  * - 1 ;
  zFourth.difference = (zFourth.current_price_z / zFourth.dps_z - 1)  * - 1 * 100;
  //percentrage format
    return (
    <div className="card dps-forecast flex-fill mb-4">
        <h5>D1 DPS Range</h5>
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
                <td>D1 Upper</td>
                <td>{format2Decimal(zFirst?.bull_z)}</td>
                <td>{format2Decimal(zSecond?.bull_z)}</td>
                <td>{format2Decimal(zThird?.bull_z)}</td>
                <td>{format2Decimal(zFourth?.bull_z)}</td>
              </tr>
              <tr>
                <td>D1 Central</td>
                <td>{format2Decimal(zFirst?.dps_z)}</td>
                <td>{format2Decimal(zSecond?.dps_z)}</td>
                <td>{format2Decimal(zThird?.dps_z)}</td>
                <td>{format2Decimal(zFourth?.dps_z)}</td>
              </tr>
              <tr>
                <td>D1 Lower</td>
                <td>{format2Decimal(zFirst?.bear_z)}</td>
                <td>{format2Decimal(zSecond?.bear_z)}</td>
                <td>{format2Decimal(zThird?.bear_z)}</td>
                <td>{format2Decimal(zFourth?.bear_z)}</td>
              </tr>
              <tr className="highlight">
                <td className="bg-cream">Rish Skew</td>
                <td className="bg-cream">{formatRiskSkew(zFirst?.difference_to_central_percentage)}</td>
                <td className="bg-cream">{formatRiskSkew(zSecond?.difference_to_central_percentage)}</td>
                <td className="bg-cream">{formatRiskSkew(zThird?.difference_to_central_percentage)}</td>
                <td className="bg-cream">{formatRiskSkew(zFourth?.difference_to_central_percentage)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
}