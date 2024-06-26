'use client';

import CompaniesTable from "@/app/ui/settings/companies/companiesTable";
import NewCompanyForm from "@/app/ui/settings/companies/newCompanyForm";
import { useState } from "react";

export default function Companies(searchParams) {
  const query = searchParams.searchParams?.query || '';
  const currentPage = Number(searchParams.searchParams?.page) || 1;
  const [companyAdded, setCompanyAdded] = useState(false);

  // Callback to update the state
  const handleCompanyAdded = () => {
    setCompanyAdded(!companyAdded);
  };

    return (
      <main>
        <div className="bg-light p-3">
          <NewCompanyForm onCompanyAdded={handleCompanyAdded} />
        </div>

        <div className="mt-3 bg-light p-3">
          <CompaniesTable 
            query={ query }
            currentPage={ currentPage }
            companyAdded={ companyAdded } />
        </div>
      </main>
    )
  }
  