import { useEffect, useState } from 'react';

const TimesheetTable = () => {

    const [timesheets, setTimesheets] = useState(null);

    useEffect(() => {
        const fetchTimesheets = async () => {
            const response = await fetch('/api/talents/10000');
            const json = await response.json();

            if (response.ok) {
                setTimesheets(json);
            }
        }
        fetchTimesheets()
    }, []);

    return (
        <div>
            <h2>Test</h2>
            <div>
                {timesheets && timesheets.map((timesheet) => (
                    <p key={timesheet.first_name}>{timesheet.last_name}</p>
                ))}
            </div>
        </div>
    );
};

export default TimesheetTable;