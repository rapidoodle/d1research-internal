import { Button } from "react-bootstrap";

const Pagination = ({ page, totalPages, setPage }) => {
    return <>
    <nav aria-label="Page navigation example" className='d-flex justify-content-end mt-3'>
        <ul class="pagination d-flex align-items-center">
          <li class="page-item" >
            <button class="page-link f-13" href="#"
            disabled={page === 1}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>Previous</button>
          </li>
          <li class="page-item"><span className="page-link f-13">Page {page} of {totalPages}</span></li>
          <li class="page-item">
            <button class="page-link f-13"
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages} href="#">Next</button>
            </li>
        </ul>
      </nav>
    </>;
}
export default Pagination;