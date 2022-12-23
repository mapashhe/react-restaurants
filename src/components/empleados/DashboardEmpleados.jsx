import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useFetchEmployees, useFetchRestaurants, useForm } from "../../hooks";
import { EmployeeInfo } from "./EmployeeInfo";
import '../../styles.css';
import axios from "axios";


export const DashboardEmpleados = () => {

    const [show, setShow] = useState(false);
    const [isNewEmp, setIsNewEmp] = useState(true);
    const { employees, setEmployees } = useFetchEmployees();
    const { restaurants } = useFetchRestaurants();

    const { onInputChange, onResetInputs, setFormState, formState,
        employee_id, employee_name, employee_email, employee_type,
        employee_pass, restaurant_id, user_type_name } = useForm({
            employee_id: '',
            employee_name: '',
            employee_email: '',
            employee_type: 1,
            employee_pass: '',
            restaurant_id: '',
            user_type_name: ''
        });

    const onSendForm = (e) => {
        e.preventDefault();
        (employee_id === '')
            ? axios.post("http://localhost:3050/add_employee", formState).then(res => { respuesta(res) })
            : axios.put(`http://localhost:3050/employee_update/${employee_id}`, formState).then(res => { respuesta(res) })
    }

    const onSendDelete = (emp) => {
        axios.delete(`http://localhost:3050/employee_delete/${emp}`, formState)
        .then(res => {
            const {respuesta, error} = res.data;
            alert(respuesta);
            if(error == false){
                const newEmployeesState = employees.filter(function(emplo) { return emplo.employee_id != emp; });
                setEmployees([...newEmployeesState]);
            }
        }).catch(err => {
            console.log(err);
        });
    }

    
    const changeValue = (e) => {
        e.preventDefault();
        const {value, name} = e.target;
        console.log(name);
        setFormState({
            ...formState,
            [name]: value,
            'user_type_name': (value == 1) ? 'user' : 'admin'
        });
    }

    const respuesta = (res) => {
        try {
            const { id, respuesta, error } = res.data;
            if (error === false) {
        if (id) {
            console.table(formState);
        setEmployees([...employees, 
            { ...formState, 
                "employee_id": id,
                "user_type_name": (employee_type == 1) ? 'user' : 'admin'
            }]);
                } else {
                    const newEmployeesState = employees.map( (emp) => {
                        if(emp.employee_id == employee_id){

                            return formState;
                        }
                        return emp;
                    });
                    setEmployees([...newEmployeesState]);
                }
                setShow(false);
            } else {
                console.log(respuesta);
            }
        } catch (err) {
            console.log(err);
        };
    }

    const opciones = restaurants.map((rest) => ({
        restaurant_id: rest.restaurant_id,
        restaurant_name: rest.restaurant_name
    }));

    const onAddNewEmp = () => {
        onResetInputs();
        setIsNewEmp(true);
        setShow(true);
    }

    return (
        <>
            <h4>Bienvenido! {localStorage.getItem("employee_name")}</h4>
            <h2>Dashboard de Empleados</h2>
            <table className="table table-borderless">
                <thead>
                    <tr><th>Nombre</th><th>Correo</th><th>Tipo</th><th>Edit</th><th>Delete</th></tr>
                </thead>
                <tbody>
                    {
                        employees.map((employee) => <EmployeeInfo
                            employee={employee}
                            key={employee.employee_id}
                            openModal={setShow}
                            setIsNewEmp={setIsNewEmp}
                            setFormState={setFormState}
                            setDelete={onSendDelete}
                            theformstate= {formState}
                        />)
                    }
                </tbody>
            </table>
            <button className="btn btn-primary mb-1" onClick={onAddNewEmp}>Add Employee</button>

            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{(isNewEmp === true) ? ('Nuevo Empleado') : ('Editar Empleado')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div>
                            <label htmlFor="employee_name">Nombre:</label>
                            <input type="text" name="employee_name" value={employee_name} onChange={onInputChange} />
                            <label htmlFor="employee_email">Email:</label>
                            <input type="email" name="employee_email" value={employee_email} onChange={onInputChange} />
                            <label htmlFor="employee_pass">Password:</label>
                            <input type="password" name="employee_pass" value={employee_pass} onChange={onInputChange} />
                            <label htmlFor="employee_type">Type:</label>
                            <select name="employee_type" className="w-25 p-1" value={employee_type} onChange={(e) => changeValue(e)}>
                                <option value="1">USER</option>
                                <option value="2">ADMIN</option>
                            </select>
                            <label htmlFor="restaurant_id">Restaurant:</label>
                            <select name="restaurant_id" className="w-25 p-1" value={restaurant_id} onChange={onInputChange}>
                                <option value=''>NA</option>
                                {
                                    opciones.map((opn) => {
                                        return <option key={opn.restaurant_id} value={opn.restaurant_id}>{opn.restaurant_name}</option>
                                    })
                                }
                            </select>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setShow(false)}>
                        Cerrar
                    </Button>
                    <Button onClick={(e) => onSendForm(e)}>
                        Guardar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
