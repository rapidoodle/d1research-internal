import { Spinner } from "react-bootstrap";

export default function PageSpinner(){
    return (
        <div className="page-spinner-overlay">
            {/* <Spinner animation="border" role="status"></Spinner> */}
            <div className="loader-container">
                <div className="spinner"></div>
                <img 
                    src="https://d1researchstorage.s3.amazonaws.com/company-logo-square.png" 
                    alt="D1 Research" 
                    className="page-spinner-logo" 
                    width={80} 
                    height={80} 
                />
            </div>
        </div>
    );
}