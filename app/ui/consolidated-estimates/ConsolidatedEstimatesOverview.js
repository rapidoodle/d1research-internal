'use client';

import React, { useEffect, useMemo, useState } from 'react';
import '@/app/styles/company-page.css';
import { useRouter } from 'next/navigation'
import DataTableComponent from '@/app/components/DataTablesComponent';
import { annualizedDiscountColumns } from '@/app/lib/table-columns/columns';
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

        } catch (error) {
          console.error('Failed to fetch company data:', error);
          setLoading(false);
        }
      };

      fetchFinancialData();
  }, [router]);
      
  const [filterText, setFilterText] = useState('');
  const [filteredData, setFilteredData] = useState(allData);

  const handleFilter = (e) => {
    const value = e.target.value;
    setFilterText(value);

    const filtered = data.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredData(filtered);
  };
  

const dpsForecastColumns = useMemo(
    () => {

      [
      {
        name: (
          <div>
            Name
            <input
              type="text"
              placeholder="Filter By Name"
              value={filterText}
              onChange={handleFilter}
              style={{ width: '100%' }}
            />
          </div>
        ),
        selector: row => row.name,
        sortable: true,
        filterable: true,
      },
  // {
  //   name: 'Ticker',
  //   selector: row => row.equity_ticker,
  //   sortable: true,
  //   cell: row => <a href={`https://insider.d1research.com/groups/distribution/notes/annualized_discount/view/activity?ticker=${row.equity_ticker}`} className='d1-link' target='_blank'>{row.equity_ticker}</a>
  // },
  {
    name: 'Z4',
    cell: row => format2Decimal(row.z1),
    selector: row => formatSelectorNumber(row.z1),
    sortable: true,
  },
  {
    name: 'Z5',
    cell: row => format2Decimal(row.z2),
    selector: row => formatSelectorNumber(row.z2),
    sortable: true,
  },
  {
    name: 'Z6',
    cell: row => format2Decimal(row.z3),
    selector: row => formatSelectorNumber(row.z3),
    sortable: true,
  },
  {
    name: 'Z7',
    cell: row => format2Decimal(row.z4),
    selector: row => formatSelectorNumber(row.z4),
    sortable: true,
  }]

}
);


  if(!loading){
    return (<>

      <div className="estimates-container">
        <div className='main-container'>
            <div className='row'>
                <div className='col-12'>
                    <div className='table-responsive'>
                      <DataTableComponent key={'dps-table'} columns={dpsForecastColumns} data={allData} />
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