const attendanceData = [
	{ date: "November 13, 2023", time_in: "7: 00 AM", time_out: "7:00 PM", day: "Monday" },
	{ date: "November 14, 2023", time_in: "7: 00 AM", time_out: "7:00 PM", day: "Tuesday" },
	{ date: "November 15, 2023", time_in: "7: 00 AM", time_out: "7:00 PM", day: "Wednesday" },
	{ date: "November 16, 2023", time_in: "7: 00 AM", time_out: "7:00 PM", day: "Thursday" },
	{ date: "November 17, 2023", time_in: "7: 00 AM", time_out: "7:00 PM", day: "Friday" },
	{ date: "November 18, 2023", time_in: "7: 00 AM", time_out: "7:00 PM", day: "Saturday" },
	{ date: "November 20, 2023", time_in: "7: 00 AM", time_out: "7:00 PM", day: "Monday" },
	{ date: "November 21, 2023", time_in: "7: 00 AM", time_out: "7:00 PM", day: "Tuesday" },
]

// useEffect(() => {
// 	if (attendanceData.length > 0 && attendanceData.length <= 7) {
// 		const dummyColumns = [{}];
// 		for (let i = attendanceData.length; i <= 7; i++) {
// 			console.log(daysOfWeek[i]);
// 			dummyColumns.push(
// 				<div key={i} className="verticalContainerContent">
// 					<p>daysOfWeek[i].substring(0, 1)</p>
// 				</div>
// 			);
// 		}
// 		console.log(dummyColumns);
// 	}
// }, [attendanceData])

// useEffect(() => {
// 	if (startDate && endDate) {
// 		const filteredAttendanceData = attendanceData.filter(entry => {
// 			const date = entry.date; // Get date
// 			const dateObject = new Date(date + "UTC"); // Convert into the proper format
// 			const formattedDate = dateObject.toISOString().split('T')[0]; // Cut the string to match the format of startDate & endDate
// 			return formattedDate >= startDate && formattedDate <= endDate;
// 		});
// 		// Update the state only once at the end
// 		console.log(filteredAttendanceData);
// 		setAttendanceData(filteredAttendanceData);
// 	}
// }, [startDate, endDate, attendanceData]); // useEffect will re-run if startDate or endDate change

// Function to generate dummy columns based on colCount
// const renderDummyColumns = () => {
// 	const dummyColumns = [];
// 	for (let i = colCount; i < 7; i++) {
// 		dummyColumns.push(
// 			<div key={`dummy-${i}`} className="verticalContainerContent">
// 				<p></p>
// 				<p></p>
// 				<p></p>
// 				<p></p>
// 				<p></p>
// 				<p></p>
// 			</div>
// 		);
// 	}
// 	return dummyColumns;
// };

const data = [
	{ client_name: "GCash", date: "November 12, 2023", day: "Sunday", project_name: "GCash-Mynt", time_in: "7:00 AM", time_out: "7:00 PM", total_hours: 12 },
	{ client_name: "GCash", date: "November 14, 2023", day: "Tuesday", project_name: "GCash-Mynt", time_in: "7:00 AM", time_out: "7:00 PM", total_hours: 12 },
	{ client_name: "GCash", date: "November 15, 2023", day: "Wednesday", project_name: "GCash-Mynt", time_in: "7:00 AM", time_out: "7:00 PM", total_hours: 12 },
	{ client_name: "GCash", date: "November 16, 2023", day: "Thursday", project_name: "GCash-Mynt", time_in: "7:00 AM", time_out: "7:00 PM", total_hours: 12 },
	{ client_name: "GCash", date: "November 17, 2023", day: "Friday", project_name: "GCash-Mynt", time_in: "7:00 AM", time_out: "7:00 PM", total_hours: 12 },
	{ client_name: "GCash", date: "November 18, 2023", day: "Saturday", project_name: "GCash-Mynt", time_in: "7:00 AM", time_out: "7:00 PM", total_hours: 12 },
]

