import { displayDate, displayExDivDate, formatNumber } from "@/app/lib/utils";

export default function ExDivCalendar({allData}) {
    return (<>
    <div className="card ex-div-calendar flex-fill">
        <h5>Ex-div calendar</h5>
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
                    </tr>
                </thead>
                <tbody>
                {allData.map((data, index) => {
                    const currentYear = new Date().getFullYear();
                    const yearLabel = data.year > currentYear ? `${data.year}e` : data.year;
                    return (
                        <tr key={index}>
                            <td style={{width: 100}}>{yearLabel}</td>
                            <td>{displayExDivDate(data.ex_date_q1)}</td>
                            <td>{displayExDivDate(data.ex_date_q2)}</td>
                            <td>{displayExDivDate(data.ex_date_q3)}</td>
                            <td>{displayExDivDate(data.ex_date_q4)}</td>
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