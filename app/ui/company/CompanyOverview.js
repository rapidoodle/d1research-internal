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
  const [selectedSTOTicker, setSelectedSTOTicker] = useState(null);
  const [selectedDivTicker, setSelectedDivTicker] = useState(null);

  const [companiesOptions, setCompaniesOptions] = useState([]);
  const [stoTickerOptions, setSTOTickerOptions] = useState([]);
  const [divTickerOptions, setDivTickerOptions] = useState([]);

  const [showCompanies, setShowCompanies] = useState(true);
  const [divIndex, setDivIndex] = useState([]);

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

        console.log(data);

        setUniqueUrlKey(urlKey);
        setCompanyID(cID);

        const formattedOptions = data.data.map(company => ({
          value: company.company_id,
          label: company.company,
          equity_ticker: company.equity_ticker
        }));

        const formattedOptions2 = data.data.map(company => ({
          value: company.company_id,
          label: company.equity_ticker,
          equity_ticker: company.equity_ticker
        }));

        const formattedOptions3 = data.data.map(company => ({
          value: company.company_id,
          label: company.div_ticker,
          equity_ticker: company.equity_ticker
        }));

        setCompaniesOptions(formattedOptions);
        setSTOTickerOptions(formattedOptions2);
        setDivTickerOptions(formattedOptions3);
        setSelectedCompany(formattedOptions[0]);
        setSelectedSTOTicker(formattedOptions2[0]);
        setSelectedDivTicker(formattedOptions3[0]);

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

  const filterOptionDiv = (option, inputValue) => {
    const { label, data } = option;

    return (
      label.toLowerCase().includes(inputValue.toLowerCase()) ||
      data.div_ticker.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  useEffect(() => {
    if (selectedCompany || selectedSTOTicker || selectedDivTicker) {
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

          if (data[0]) {

            const yearDigit = data[0].year.toString().slice(-1);
            const year2Digit = `${data[0].year.toString().slice(2)}${data[0].year >= new Date().getFullYear() ? 'e' : ''}`;
            data[0].year_digit = yearDigit;
            data[0].year_2digit = year2Digit;

            setZPrev(data[0]);

          }
          if (data[1]) {
            const yearDigit = data[1].year.toString().slice(-1);
            const year2Digit = `${data[1].year.toString().slice(2)}${data[1].year >= new Date().getFullYear() ? 'e' : ''}`;
            data[1].year_digit = yearDigit;
            data[1].year_2digit = year2Digit;

            setZFirst(data[1]);

          }
          if (data[2]) {
            const yearDigit = data[2].year.toString().slice(-1);
            const year2Digit = `${data[2].year.toString().slice(2)}${data[2].year >= new Date().getFullYear() ? 'e' : ''}`;
            data[2].year_digit = yearDigit;
            data[2].year_2digit = year2Digit;

            setZSecond(data[2]);
          }
          if (data[3]) {
            const yearDigit = data[3].year.toString().slice(-1);
            const year2Digit = `${data[3].year.toString().slice(2)}${data[3].year >= new Date().getFullYear() ? 'e' : ''}`;
            data[3].year_digit = yearDigit;
            data[3].year_2digit = year2Digit;

            setZThird(data[3]);
          }
          if (data[4]) {
            const yearDigit = data[4].year.toString().slice(-1);
            const year2Digit = `${data[4].year.toString().slice(2)}${data[3].year >= new Date().getFullYear() ? 'e' : ''}`;
            data[4].year_digit = yearDigit;
            data[4].year_2digit = year2Digit;

            setZFourth(data[4]);
          }

          
          setDivIndex([{
            label : `${zFirst?.index1}${zFirst?.index2 ? `, ${zFirst?.index2}` : ''}${zFirst?.index3 ? `, ${zFirst?.index3}` : ''}${zFirst?.index4 ? `, ${zFirst?.index4}` : ''}`,
            value : 0
          }]);

          setLoading(false);
          

        } catch (error) {
          console.error('Failed to fetch company data:', error);
          setLoading(false);
        }
      };

      fetchFinancialData();
    }
  }, [selectedCompany, router, selectedDivTicker, selectedSTOTicker]);

  const handleSelectCompany = (selectedOption) => {
    setSelectedCompany(selectedOption);

    // Get STO and Div Ticker
    const stoTicker = stoTickerOptions.find(option => option.value === selectedOption.value);
    const divTicker = divTickerOptions.find(option => option.value === selectedOption.value);

    setSelectedSTOTicker(stoTicker);
    setSelectedDivTicker(divTicker);

  }

  const handleSelectSTOTicker = (selectedOption) => {
    setSelectedSTOTicker(selectedOption);

    // Get Company and Div Ticker
    const company = companiesOptions.find(option => option.value === selectedOption.value);
    const divTicker = divTickerOptions.find(option => option.value === selectedOption.value);

    setSelectedCompany(company);
    setSelectedDivTicker(divTicker);

  }

  const handleSelectDivTicker = (selectedOption) => {
    setSelectedDivTicker(selectedOption);

    // Get Company and STO Ticker
    const company = companiesOptions.find(option => option.value === selectedOption.value);
    const stoTicker = stoTickerOptions.find(option => option.value === selectedOption.value);

    setSelectedCompany(company);
    setSelectedSTOTicker(stoTicker);
  }

  if(!loading && selectedCompany){
    return (<>
      <div className="company-page p-2 p-md-4">
        <div className="row">
            <div className="col-12 col-sm-12 mt-4 mt-md-0">
              <div className='row'>
                <div className='col-6'>
                  <div className='row'>
                    <div className='col-12 col-sm-6'>
                      {!showCompanies ? <p className='company-link ms-2' onClick={ () => setShowCompanies(true) }> {zFirst?.company}</p> : 
                        ( <div className='w-100'>
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
                          {/* <sub className='company-link cursor-pointer float-end my-2' onClick={ () => setShowCompanies(false) }>Close</sub> */}
                          </div>)
                        }
                    </div>
                    <div className='col-12 col-sm-6 mt-3 mt-sm-0'>
                      {/* <div className='semi-card mb-md-0'><span className='font-medium'>STO Ticker:</span> {zFirst?.equity_ticker}</div> */}
                      {!showCompanies ? <p className='company-link ms-2' onClick={ () => setShowCompanies(true) }> {zFirst?.company}</p> : 
                        ( <div className='w-100'>
                          <Select
                              className="basic-single w-100"
                              classNamePrefix="select"
                              isClearable={false}
                              defaultValue={stoTickerOptions[0]}
                              filterOption={filterOption}
                              isSearchable={true}
                              onChange={handleSelectSTOTicker}
                              value={selectedSTOTicker}
                              name="companiesTicker"
                              options={stoTickerOptions}
                          />
                          {/* <sub className='company-link cursor-pointer float-end my-2' onClick={ () => setShowCompanies(false) }>Close</sub> */}
                          </div>)
                        }
                    </div>
                  </div>


                </div>
                <div className='col-6'>
                  <div className='row'>
                    <div className='col-12 col-sm-6'>
                      {/* <div className='semi-card'><span className='font-medium'>DIV Ticker:</span> {zFirst?.div_ticker}</div> */}
                      {!showCompanies ? <p className='company-link ms-2' onClick={ () => setShowCompanies(true) }> {zFirst?.company}</p> : 
                        ( <div className='w-100'>
                          <Select
                              className="basic-single w-100"
                              classNamePrefix="select"
                              isClearable={false}
                              defaultValue={divTickerOptions[0]}
                              filterOption={filterOptionDiv}
                              isSearchable={true}
                              onChange={handleSelectDivTicker}
                              value={selectedDivTicker}
                              name="companiesDivTicker"
                              options={divTickerOptions}
                          />
                          {/* <sub className='company-link cursor-pointer float-end my-2' onClick={ () => setShowCompanies(false) }>Close</sub> */}
                          </div>)
                        }
                    </div>
                    <div className='col-12 col-sm-6 mt-3 mt-sm-0'>
                      {/* <span className='font-medium'>DIV Index:</span>  */}
                        <Select 
                          className='basic-single w-100'
                          classNamePrefix='select'
                          isClearable={false}
                          defaultValue={divIndex[0]}
                          options={divIndex}
                          isSearchable={false}
                        />

                    {/* {`${zFirst?.index1}${zFirst?.index2 ? `, ${zFirst?.index2}` : ''}${zFirst?.index3 ? `, ${zFirst?.index3}` : ''}${zFirst?.index4 ? `, ${zFirst?.index4}` : ''}`} */}
                    </div>
                    </div>
                </div>
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
              zPrev={zPrev}
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
              zPrev={zPrev}
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
        <div className="row d-flex">
          <div className='col-md-6 d-flex mb-4 mb-md-0'>
            <TotalCapitalReturn 
              zPrev={zPrev}
              zFirst={zFirst}
              zSecond={zSecond}
              zThird={zThird}
              zFourth={zFourth}
            />
          </div>
          <div className='col-md-6 d-flex'>
            <PeerComparisonDPSPayoutRatio
              zPrev={zPrev}
              zFirst={zFirst}
              zSecond={zSecond}
              zThird={zThird}
              zFourth={zFourth}
            />
          </div>
        </div>
        {/* <div className='footer'>
          <div className='d-flex justify-content-between'>
          <p className='text-bold'>Disclaimer</p>
          <p className='text-bold'>contact@d1research.com</p>
          </div>
          <p className='mb-0'>The information contained in this presentation is confidential. D1 Research GmbH shall not be liable to any recipient for any inaccuracies or omissions and have no liability in respect of any loss or damage suffered by any recipient in connection with any information provided.</p>
        </div> */}
      </div>
      </>
    );
  }else{
    return <PageSpinner />
  }
};