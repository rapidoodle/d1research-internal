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
import OverviewFinancials from './OverviewFinancials';
import UpcomingEvents from './UpcomingEvents';
import DPSCalendar from './DPSCalendar';
import ShareCapital from './ShareCapiltal';
import ExDivCalendar from './ExDivCalendar';
import TotalCapitalReturn from './TotalCapitalReturn';
import PeerComparisonDPSPayoutRatio from './PeerComparisonDPSPayoutRatio';
import Select from 'react-select'
import AnalystsComments from './AnalystsComments';
import PageSpinner from '@/app/components/PageSpinner';

export default function CompanyOverview({session}) {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [zPrev, setZPrev] = useState([]);
  const [zFirst, setZFirst] = useState([]);
  const [zSecond, setZSecond] = useState([]);
  const [zThird, setZThird] = useState([]);
  const [zFourth, setZFourth] = useState([]);
  const [allData, setAllData] = useState([]);
  const [uniqueUrlKey, setUniqueUrlKey] = useState('');
  const [companyID, setCompanyID] = useState('');
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [companiesOptions, setCompaniesOptions] = useState([]);
  const [showCompanies, setShowCompanies] = useState(false);

  useEffect(() => {
    const fetchCompanies = async () => {
      const url = pathname.split('/');
      const urlKey = url[url.length - 1];
      const cID = url[url.length - 2];

      if (!validate(urlKey)) {
        // Redirect to home page
        router.push("/settings/companies");
        return;
      }

      // Fetch companies
      try {
        const response = await fetch(`/api/companies/`);
        if (!response.ok) {
          router.push("/settings/companies");
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();

        setUniqueUrlKey(urlKey);
        setCompanyID(cID);

        const formattedOptions = data.data.map(company => ({
          value: company.company_id,
          label: company.company,
          equity_ticker: company.equity_ticker
        }));


        setCompaniesOptions(formattedOptions);
        setSelectedCompany(formattedOptions[0]);

      } catch (error) {
        console.log('Failed to fetch companies:', error);
      }
    };

    fetchCompanies();
  }, [pathname, router]);

  const filterOption = (option, inputValue) => {
    const { label, data } = option;

    return (
      label.toLowerCase().includes(inputValue.toLowerCase()) ||
      data.equity_ticker.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  useEffect(() => {
    if (selectedCompany) {
      const fetchFinancialData = async () => {
        try {
          setLoading(true);
          const response = await fetch(`/api/financial-data/?equity_ticker=${selectedCompany.equity_ticker}`);
          if (!response.ok) {
            router.push("/settings/companies");
            throw new Error(`Error: ${response.statusText}`);
          }
          const data = await response.json();
          // Set all data in reverse order
          const reverseData = data.reverse();
          setAllData(reverseData);

          console.log(reverseData);

          if (data[0]) {

            const yearDigit = data[0].year.toString().slice(-1);
            const year2Digit = `${data[0].year.toString().slice(2)}${data[0].year > new Date().getFullYear() ? 'e' : ''}`;
            data[0].year_digit = yearDigit;
            data[0].year_2digit = year2Digit;

            setZPrev(data[0]);

          }
          if (data[1]) {
            const yearDigit = data[1].year.toString().slice(-1);
            const year2Digit = `${data[1].year.toString().slice(2)}${data[1].year > new Date().getFullYear() ? 'e' : ''}`;
            data[1].year_digit = yearDigit;
            data[1].year_2digit = year2Digit;

            setZFirst(data[1]);

          }
          if (data[2]) {
            const yearDigit = data[2].year.toString().slice(-1);
            const year2Digit = `${data[2].year.toString().slice(2)}${data[2].year > new Date().getFullYear() ? 'e' : ''}`;
            data[2].year_digit = yearDigit;
            data[2].year_2digit = year2Digit;

            setZSecond(data[2]);
          }
          if (data[3]) {
            const yearDigit = data[3].year.toString().slice(-1);
            const year2Digit = `${data[3].year.toString().slice(2)}${data[3].year > new Date().getFullYear() ? 'e' : ''}`;
            data[3].year_digit = yearDigit;
            data[3].year_2digit = year2Digit;

            setZThird(data[3]);
          }
          if (data[4]) {
            const yearDigit = data[4].year.toString().slice(-1);
            const year2Digit = `${data[4].year.toString().slice(2)}${data[3].year > new Date().getFullYear() ? 'e' : ''}`;
            data[4].year_digit = yearDigit;
            data[4].year_2digit = year2Digit;

            setZFourth(data[4]);
          }

          setLoading(false);

        } catch (error) {
          console.error('Failed to fetch company data:', error);
          setLoading(false);
        }
      };

      fetchFinancialData();
    }
  }, [selectedCompany, router]);

  const handleSelectCompany = (selectedOption) => {
    setSelectedCompany(selectedOption);
    setShowCompanies(false);
  }

  if(!loading && selectedCompany){
    return (<>
      <div className="company-page p-2 p-md-4">
        <div className="row mb-md-3">
            <div className="col-12 col-sm-6 d-flex align-items-center justify-content-md-start justify-content-center mt-4 mt-md-0">
              <Image
                src="https://d1researchstorage.s3.amazonaws.com/company-logo-rectangle.webp"
                alt="Company Logo"
                width={185}
                height={100}
              />
            </div>
            <div className="mt-4 mt-sm-0 col-12 col-sm-6">
              <div className='d-flex flex-column flex-md-row'>
                <div className='semi-card mb-3 d-flex align-items-center'><b>Company Name:</b> 

                {!showCompanies ? <p className='company-link ms-2' onClick={ () => setShowCompanies(true) }> {zFirst?.company}</p> : 
                  ( <div className='w-100 px-2'>
                    <Select
                        className="basic-single w-100"
                        classNamePrefix="select"
                        isClearable={false}
                        defaultValue={companiesOptions[0]}
                        filterOption={filterOption}
                        isSearchable={true}
                        onChange={handleSelectCompany}
                        value={selectedCompany}
                        name="companies"
                        options={companiesOptions}
                    />
                    <sub className='company-link cursor-pointer float-end my-2' onClick={ () => setShowCompanies(false) }>Close</sub>
                    </div>)
                  }

                </div>
                <div className='semi-card mb-3 ms-md-3'><b>DIV Ticker:</b> {zFirst?.div_ticker}</div>
              </div>
              <div className='d-flex flex-column flex-md-row'>
                <div className='semi-card mb-md-0 mb-3'><b>Ticker:</b> {zFirst?.equity_ticker}</div>
                <div className='semi-card mb-md-0 mb-3 ms-md-3'><b>Dividend Index:</b> -</div>
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
              companyID={selectedCompany?.value}
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
            <AnalystsComments 
              companyID={selectedCompany?.value}
              session={session} />
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
            <UpcomingEvents 
              allData={allData} 
            />

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
    return <PageSpinner />
  }
};