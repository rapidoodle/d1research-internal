import { formatNumber } from "@/app/lib/utils";

export default function DPSCalendar({allData}) {
    return (<>
        <div className="card flex-fill">
            <h5>DPS calendar</h5>
            <hr />
            <div className="table-responsive">
                <table className="table table-responsive year-table">
                    <thead>
                        <tr>
                            <th>Year</th>
                            <th>Q1</th>
                            <th>Q2</th>
                            <th>Q3</th>
                            <th>Q4</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* iterate all data, and display */}
                        {allData.map((data, index) => {

                            //calculate dps sum, check if dps is n/a
                            if(data.dps_q1 === 'n/a' || data.dps_q1 === 'NaN'){
                                data.dps_q1 = 0;
                            }
                            if(data.dps_q2 === 'n/a' || data.dps_q2 === 'NaN'){
                                data.dps_q2 = 0;
                            }
                            if(data.dps_q3 === 'n/a' || data.dps_q3 === 'NaN'){
                                data.dps_q3 = 0;
                            }
                            if(data.dps_q4 === 'n/a' || data.dps_q4 === 'NaN'){
                                data.dps_q4 = 0;
                            }


                        const dpsTotal = Number(data.dps_q1) + Number(data.dps_q2) + Number(data.dps_q3) + Number(data.dps_q4);

                        const currentYear = new Date().getFullYear();
                        const yearLabel = data.year > currentYear ? `${data.year}e` : data.year;
                        return (
                            <tr key={index}>
                                {/* if year is greater than this year, add e  */}
                            <td style={{width: 100}}>{yearLabel}</td>
                                <td>{formatNumber(data.dps_q1)}</td>
                                <td>{formatNumber(data.dps_q2)}</td>
                                <td>{formatNumber(data.dps_q3)}</td>
                                <td>{formatNumber(data.dps_q4)}</td>
                                <td>{formatNumber(dpsTotal)}</td>
                            </tr>
                        );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    </>
    );
}