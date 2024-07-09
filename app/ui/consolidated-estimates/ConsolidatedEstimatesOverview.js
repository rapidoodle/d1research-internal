'use client';

import React, { useEffect, useState } from 'react';
import '@/app/styles/company-page.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation'
import { coloredNumber, formatNumber } from '@/app/lib/utils';

export default function ConsolidatedEstimatesOverview({session}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [allData, setAllData] = useState([]);

  useEffect(() => {
      const fetchFinancialData = async () => {
        try {
          setLoading(true);
          const response = await fetch(`/api/consolidated-estimates/`);
          const data = await response.json();
          if (!response.ok) {
            router.push("/settings/companies");
            throw new Error(`Error: ${response.statusText}`);
          }
          // Set all data in reverse order
          setAllData(data);
          setLoading(false);

          console.log(data);

        } catch (error) {
          console.error('Failed to fetch company data:', error);
          setLoading(false);
        }
      };

      fetchFinancialData();
  }, [router]);

  if(!loading){
    return (<>
      <div className="container-fluid financial-overview p-2 p-md-4">
        <div className="row mb-md-3">
            <div className="col-12 col-sm-6 d-flex align-items-center justify-content-md-start justify-content-center mt-4 mt-md-0">
              <Image
                src="https://d1researchstorage.s3.amazonaws.com/company-logo-rectangle.png"
                alt="Company Logo"
                width={185}
                height={100}
              />
            </div>
        </div>
       <hr />
        <div className='main-container'>
            <div className='row'>
                <div className='col-12 col-md-8'>
                    <p className='font-medium'>D1 DPS estimates</p>
                    <table className='table table-responsive table-striped table-hover'>
                        <thead>
                            <tr>
                                <th>Ticker</th>
                                <th>Z4</th>
                                <th>Z5</th>
                                <th>Z6</th>
                                <th>Z7</th>
                            </tr>
                        </thead>
                        <tbody>
                        {allData.map((data, index) => {
                        return (
                            <tr key={index}>
                              <td>{data.equity_ticker}</td>
                              <td>{formatNumber(data.z1)}</td>
                              <td>{formatNumber(data.z2)}</td>
                              <td>{formatNumber(data.z4)}</td>
                              <td>{formatNumber(data.z4)}</td>
                            </tr>
                        );
                        })}
                        </tbody>
                    </table>
                </div>
                <div className='col-12 col-md-4 mt-4 mt-md-0'>
                <p className='font-medium'>Annualized discount</p>
                    <table className='table table-responsive table-striped table-hover'>
                        <thead>
                            <tr>
                                <th>Z5</th>
                                <th>Z6</th>
                                <th>Z7</th>
                            </tr>
                        </thead>
                        <tbody>
                        {allData.map((data, index) => {
                        return (
                            <tr key={index}>
                              <td>{coloredNumber(data.z6, false, true)}</td>
                              <td>{coloredNumber(data.z7, false, true)}</td>
                              <td>{coloredNumber(data.z8, false, true)}</td>
                            </tr>
                        );
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div className='footer mt-4'>
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