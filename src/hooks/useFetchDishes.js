import { useEffect, useState } from "react";
import { getDishDashboard } from "../helpers/getDishDashboard";

export const useFetchDishes = () => {

    const [dishes, setDishes] = useState([]);

    const getDishes = async() => {
        const getDishes = await getDishDashboard();
        setDishes(getDishes);
    }

    useEffect( () => {
        getDishes()
    }, [])


  return {
    dishes
  }
  
}
