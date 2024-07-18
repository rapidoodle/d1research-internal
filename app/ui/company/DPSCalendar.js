import { formatNumber } from "@/app/lib/utils";

export default function DPSCalendar({allData}) {
    return (<>
        <div className="card flex-fill">
            <h4>DPS calendar</h4>
            <hr />
            <div className="table-responsive">
                <table className="table table-responsive">
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
                        const dpsTotal = data.dps_q1 + data.dps_q2 + data.dps_q3 + data.dps_q4;
                        const currentYear = new Date().getFullYear();
                        const yearLabel = data.year > currentYear ? `${data.year}e` : data.year;
                        return (
                            <tr key={index}>
                                {/* if year is greater than this year, add e  */}
                                <td>{yearLabel}</td>

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