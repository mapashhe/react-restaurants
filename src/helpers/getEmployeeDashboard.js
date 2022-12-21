export const getEmployeeDashboard = async() => {
    const apiUrl = 'http://localhost:3050/employee_dashboard';
    const resp = await fetch(apiUrl);
    const data = await resp.json();
    const employees = data.map( (emp) => ({
        employee_name: emp.employee_name,
        employee_email: emp.employee_email,
        employee_type: emp.employee_type,
        employee_id: emp.employee_id,
        user_type_name: emp.user_type_name,
        restaurant_id: emp.restaurant_id
    }));
    return employees;
}