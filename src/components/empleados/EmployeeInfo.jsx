
export const EmployeeInfo = ({ employee, openModal, setIsNewEmp, setFormState, setDelete, theformstate }) => {

  const onTryEdit = () => {
    setIsNewEmp(false);
    setFormState(employee);
    openModal(true);
  }

  const onTryDelete = (emp_id) => {    
    setDelete(emp_id);
  }

  //el victor es jotillo

  return (
    <>
      <tr>
        <td>{employee.employee_name}</td>
        <td>{employee.employee_email}</td>
        <td>{employee.user_type_name}</td>
        <td>
          <button variant="primary" onClick={onTryEdit}>
            Editar
          </button>
        </td>
        <td>
          <button variant="primary" onClick={ () => onTryDelete(employee.employee_id)}>
            Eliminar
          </button>
        </td>
      </tr>
    </>
  )
}
