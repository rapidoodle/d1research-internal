'use client';

import React, { useEffect, useState } from 'react';
import '@/app/styles/company-page.css';
import { useRouter } from 'next/navigation'
import DataTableComponent from '@/app/components/DataTablesComponent';
import { annualizedDiscountColumns, annualizedDiscountColumns2, dpsForecastColumns } from '@/app/lib/table-columns/columns';
import PageSpinner from '@/app/components/PageSpinner';
import { calculatePercent, formatHeatmap, getPercentage } from '@/app/lib/utils';
import CustomTableComponent from '@/app/components/CustomTableComponent';

export default function AnnualiazedDiscountsOverview({session}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [allData, setAllData] = useState([]);

  
  useEffect(() => {
      const fetchFinancialData = async () => {
        try {
          setLoading(true);
          const response = await fetch(`/api/annualized-discounts/`);
          const data = await response.json();
          
          if (!response.ok) {
            router.push("/settings/companies");
            throw new Error(`Error: ${response.statusText}`);
          }
          // Set all data in reverse order
          setLoading(false);

          const relevantYears = [2025, 2026, 2027];

          const groupedData = data.reduce((acc, item) => {
            if (!acc[item.equity_ticker]) {
              acc[item.equity_ticker] = { equity_ticker: item.equity_ticker };
            }
            if (relevantYears.includes(item.year)) {
              const yearKey = `z${item.year - 2020}`;
              acc[item.equity_ticker][yearKey] = calculatePercent(item.current_price_z, item.dps_z);
            }
            return acc;
          }, {});
          
          const newData = Object.values(groupedData);
          
          setAllData(newData);

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
        {/* {JSON.stringify(allData)} */}
        <div className='main-container'>
            <div className='row'>
                <div className='col-12'>
                  <div className='table-responsive'>
                    {/* <DataTableComponent 
                      key={'ad-table'} 
                      columns={annualizedDiscountColumns} 
                      data={allData} 
                    /> */}
                    <CustomTableComponent 
                      key={'ad-table'} 
                      columns={annualizedDiscountColumns2} 
                      data={allData} 
                      inputFormat={formatHeatmap}
                    />
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