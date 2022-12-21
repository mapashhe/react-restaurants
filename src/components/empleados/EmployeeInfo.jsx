import axios from 'axios';
import { useState } from 'react';
import { useForm } from '../../hooks/useForm';

export const EmployeeInfo = ({ employee, openModal, setIsNewEmp, setFormState }) => {

  const onTryEdit = () => {
    setIsNewEmp(false);
    openModal(true);
  }

  // const onUpdate = (e, id) => {
  //   e.preventDefault();
  //   axios.put(`http://localhost:3050/employee_update/${id}`, formState)
  //     .then(res => {
  //       console.log(res);
  //       if (res.data.error == false) {

  //       } else {
  //         alert(res.data);
  //       }
  //     }).catch(err => {
  //       console.log(err);
  //     });
  // }

  const onDelete = (e, id) => {
    e.preventDefault();
    axios.delete(`http://localhost:3050/employee_delete/${id}`, { data: { employee_type: localStorage.getItem("employee_type"), employee_id: localStorage.getItem("employee_id") } })
      .then(res => {
        if (res.data.error == false) {

        } else {
          alert(res.data.respuesta);
        }
      }).catch(err => {
        console.log(err);
      });
  }

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
          <button variant="primary" onClick={()=>alert()}>
            Eliminar
          </button>
        </td>
      </tr>
    </>
  )
}
