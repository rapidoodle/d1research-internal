import { Spinner } from "react-bootstrap";

export default function PageSpinner(){
    return (
    <div className="page-spinner d-flex align-items-center justify-content-center border w-100" >
        <Spinner animation="border" role="status"></Spinner>
    </div>
        
    );
}