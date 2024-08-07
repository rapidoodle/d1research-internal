import { displayDate } from "@/app/lib/utils";
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
            setEvents(data.data);
            setLoading(false);
            return data;
        }
        
        fetchEvents();
    }, []);

    return (<>
        <div className="card flex-fill">
            <h5>Upcoming events</h5>
            <hr />
            <div className="table-responsive">
                <table className="table table-responsive table-fixed-header">
                    <thead>
                        <tr>
                            <th width="120px">Date</th>
                            <th className="text-left">
                                <span className="d-none d-sm-block">Confirmed and expected events</span>
                                <span className="d-block d-sm-none">Events</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                    { events.length > 0 && events?.map((event, index) => 
                    {
                        const title = event.friendly_name?.split(' - ')[1];

                    return (
                        //check if event.start_date is in the future
                        moment().isBefore(event.start_date) &&
                        <tr key={index}>
                            <td>{displayDate(event.start_date)}</td>
                            <td className="text-left"><a href={event.source_url} target="_blank" className="d1-text-link">{title}</a></td>
                        </tr>
                    )}
                    )}

                    {events.length === 0 && <tr><td colSpan="2" align="center" className="pt-3"><div className="text-center">No upcoming events</div></td></tr>}
                    </tbody>
                </table>
            </div>
        </div>
    </>
    );
}