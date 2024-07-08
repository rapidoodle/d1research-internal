import { formatNumber } from "@/app/lib/utils";

export default function ExDivCalendar({allData}) {
    return (<>
    <div className="card ex-div-calendar flex-fill">
        <h4>Ex-div calendar</h4>
        <hr />
        <table>
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
            return (
                <tr key={index}>
                <td>{data.year}</td>
                <td>{formatNumber(data.ex_date_q1)}</td>
                <td>{formatNumber(data.ex_date_q2)}</td>
                <td>{formatNumber(data.ex_date_q3)}</td>
                <td>{formatNumber(data.ex_date_q4)}</td>
                </tr>
            );
            })}
        </tbody>
        </table>
    </div>    
    </>
    );
}