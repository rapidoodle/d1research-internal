import moment from "moment";
import { useEffect, useState } from "react";

export default function UpcomingEvents( { allData } ) {
    const ticker = allData[0].equity_ticker;
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState (false);


    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true);
            const response = await fetch(`/api/events?equity_ticker=${ticker}&type=company`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    }
                }
            );
            
            const data = await response.json();
            console.log(data);
            setEvents(data.data);
            setLoading(false);

            return data;
        }
        
        fetchEvents();
    }, []);

    return (<>
        <div className="card flex-fill mb-4" style={{maxHeight: '300px'}}>
            <h4>Upcoming events</h4>
            <hr />
            <div className="table-responsive">
                <table className="table table-responsive table-fixed-header">
                    <thead>
                        <tr>
                        <th width="140px">Date</th>
                        <th>Confirmed and expected events</th>
                        </tr>
                    </thead>
                    <tbody>

                    { events.length > 0 && events?.map((event, index) => (
                        <tr key={index}>
                            <td>{moment(new Date(event.start_date)).format('YYYY-MM-DD')}</td>
                            <td>{event.friendly_name}</td>
                        </tr>
                    ))
                    }

                    {events.length === 0 && <tr><td colSpan="2" align="center" className="pt-3">No upcoming events</td></tr>}
                    </tbody>
                </table>
            </div>
        </div>
    </>
    );
}