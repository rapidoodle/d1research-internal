'use client';

import React, { useEffect, useState } from 'react';
import '@/app/styles/company-page.css';
import { useRouter } from 'next/navigation'
import DataTableComponent from '@/app/components/DataTablesComponent';
import { annualizedDiscountColumns, dpsForecastColumns } from '@/app/lib/table-columns/columns';
import PageSpinner from '@/app/components/PageSpinner';

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

      <div className="mt-3 p-2 p-md-4">
        <div className='main-container'>
            <div className='row'>
                <div className='col-12'>
                  <div className='table-responsive d-flex justify-content-center' id='dps-table-container'>
                    <DataTableComponent key={'dps-table'} columns={dpsForecastColumns} data={allData} />
                  </div>
                </div>
            </div>
        </div>

        <div className='footer mt-4'>
          <p className='text-bold f-12 mb-0 font-medium'>Disclaimer</p>
          <p className='mb-0 f-12'>The information contained in this presentation is confidential. D1 Research GmbH shall not be liable to any recipient for any inaccuracies or omissions and have no liability in respect of any loss or damage suffered by any recipient in connection with any information provided.</p>
        </div>
      </div>

      </>
    );
  }else{
    return <PageSpinner />
  }
};