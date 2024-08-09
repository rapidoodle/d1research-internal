export default function CompanyPagePrintableFooter(){
    return (
        <div className='row printable'>
          <div className='col footer print-footer'>
            <div className='d-flex justify-content-between f-10'>
            <p className='text-bold f-12'>Disclaimer</p>
            <p className='text-bold f-12'>contact@d1research.com</p>
            </div>
            <p className='mb-0 f-12'>The information contained in this presentation is confidential. D1 Research GmbH shall not be liable to any recipient for any inaccuracies or omissions and have no liability in respect of any loss or damage suffered by any recipient in connection with any information provided.</p>
          </div>
        </div>
    );
}