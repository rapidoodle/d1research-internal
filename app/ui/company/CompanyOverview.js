'use client';

import React, { useEffect, useState, useRef } from 'react';
import '@/app/styles/company-page.css';
import { usePathname } from 'next/navigation';
import { validate } from 'uuid';
import { useRouter } from 'next/navigation'
import D1DPSForecast from './D1DPSForecast';
import CapitalReturnPolicy from './CapitalReturnPolicy';
import RiskScenarios from './RiskScenarios/RiskScenarios';
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
import { customSelectStyle } from '@/app/lib/custom-styles/custom-styles';
import { setSymbol } from '@/app/lib/utils';
import D1DPSRange from './D1DPSRange';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint } from '@fortawesome/free-solid-svg-icons';
import ReactToPrint from 'react-to-print';
import { DynamicCompanyPage } from '../printables/DynamicCompanyPage';
import CompanyPagePrintableHeader from '@/app/components/CompanyPagePrintableHeader';
import CompanyPagePrintableFooter from '@/app/components/CompanyPagePrintableFooter';

export default function CompanyOverview({session}) {
  const [showPrintable, setShowPrintable] = useState(false);
  const componentRef = useRef();
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
  const [dpsSymbol, setDPSSymbol] = useState('X');
  const [generalSymbol, setGeneralSymbol] = useState('X');

  const [showCompanies, setShowCompanies] = useState(true);
  const [divIndex, setDivIndex] = useState();
  const [displayIndex, setDisplayIndex] = useState('');

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

            setDPSSymbol(setSymbol(data[0].div_future_fx));
            setGeneralSymbol(setSymbol(data[0].p_and_l_fx));

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
            label : `${zFirst?.index1} ${(zFirst?.index2 && zFirst.index2 !== 'n/a' && zFirst.index2 !== '-') ? `, ${zFirst?.index2}` : ''}${(zFirst?.index3 && zFirst.index3 !== 'n/a' && zFirst.index3 !== '-') ? `, ${zFirst?.index3}` : ''}${(zFirst?.index4 && zFirst.index4 !== 'n/a' && zFirst.index4 !== '-')? `, ${zFirst?.index4}` : ''}`,
            value : 0
          }]);

          setLoading(false);

          setDisplayIndex(
            `${zFirst?.index1 && zFirst?.index1 !== 0 ? zFirst.index1 : ''}${
                zFirst?.index2 && zFirst.index2 !== '-' && zFirst.index2 !== 0 ? `, ${zFirst.index2}` : ''
            }${
                zFirst?.index3 && zFirst.index3 !== '-' && zFirst.index3 !== 0 ? `, ${zFirst.index3}` : ''
            }${
                zFirst?.index4 && zFirst.index4 !== '-' && zFirst.index4 !== 0 ? `, ${zFirst.index4}` : ''
            }`
          );

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

  const handleBeforePrint = () => {
    setShowPrintable(true);
  };

  const handleAfterPrint = () => {
      setShowPrintable(false);
  };

  if(!loading && selectedCompany){
    return (<>
      <div className="company-page p-2 p-md-4" ref={componentRef}>
        <div className="row not-printable">
            <div className="col-12 col-sm-12 mt-4 mt-md-0">
              <div className='row'>
                <div className='col-6'>
                  <div className='row'>
                    <div className='col-12 col-sm-4 d-flex align-items-center justify-content-center mb-3 mb-sm-0'>
                      <Image src="https://d1researchstorage.s3.amazonaws.com/company-logo-rectangle.webp" alt="D1 Research" width={90} height={40}/>
                    </div>
                    <div className='col-12 col-sm-4'>
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
                              styles={customSelectStyle}
                              options={companiesOptions}
                          />
                          {/* <sub className='company-link cursor-pointer float-end my-2' onClick={ () => setShowCompanies(false) }>Close</sub> */}
                          </div>)
                        }
                    </div>
                    <div className='col-12 col-sm-4 mt-3 mt-sm-0'>
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
                              styles={customSelectStyle}
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
                    <div className='col-12 col-sm-4 order-2 order-sm-1'>
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
                              styles={customSelectStyle}
                              options={divTickerOptions}
                          />
                          {/* <sub className='company-link cursor-pointer float-end my-2' onClick={ () => setShowCompanies(false) }>Close</sub> */}
                          </div>)
                        }
                    </div>
                    <div className='col-12 col-sm-4 mt-3 mt-sm-0 order-3 order-sm-2'>
                        <div className='div-index-container'>
                        {displayIndex && displayIndex}
                        </div>
                    </div>
                    <div className='col-12 col-sm-4 order-1 order-sm-3 mb-3 mb-sm-0'>
                      <ReactToPrint
                          pageStyle="@page { size: 10.5in 14in }"
                          trigger={() => <button className='btn btn-primary w-100'> <FontAwesomeIcon icon={faPrint} className='me-2' />Print</button>}
                          content={() => componentRef.current}
                          onBeforeGetContent={handleBeforePrint}
                          onAfterPrint={handleAfterPrint}
                      />
                    </div>
                    </div>
                </div>
              </div>
            </div>
        </div>

        <CompanyPagePrintableHeader 
          displayIndex={displayIndex}
          company={selectedCompany}
          ticker={selectedSTOTicker}
          divTicker={selectedDivTicker} 
        />

        {/* ROW 1 */}
        <div className='company-page-container'>
          <div className="row mt-2 d-flex">
            <div className='col-md-6 mb-4 d-flex flex-column printable-section'>
              {/* <D1DPSForecast 
                zFirst={zFirst}
                zSecond={zSecond}
                zThird={zThird}
                zFourth={zFourth}
              /> */}
              <D1DPSRange 
                zFirst={zFirst}
                zSecond={zSecond}
                zThird={zThird}
                zFourth={zFourth}
                allData={allData}
                displayIndex={displayIndex}
                company={selectedCompany}
                eTicker={selectedSTOTicker}
                divTicker={selectedDivTicker} 
                />
            </div>
            <div className='col-md-6 d-flex mb-4 printable-section'>

              <CapitalReturnPolicy  
                companyID={selectedCompany?.value}
                session={session}
                displayIndex={displayIndex}
                company={selectedCompany}
                ticker={selectedSTOTicker}
                divTicker={selectedDivTicker} 
              />
            </div>
            <div className='col-md-6 d-flex mb-4 printable-section'>
              <OverviewFinancials
                zPrev={zPrev}
                zFirst={zFirst}
                zSecond={zSecond}
                zThird={zThird}
                zFourth={zFourth}
                generalSymbol={generalSymbol}
              />
            </div>
            <div className='col-md-6 d-flex mb-4 flex-column printable-section'>
              <AnalystsComments 
                companyID={selectedCompany?.value}
                displayIndex={displayIndex}
                company={selectedCompany}
                ticker={selectedSTOTicker}
                divTicker={selectedDivTicker} 
                session={session} />

            </div>
            <div className='col-md-6 d-flex mb-4 printable-section'>
              <ExDivCalendar allData={allData} />
            </div>
            <div className='col-md-6 d-flex mb-4 printable-section'>
              <UpcomingEvents 
                allData={allData} 
              />
            </div>
            <div className='col-md-6 d-flex mb-4 flex-column printable-section'>
              {/* <RiskScenarios
                zFirst={zFirst}
                zSecond={zSecond}
                zThird={zThird}
                zFourth={zFourth} 
                allData={allData}
              /> */}

            <ShareCapital 
                zPrev={zPrev}
                zFirst={zFirst}
                zSecond={zSecond}
                zThird={zThird}
                zFourth={zFourth}
              />
            </div>
            <div className='col-md-6 d-flex mb-4 printable-section'>
              <DPSCalendar 
                allData={allData} />
            </div>
            <div className='col-md-6 d-flex mb-4 mb-md-0 printable-section'>
              <TotalCapitalReturn 
                zPrev={zPrev}
                zFirst={zFirst}
                zSecond={zSecond}
                zThird={zThird}
                zFourth={zFourth}
              />
            </div>
            <div className='col-md-6 d-flex printable-section'>
              <PeerComparisonDPSPayoutRatio
                zPrev={zPrev}
                zFirst={zFirst}
                zSecond={zSecond}
                zThird={zThird}
                zFourth={zFourth}
              />
            </div>
          </div>
        </div>
        <CompanyPagePrintableFooter />
      </div>
      </>
    );
  }else{
    return <PageSpinner />
  }
};