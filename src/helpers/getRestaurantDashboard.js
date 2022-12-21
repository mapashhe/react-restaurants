export const getRestaurantDashboard = async() => {
    const apiUrl = 'http://localhost:3050/restaurant_dashboard';
    const resp = await fetch(apiUrl);
    const {respuesta, error} = await resp.json();
    if(error){
        return [];
    }else{
        const restaurantes = respuesta.map( (rest) => ({
            restaurant_id: rest.restaurant_id,
            restaurant_location: rest.restaurant_location,
            restaurant_name: rest.restaurant_name
        }));
        return restaurantes;
    }
}