'use client';

import React, { useEffect, useState } from 'react';
import '@/app/styles/company-page.css';
import { useRouter } from 'next/navigation'
import DataTableComponent from '@/app/components/DataTablesComponent';
import { annualizedDiscountColumns, dpsForecastColumns, dpsForecastColumns2 } from '@/app/lib/table-columns/columns';
import PageSpinner from '@/app/components/PageSpinner';
import CustomTableComponent from '@/app/components/CustomTableComponent';
import { format2Decimal } from '@/app/lib/utils';

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

        } catch (error) {
          console.error('Failed to fetch company data:', error);
          setLoading(false);
        }
      };

      fetchFinancialData();
  }, [router]);

  if(!loading){
    return (<>

      <div>
        <div className='table-responsive'>
          {/* <DataTableComponent key={'dps-table'} columns={dpsForecastColumns} data={allData} /> */}
          <CustomTableComponent 
            key={'dps-table'} 
            columns={dpsForecastColumns2} 
            data={allData}
            fixedHeader={true}
            inputFormat={format2Decimal}  />
        </div>
      </div>

      </>
    );
  }else{
    return <PageSpinner />
  }
};