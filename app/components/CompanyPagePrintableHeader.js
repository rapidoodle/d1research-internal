export default function CompanyPagePrintableHeader({company, displayIndex, ticker, divTicker}){
    return (
        <div className="printable">
            <div className="row">
                <div className="col-6 d-flex align-items-center">
                    <img 
                        src="https://d1researchstorage.s3.amazonaws.com/company-logo-rectangle.webp" 
                        alt="D1 Research" 
                        className="page-spinner-logo" 
                        height={50}
                    />
                </div>
                <div className="col-6">
                    <div className="d-flex mb-2 justify-content-between align-items-center">
                        <div className="w-100">
                            <div className="printable-header-details"><b>Company name:</b> <span className="ms-2">{company.label}</span> </div>
                        </div>
                        <div className="w-100 ms-2">
                        <div className="printable-header-details"><b>Div ticker:</b> <span className="ms-2">{divTicker.label}</span> </div>
                        </div>
                    </div>
                    <div className="d-flex mb-2 justify-content-between">
                        <div className="w-100">
                        <div className="printable-header-details"><b>Ticker:</b> <span className="ms-2">{ticker.label}</span> </div>
                        </div>
                        <div className="w-100 ms-2">
                        <div className="printable-header-details"><b>Div index:</b> <span className="ms-2">{displayIndex}</span> </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}