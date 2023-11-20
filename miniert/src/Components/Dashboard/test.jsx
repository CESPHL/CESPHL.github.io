const TimesheetTable = () => {
    const [attendanceData, setAttendanceData] = useState([]);
    const employee_id = localStorage.getItem('employee_id');

    useEffect(() => {
        axios.get(`http://localhost:4000/api/talents/${employee_id}`)
            .then(response => {
                setAttendanceData(response.data.attendance);
            }).catch(err => {
                console.log(err);
            });
    }, [employee_id]);

    // Function to get the day of the week from a date
    const getDayOfWeek = (dateString) => {
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const date = new Date(dateString);
        return daysOfWeek[date.getDay()];
    };

    // Function to group attendance data by week
    const groupByWeek = (data) => {
        const groupedData = {};
        data.forEach(attendance => {
            const weekStartDate = new Date(attendance.date);
            weekStartDate.setDate(weekStartDate.getDate() - weekStartDate.getDay()); // Set to the start of the week (Sunday)
            const weekKey = weekStartDate.toISOString().split('T')[0]; // Use ISO date as the key
            if (!groupedData[weekKey]) {
                groupedData[weekKey] = [];
            }
            groupedData[weekKey].push(attendance);
        });
        return groupedData;
    };

    const groupedAttendanceData = groupByWeek(attendanceData);

    return (
        <div className="tableContainer">
            {Object.keys(groupedAttendanceData).map(weekStartDate => (
                <div key={weekStartDate}>
                    <h2>Week starting from {weekStartDate}</h2>
                    <div className="tableHeader">
                        {/* your header elements here */}
                    </div>
                    <div className="tableContent">
                        {groupedAttendanceData[weekStartDate].map(attendance => (
                            <div key={attendance.date}>
                                {/* your table content elements here */}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default TimesheetTable;


const TimesheetTable = () => {
	const [attendanceData, setAttendanceData] = useState([]);
	const employee_id = localStorage.getItem('employee_id');
	useEffect(() => {
		axios.get(`http://localhost:4000/api/talents/${employee_id}`)
			.then(response => {
				setAttendanceData(response.data.attendance);
			}).catch(err => {
				console.log(err);
			});
	}, [employee_id]);

	return (
		<div className="tableContainer">
			<div className="tableHeader">
				<h1>Time In</h1>
				<h1>Time Out</h1>
				<h1>Date</h1>
				<h1>Day</h1>
				<h1>Client</h1>
				<h1>Project</h1>
				<h1>OT Time In</h1>
				<h1>OT Time Out</h1>
			</div>
			<div className="tableContent">
				{attendanceData.map(attendance => (
					<div key={attendance.date}>
						{attendance.time_in ? <p>{attendance.time_in}</p> : <p>----------</p>}
						{attendance.time_out ? <p>{attendance.time_out}</p> : <p>----------</p>}
						{attendance.date ? <p>{attendance.date}</p> : <p>----------</p>}
						{attendance.day ? <p>{attendance.day}</p> : <p>----------</p>}
						{attendance.client_name ? <p>{attendance.client_name}</p> : <p>----------</p>}
						{attendance.project_name ? <p>{attendance.project_name}</p> : <p>----------</p>}
						{attendance.ot_time_in ? <p>{attendance.ot_time_in}</p> : <p>----------</p>}
						{attendance.ot_time_out ? <p>{attendance.ot_time_out}</p> : <p>----------</p>}
					</div>
				))}
			</div>
		</div>
	);
}