import { displayDate, formatNumber } from "@/app/lib/utils";

export default function ExDivCalendar({allData}) {
    return (<>
    <div className="card ex-div-calendar flex-fill">
        <h5>Ex-div calendar</h5>
        <hr />
        <table className="table table-responsive">
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
                <td>{yearLabel}</td>
                <td>{displayDate(data.ex_date_q1)}</td>
                <td>{displayDate(data.ex_date_q2)}</td>
                <td>{displayDate(data.ex_date_q3)}</td>
                <td>{displayDate(data.ex_date_q4)}</td>
                </tr>
            );
            })}
        </tbody>
        </table>
    </div>    
    </>
    );
}