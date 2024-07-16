import { useEffect, useState } from "react";

export default function UpcomingEvents( { allData } ) {
    const ticker = allData[0].equity_ticker;
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState (false);

    const fetchEvents = async () => {
        setLoading(true);
        const response = await fetch('/api/events', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({equity_ticker : ticker, type : 'company'}),
        }
        );
        const data = await response.json();
        setEvents(data);
        setLoading(false);
        return data;
    }

    useEffect(() => {
        fetchEvents();
    }, []);

    return (<>
        <div className="card flex-fill mb-4">
            <h4>Upcoming events</h4>{JSON.stringify(events)}
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
                        {events.map((event) => (
                        <tr>
                            <td>{event.start_date}</td>
                            <td>{event.friendly_name}</td>
                        </tr>
                        ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    </>
    );
}