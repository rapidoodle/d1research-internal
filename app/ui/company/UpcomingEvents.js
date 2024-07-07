export default function UpcomingEvents() {
    return (<>
        <div className="card flex-fill mb-4">
            <h4>Upcoming events</h4>
            <hr />
            <div className="table-responsive">
                <table className="table table-responsive">
                    <thead>
                        <tr>
                        <th>Date</th>
                        <th>Confirmed and expected events</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>2024-05-19</td>
                        <td>AGM</td>
                        </tr>
                        <tr>
                        <td>2024-07-19</td>
                        <td>h4 results</td>
                        </tr>
                        <tr>
                        <td>2024-11-03</td>
                        <td>Q3 results</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </>
    );
}