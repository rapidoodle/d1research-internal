'use client';

import React, { useEffect, useState } from 'react';
import '@/app/styles/company-page.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation'
import { coloredNumber, formatNumber } from '@/app/lib/utils';
import DataTable from 'react-data-table-component';
import DataTableComponent from '@/app/components/DataTables';

export default function ConsolidatedEstimatesOverview({session}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [allData, setAllData] = useState([]);
  const dPSTableColumns = [{
    name: 'Ticker',
    selector: row => row.equity_ticker,
    sortable: true,
    cell: row => <a href={`https://insider.d1research.com/groups/distribution/notes/annualized_discount/view/activity?ticker=${row.equity_ticker}`} className='d1-link' target='_blank'>{row.equity_ticker}</a>
  },
  {
    name: 'Z4',
    selector: row => row.z1,
    sortable: true,
  },
  {
    name: 'Z5',
    selector: row => row.z2,
    sortable: true,
  },
  {
    name: 'Z6',
    selector: row => row.z3,
    sortable: true,
  },
  {
    name: 'Z7',
    selector: row => row.z4,
    sortable: true,
  }];

  const aDTableColumns = [{
    name: 'Ticker',
    selector: row => row.equity_ticker,
    sortable: true,
    
  },
  {
    name: 'Z5',
    selector: row => coloredNumber(row.z6, false, true),
    sortable: true,
  },
  {
    name: 'Z6',
    selector: row => coloredNumber(row.z7, false, true),
    sortable: true,
  },
  {
    name: 'Z7',
    selector: row => coloredNumber(row.z8, false, true),
    sortable: true,
  }];
  
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
        <div className='main-container'>
            <div className='row'>
                <div className='col-12 col-md-8'>
                  <p className='font-medium'>D1 DPS estimates</p>
                  <div className='table-responsive' id='dps-table-container'>
                    <DataTableComponent key={'dps-table'} columns={dPSTableColumns} data={allData} />
                  </div>
                </div>
                <div className='col-12 col-md-4 mt-4 mt-md-0'>
                <p className='font-medium'>Annualized discount</p>
                  <div className='table-responsive' id='ad-table-container'>
                    <DataTableComponent key={'ad-table'} columns={aDTableColumns} data={allData} />
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