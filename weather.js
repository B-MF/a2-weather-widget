//API information 
const base_URL = "http://api.weatherapi.com/v1";
const key = "19d952ab1d164771b4723930262110";
//7 day forecast API request url
const forecast_URL = `${base_URL}/forecast.json?key=${key}&q=calgary&days=7`;

//Variables
const statusEl = document.getElementById("status");
const cardContainer = document.getElementById("day-card-container");


//-------------CURRENT WEATHER

async function fetchCurrentWeather(url){
    try{
        const response = await fetch(url);
        
        if(!response.ok){
            throw new Error(`Something has gone wrong: ${response.status}`);
        }

        const jsonData = await response.json();
        const {current} = jsonData;

        console.log(current);
        return current;

    } catch(error) {
        statusEl.textContent="Something went wrong fetching from the API";
        console.log(error);
    }
}

function createWeatherWidget(today){
    const widget = document.getElementById("widget-container");

    widget.innerHTML = `
        <h1>${today.last_updated}</h1>
        <img src="${today.condition.icon}" alt="${today.condition.text}">
        <p>${today.temp_c}&degC</p>
        <div id="day-card-container"></div>
    `;
}

async function renderCurrentWeather(){
    try{
        const currentWeather = await fetchCurrentWeather(forecast_URL);

        createWeatherWidget(currentWeather);
    } catch(error){
        statusEl.textContent = "Problem creating widget";
        console.log(error);
    }
}
renderCurrentWeather();

//-----------------7 DAY FORECAST

async function fetchForecastWeather(url){
    try{
        const response = await fetch(url);
        if(!response.ok){
            throw new Error(`Something has gone wrong: ${response.status}`);
        }
        const jsonData = await response.json();
        const {forecast} =jsonData;
        const {forecastday} = forecast;
        /* console.log(forecastday); */
        return forecastday;
    } catch(error) {
        statusEl.textContent="Something went wrong fetching from the API";
        console.log(error);
    }
}
fetchForecastWeather(forecast_URL);


function createDayCard(index){
    return `
    <div class="day-card">
        <h2>${index.date}</h2>
        <img src="${index.day.condition.icon}" alt="${index.day.condition.text}">
        <p>${index.day.avgtemp_c}&degC</p>
    </div>
    `
}

async function renderForecastCards(){
    try{
        const forecast = await fetchForecastWeather(forecast_URL);

        forecast.forEach((index) => {
            cardContainer.innerHTML += createDayCard(index);
        })

        console.log(cardContainer);

        
    } catch(error) {
        console.log(error);
    }
}

renderForecastCards();