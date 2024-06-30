'use client';

import CompaniesTable from "@/app/ui/settings/companies/companiesTable";
import NewCompanyForm from "@/app/ui/settings/companies/newCompanyForm";
import { useState } from "react";
import { Modal } from "bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Search from "@/app/ui/search";

export default function Page(searchParams) {
  const query = searchParams.searchParams?.query || '';
  const currentPage = Number(searchParams.searchParams?.page) || 1;
  const [companyAdded, setCompanyAdded] = useState(false);

  // Callback to update the state
  const handleCompanyAdded = () => {
    setCompanyAdded(!companyAdded);
  };

  useEffect(() => {
    if (companyAdded && typeof window !== 'undefined') {
      const closeButton = document.querySelector('.btn-close');
      if (closeButton) {
        closeButton.click();
      }
    }
  }, [companyAdded]);
 
  return (
    <main>
      <div className="bg-light p-3 row">
        <h5 className="mb-0 col">Companies</h5>

        <div className="ms-auto col d-flex justify-content-end">
          <div>
            <Search placeholder="Company" />
          </div>
          <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#addCompanyModal">
          <FontAwesomeIcon icon={faPlus} className="me-1" /> Add new company
          </button>
        </div>
      </div>

      <div className="mt-3">
        <CompaniesTable 
          query={ query }
          currentPage={ currentPage }
          companyAdded={ companyAdded } />
      </div>

      <div class="modal fade"  id="addCompanyModal" tabindex="-1" aria-labelledby="addCompanyModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="addCompanyModalLabel">Add new company</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <NewCompanyForm onCompanyAdded={handleCompanyAdded} />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
  