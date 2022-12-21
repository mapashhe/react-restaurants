import { useEffect, useState } from "react";
import { getEmployeex } from "../helpers/getEmployee";

export const useFetchEmployee = (id) => {

    const [employee, setEmployee] = useState([]);

    const getEmployee = async() => {
        const getEmployee = await getEmployeex(id);
        setEmployee(getEmployee);
    }

    useEffect( () => {
        getEmployee()
    }, [])


  return [...employee]
  
  
}
