import { useEffect, useState } from "react";
import { getRestaurantDashboard } from "../helpers/getRestaurantDashboard";

export const useFetchRestaurants = () => {

    const [restaurants, setRestaurants] = useState([]);

    const getRestaurants = async() => {
        const getRestaurants = await getRestaurantDashboard();
        setRestaurants(getRestaurants);
    }

    useEffect( () => {
        getRestaurants()
    }, [])


  return {
    restaurants
  }
  
}
