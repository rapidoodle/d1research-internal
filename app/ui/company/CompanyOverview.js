'use client';

import React, { useEffect, useState } from 'react';
import '@/app/styles/company-page.css';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { validate } from 'uuid';
import { useRouter } from 'next/navigation'
import D1DPSForecast from './D1DPSForecast';
import CapitalReturnPolicy from './CapitalReturnPolicy';
import RiskScenarios from './RiskScenarios';
import AnalystComments from './AnalystComments';
import OverviewFinancials from './OverviewFinancials';
import UpcomingEvents from './UpcomingEvents';
import DPSCalendar from './DPSCalendar';
import ShareCapital from './ShareCapiltal';
import ExDivCalendar from './ExDivCalendar';
import TotalCapitalReturn from './TotalCapitalReturn';
import PeerComparisonDPSPayoutRatio from './PeerComparisonDPSPayoutRatio';

export default function CompanyOverview({session}) {
  //fetch latest 4 company using the unique url key from the url
  const pathname = usePathname();
  const router = useRouter()
  const [loading, setLoading] = useState(true);
  const [zFirst, setZFirst] = useState([]);
  const [zSecond, setZSecond] = useState([]);
  const [zThird, setZThird] = useState([]);
  const [zFourth, setZFourth] = useState([]);
  const [allData, setAllData] = useState([]);
  const [uniqueUrlKey, setUniqueUrlKey] = useState('');
  const [companyID, setCompanyID] = useState('');

  useEffect(() => {
    setLoading(true);
    const fetchCompany = async () => {
      const url = pathname.split('/');
      const urlKey = url[url.length - 1];
      const cID = url[url.length - 2];

      if(!validate(urlKey)){
        //redirect to home page
        router.push("/settings/companies");
      }

      try {
        const response = await fetch(`/api/financial-data/?company_id=${cID}&unique_url_key=${urlKey}`);
        if (!response.ok) {
          router.push("/settings/companies");
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();

        //set all data in reverse order
        const reverseData = data.reverse();
        setAllData(reverseData);
        
        if(data[0]){
          setZFirst(data[0]);
        }
        if(data[1]){
          setZSecond(data[1]);
        }
        if(data[2]){
          setZThird(data[2]);
        }
        if(data[3]){
          setZFourth(data[3]);
        }

        setUniqueUrlKey(urlKey);
        setCompanyID(cID);
        setLoading(false);

        return data;

      } catch (error) {
        console.error('Failed to fetch company data:', error);
        return { error: error.message };
      }
    };
    
    fetchCompany();
  }, []);

  if(!loading && allData.length > 0 && uniqueUrlKey && companyID){
    return (<>
      <div className="container-fluid financial-overview p-4">
        <div className="d-flex justify-content-between header-container">
            <div className="header-title">
            <Image
              src="https://d1researchstorage.s3.amazonaws.com/company-logo-rectangle.png"
              alt="Company Logo"
              width={185}
              height={100}
            />
            </div>
            <div className="company-details">
              <div className='d-flex'>
                <div className='semi-card mb-3'><b>Company Name:</b> {zFirst?.company}</div>
                <div className='semi-card mb-3 ms-3'><b>DIV Ticker:</b> {zFirst?.div_ticker}</div>
              </div>
              <div className='d-flex'>
                <div className='semi-card'><b>Ticker:</b> {zFirst?.equity_ticker}</div>
                <div className='semi-card ms-3'><b>Dividend Index:</b> -</div>
              </div>
            </div>
          </div>
        {/* ROW 1 */}
        <div className="row mb-4 mt-2 d-flex">
          <div className='col-md-6 d-flex mb-4 mb-md-0'>
            <D1DPSForecast 
              zFirst={zFirst}
              zSecond={zSecond}
              zThird={zThird}
              zFourth={zFourth}
             />
          </div>
          <div className='col-md-6 d-flex'>
            <CapitalReturnPolicy  
              companyID={companyID}
              uniqueURLKey={uniqueUrlKey}
              session={session}
            />
          </div>
        </div>

        {/* ROW 2 */}
        <div className="row mb-4 d-flex">
          <div className='col-md-6 d-flex mb-4 mb-md-0'>
            <RiskScenarios
              zFirst={zFirst}
              zSecond={zSecond}
              zThird={zThird}
              zFourth={zFourth} 
            />
          </div>
          <div className='col-md-6 d-flex'>
            <AnalystComments 
              uniqueUrlKey={uniqueUrlKey} />
          </div>
        </div>
        
        {/* ROW 3 */}
        <div className="row mb-4 d-flex">
          <div className='col-md-6 d-flex mb-4 mb-md-0'>
            <OverviewFinancials
              zFirst={zFirst}
              zSecond={zSecond}
              zThird={zThird}
              zFourth={zFourth}
            />
          </div>
          <div className='col-md-6 d-flex flex-column'>
            <UpcomingEvents />

            <DPSCalendar 
              allData={allData} />
          </div>
        </div>
        
        {/* ROW 4 */}
        <div className="row mb-4 d-flex">
          <div className='col-md-6 d-flex mb-4 mb-md-0'>
            <ShareCapital 
              zFirst={zFirst}
              zSecond={zSecond}
              zThird={zThird}
              zFourth={zFourth}
            />
          </div>
          <div className='col-md-6 d-flex'>
            <ExDivCalendar allData={allData} />
          </div>
        </div>
        
        {/* ROW 5 */}
        <div className="row mb-4 d-flex">
          <div className='col-md-6 d-flex mb-4 mb-md-0'>
            <TotalCapitalReturn 
              zFirst={zFirst}
              zSecond={zSecond}
              zThird={zThird}
              zFourth={zFourth}
            />
          </div>
          <div className='col-md-6 d-flex'>
            <PeerComparisonDPSPayoutRatio
              zFirst={zFirst}
              zSecond={zSecond}
              zThird={zThird}
              zFourth={zFourth}
            />
          </div>
        </div>
        <div className='footer'>
          <p className='text-bold'>Disclaimer</p>
          <p className='mb-0'>The information contained in this presentation is confidential. D1 Research GmbH shall not be liable to any recipient for any inaccuracies or omissions and have no liability in respect of any loss or damage suffered by any recipient in connection with any information provided.</p>
        </div>
      </div>
      </>
    );
  }else{
    return <div className='p-3'>Loading...</div>
  }
};