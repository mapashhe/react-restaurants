export const getDishDashboard = async() => {
    const apiUrl = 'http://localhost:3050/dish_dashboard';
    const resp = await fetch(apiUrl);
    const {respuesta, error} = await resp.json();
    if(error){
        return [];
    }else{
        const dishes = respuesta.map( (d) => ({
            dish_name: d.dish_name,
            dish_id: d.dish_id,
            restaurant_id: d.restaurant_id
        }));
        return dishes;
    }
}

    
