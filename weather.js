const WEATHER_API_URL = "http://api.weatherapi.com/v1";
const key = "19d952ab1d164771b4723930262110";

const current_URL = `${WEATHER_API_URL}/current.json?key=${key}&q=Calgary`;
const forecast_URL = `${WEATHER_API_URL}/forecast.json?key=${key}&q=Calgary`;

async function getCurrentWeather(url){
    const response = await fetch(url);
    if(!response.ok){
        throw new Error(`Something has gone wrong: ${response.status}`);
    }
    const jsonData = await response.json();
    const{data} = jsonData;
    return data;
}

/* function createDayCard(day){
    return `
        <div class=day-card>
            
    `
} */

