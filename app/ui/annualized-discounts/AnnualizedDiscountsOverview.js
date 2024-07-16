'use client';

import React, { useEffect, useState } from 'react';
import '@/app/styles/company-page.css';
import { useRouter } from 'next/navigation'
import DataTableComponent from '@/app/components/DataTablesComponent';
import { annualizedDiscountColumns, dpsForecastColumns } from '@/app/lib/table-columns/columns';

export default function AnnualiazedDiscountsOverview({session}) {
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

      <div className="financial-overview-page mt-3 p-2 p-md-4">
        <div className='main-container'>
            <div className='row'>
                <div className='col-12 mt-md-0'>
                <p className='font-medium'>Annualized discount</p>
                  <div className='table-responsive' id='ad-table-container'>
                    <DataTableComponent key={'ad-table'} columns={annualizedDiscountColumns} data={allData} />
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
    return <div className='p-3'>Loading...</div>
  }
};