import ModalComponent from "@/app/components/ModalComponent";
import { calculatePercent, calculatePercentageColored, format2Decimal, formatNumber, formatRiskSkew, formatWholeNumber } from "@/app/lib/utils";
import { useEffect, useState } from "react";
import Sensitivities from "./RiskScenarios/Sensitivities";
import TooltipComponent from "@/app/components/TooltipComponent";

export default function D1DPSRange({zFirst, zSecond, zThird, zFourth, allData}) {
  const ticker = allData[0].equity_ticker;
  zFirst.difference = ((zFirst.current_price_z / zFirst.d1_central - 1) * - 1) * 100;
  zSecond.difference = (zSecond.current_price_z / zSecond.d1_central - 1) * - 1;
  zThird.difference = (zThird.current_price_z / zThird.d1_central - 1)  * - 1 ;
  zFourth.difference = (zFourth.current_price_z / zFourth.d1_central - 1)  * - 1 * 100;

  const companyName = allData[0].company;
  const [sensData, setSensData] = useState([]);
  const [loading, setLoading] = useState (false);
  const [showSens, setShowSens] = useState(false);

  const handleCloseSensitivities = () => setShowSens(false);

  useEffect(() => {
      const fetchEvents = async () => {
          setLoading(true);
          const response = await fetch(`/api/sensitivities?equity_ticker=${ticker}`, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
                  }
              }
          );
          
          const data = await response.json();
          setSensData(data);
          setLoading(false);

          console.log('Risk scenarios data:', data);
          return data;
      }
      
      fetchEvents();
  }, []);

  //percentrage format
    return (<>
    <div className="card dps-forecast flex-fill mb-4">
        <div className='d-flex align-items-center'>
                <h5 className='flex-grow-1 mb-0'>D1 DPS Range</h5>
                {/* { peersDPS.length > 0 && <a className='page-link me-2' onClick={() => setShowChart(!showChart)}>View {showChart ? 'table' : 'chart'}</a> } */}
                {sensData?.length > 0 &&
                <>
                  <a className='page-link me-2' onClick={() => setShowSens(!showSens)}>View sensitivities</a>
                  <TooltipComponent 
                    placement="bottom"
                    title={'D1 DPS Range explanation'}
                    content={`<ul className='ml-0'>
                        <li>D1 Upper: The upper range of the D1 DPS forecast</li>
                        <li>D1 Central: The central range of the D1 DPS forecast</li>
                        <li>D1 Lower: The lower range of the D1 DPS forecast</li>
                      </ul>`}
                  />
                  </>
                }
            </div>
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
                <td>{format2Decimal(zFirst?.d1_upper)}</td>
                <td>{format2Decimal(zSecond?.d1_upper)}</td>
                <td>{format2Decimal(zThird?.d1_upper)}</td>
                <td>{format2Decimal(zFourth?.d1_upper)}</td>
              </tr>
              <tr>
                <td>D1 Central</td>
                <td>{format2Decimal(zFirst?.d1_central)}</td>
                <td>{format2Decimal(zSecond?.d1_central)}</td>
                <td>{format2Decimal(zThird?.d1_central)}</td>
                <td>{format2Decimal(zFourth?.d1_central)}</td>
              </tr>
              <tr>
                <td>D1 Lower</td>
                <td>{format2Decimal(zFirst?.d1_lower)}</td>
                <td>{format2Decimal(zSecond?.d1_lower)}</td>
                <td>{format2Decimal(zThird?.d1_lower)}</td>
                <td>{format2Decimal(zFourth?.d1_lower)}</td>
              </tr>
              <tr className="highlight">
                <td className="bg-cream">Risk Skew</td>
                <td className="bg-cream">{format2Decimal(zFirst?.risk_skew)}</td>
                <td className="bg-cream">{format2Decimal(zSecond?.risk_skew)}</td>
                <td className="bg-cream">{format2Decimal(zThird?.risk_skew)}</td>
                <td className="bg-cream">{format2Decimal(zFourth?.risk_skew)}</td>
              </tr>
              <tr className="highlight">
                <td className="bg-cream">Risk Distribution (%)</td>
                <td className="bg-cream">{zFirst?.risk_distribution}</td>
                <td className="bg-cream">{zSecond?.risk_distribution}</td>
                <td className="bg-cream">{zThird?.risk_distribution}</td>
                <td className="bg-cream">{zFourth?.risk_distribution}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <ModalComponent
            show={showSens}
            handleClose={handleCloseSensitivities}
            loading={loading}
            size="xl"
            bodyColor='#fefcf8'
            isSavable={false}
            rightTitle={companyName}
            title="Sensitivities">
                <div className="p-3">
                    <Sensitivities 
                        sensData={sensData} 
                        />
                </div>
        </ModalComponent>
      </>
    )
}