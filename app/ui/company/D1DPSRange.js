import ModalComponent from "@/app/components/ModalComponent";
import { calculatePercent, calculatePercentageColored, format2Decimal, formatNumber, formatRiskSkew, formatWholeNumber } from "@/app/lib/utils";
import { useEffect, useRef, useState } from "react";
import Sensitivities from "./RiskScenarios/Sensitivities";
import TooltipComponent from "@/app/components/TooltipComponent";
import CompanyPagePrintableHeader from "@/app/components/CompanyPagePrintableHeader";
import CompanyPagePrintableFooter from "@/app/components/CompanyPagePrintableFooter";

export default function D1DPSRange({zFirst, zSecond, zThird, zFourth, allData, company, displayIndex, eTicker, divTicker}) {
  const componentRef = useRef()
  const [showPrintable, setShowPrintable] = useState(false);
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

  const handleBeforePrint = () => {
    setShowPrintable(true);
    };

  const handleAfterPrint = () => {
      setShowPrintable(false);
  };
  
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
    <div className="card dps-forecast flex-fill">
        <div className='d-flex align-items-center'>
                <h5 className='flex-grow-1 mb-0'>D1 DPS range</h5>
                {/* { peersDPS.length > 0 && <a className='page-link me-2' onClick={() => setShowChart(!showChart)}>View {showChart ? 'table' : 'chart'}</a> } */}
                
                <>
                {sensData?.length > 0 && <a className='page-link me-2 not-printable' onClick={() => setShowSens(!showSens)}>View sensitivities</a>}
                  <TooltipComponent 
                    placement="bottom"
                    title={'D1 DPS Range explanation'}
                    content={`    <p className="mb-0 ps-2"><strong>Risk Skew:</strong></p>
    <ul>
        <li>Risk skew provides a relationship between the upside- and downside-risk to our central case forecast.</li>
        <li><strong>Formula:</strong> Upside risk (Upper DPS - Central DPS) divided by downside risk (Central DPS - Lower DPS).</li>
        <li>A number &lt;1 indicates a downside risk skew; &gt;1 indicates an upside risk skew.</li>
    </ul>

    <p className="mb-0 ps-2"><strong>Risk Distribution:</strong></p>
    <ul>
        <li>Risk distribution provides an indication of the size of the range around our central DPS forecast.</li>
        <li><strong>Formula:</strong> Total range of outcomes (Upper DPS - Lower DPS) divided by Central DPS.</li>
        <li>The higher the %, the larger the range of potential outcomes around our central forecast.</li>
    </ul>`}
                  />
                  </>
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
              <tr className="tr-bold">
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
                <td className="bg-cream">Risk Skew (x)</td>
                <td className="bg-cream">{formatRiskSkew(zFirst?.risk_skew)}</td>
                <td className="bg-cream">{formatRiskSkew(zSecond?.risk_skew)}</td>
                <td className="bg-cream">{formatRiskSkew(zThird?.risk_skew)}</td>
                <td className="bg-cream">{formatRiskSkew(zFourth?.risk_skew)}</td>
              </tr>
              <tr className="highlight">
                <td className="bg-cream">
                  <span className="d-none d-sm-block">Risk distribution (%)</span>
                  <span className="d-block d-sm-none">Risk dist. (%)</span>
                </td>
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
        isSavable={true}
        isPrintable={true}
        rightTitle={companyName}
        componentRef={componentRef}
        handleAfterPrint={handleAfterPrint}
        handleBeforePrint={handleBeforePrint}
        title="Sensitivities">
            <div className="p-3" ref={componentRef}>
              <CompanyPagePrintableHeader
                displayIndex={displayIndex}
                company={company}
                ticker={eTicker}
                divTicker={divTicker}  />
                  <div className="mt-print">
                  <Sensitivities  sensData={sensData}  />
                  </div>
                <CompanyPagePrintableFooter />
            </div>
        </ModalComponent>
      </>
    )
}