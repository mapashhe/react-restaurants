import { useEffect, useState } from "react";
import { getEmployeeDashboard } from "../helpers/getEmployeeDashboard";

export const useFetchEmployees = () => {

    const [employees, setEmployees] = useState([]);

    const getEmployees = async() => {
        const getEmployees = await getEmployeeDashboard();
        setEmployees(getEmployees);
    }

    useEffect( () => {
        getEmployees()
    }, [])


  return {
    employees, 
    setEmployees
  }
  
}
