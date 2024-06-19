'use client';

import { Suspense } from 'react';
import CsvUploader from '../ui/dashboard/csvUploadForm';
import FinancialDataTable from '../ui/dashboard/financialDataTable';
import { FinancialDataTableSkeleton } from '../ui/skeletons';
import Search from '../ui/search';
export default function Page(searchParams) {
  const query = searchParams.searchParams?.query || '';
  const currentPage = Number(searchParams.searchParams?.page) || 1;

  return (
    <div className="container mt-5">
      <CsvUploader />
      <div className='bg-light p-3'>
        <Search placeholder="Company name" />
        <Suspense key={query + currentPage} fallback={FinancialDataTableSkeleton}>
          <FinancialDataTable 
            query={query} 
            currentPage={currentPage} />
        </Suspense>
      </div>
    </div>
  );
}
