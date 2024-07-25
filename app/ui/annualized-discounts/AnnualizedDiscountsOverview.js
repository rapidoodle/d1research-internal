'use client';

import React, { useEffect, useState } from 'react';
import '@/app/styles/company-page.css';
import { useRouter } from 'next/navigation'
import DataTableComponent from '@/app/components/DataTablesComponent';
import { annualizedDiscountColumns, dpsForecastColumns } from '@/app/lib/table-columns/columns';
import PageSpinner from '@/app/components/PageSpinner';

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

        } catch (error) {
          console.error('Failed to fetch company data:', error);
          setLoading(false);
        }
      };

      fetchFinancialData();
  }, [router]);

  if(!loading){
    return (<>

      <div className="estimates-container">
        {/* {JSON.stringify(allData)} */}
        <div className='main-container'>
            <div className='row'>
                <div className='col-12'>
                  <div className='table-responsive'>
                    <DataTableComponent key={'ad-table'} columns={annualizedDiscountColumns} data={allData} />
                  </div>
                </div>
            </div>
        </div>
      </div>

      </>
    );
  }else{
    return <PageSpinner />
  }
};