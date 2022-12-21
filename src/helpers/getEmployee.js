export const getEmployeex = async(id) => {
    const apiUrl = `http://localhost:3050/employee/${id}`;
    const resp = await fetch(apiUrl);
    const data = await resp.json();
    const gifs = data.map( (img) => ({
        employee_name: img.employee_name,
        employee_email: img.employee_email,
        employee_type: img.employee_type,
        user_type_name: img.user_type_name
    }));
    return gifs;
}