'use client';

import CompaniesTable from "@/app/ui/settings/companies/companiesTable";
import NewCompanyForm from "@/app/ui/settings/companies/newCompanyForm";
import {  useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Search from "@/app/ui/search";
import { Button, Modal } from "react-bootstrap";

export default function Page(searchParams) {
  const query = searchParams.searchParams?.query || '';
  const currentPage = Number(searchParams.searchParams?.page) || 1;
  const [companyAdded, setCompanyAdded] = useState(false);
  const [show, setShow] = useState(false);

  // Callback to update the state
  const handleCompanyAdded = () => {
    setCompanyAdded(!companyAdded);
    handleClose();
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
 
  return (
    <main>
      <div className="bg-light p-3 row">
        <h5 className="mb-0 col">Companies</h5>

        <div className="ms-auto col d-flex justify-content-end">
          <div>
            <Search placeholder="Company" />
          </div>

          {/* <Button size="sm" variant="primary" onClick={handleShow}>
            <FontAwesomeIcon icon={faPlus} className="me-1" /> Add new company
          </Button> */}
        </div>
      </div>

      <div className="mt-3">
        <CompaniesTable 
          query={ query }
          currentPage={ currentPage }
          companyAdded={ companyAdded } />
      </div>
      <Modal size="lg" show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add new company</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <NewCompanyForm onCompanyAdded={handleCompanyAdded} />
          </Modal.Body>
        </Modal>
    </main>
  )
}
  