export default function AttendanceTable({ attendance }) {
    return (
        <table border="1" cellPadding="10">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Student ID</th>
                    <th>Date</th>
                    <th>Status</th>
                </tr>
            </thead>

            <tbody>
                {attendance.map((record) => (
                    <tr key={record.id}>
                        <td>{record.id}</td>
                        <td>{record.student_id}</td>
                        <td>{record.date}</td>
                        <td>{record.status}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}