//API information 
const base_URL = "http://api.weatherapi.com/v1";
const key = "19d952ab1d164771b4723930262110";
//3 day forecast API request url
const forecast_URL = `${base_URL}/forecast.json?key=${key}&q=calgary&days=3`;

//Variables
const statusEl = document.getElementById("status");
const loading = document.getElementById("loading");


//Fetch Weather Data
async function fetchWeather(url){
    try{
        const response = await fetch(url);
        
        if(!response.ok){
            throw new Error(`Something has gone wrong: ${response.status}`);
        }

        const jsonData = await response.json();
        const {current} = jsonData;
        const {forecast} = jsonData;
        const {forecastday} = forecast;

        return [current,forecastday];

    } catch(error) {
        statusEl.textContent="Something went wrong fetching from the API";
        console.log(error);
    }
}

//Date Function
function formatDate(day){
    console.log(day.last_updated_epoch)
    
    console.log(daysDate);
}

//Build current weather section
function createCurrentWeather(today){
    const widget = document.getElementById("widget-container");
    
   /*  formatDate(today); */

    const h1 = document.createElement("h1");
    h1.textContent = today.last_updated;

    const img = document.createElement("img");
    img.src = today.condition.icon;
    img.alt = today.condition.text;

    const p = document.createElement("p");
    p.innerHTML = `${today.temp_c}<span class="temp">°C</span>`;

    const button = document.createElement("button");
    button.textContent = "°C | °F";
    button.id = "temp-toggle";

    const div = document.createElement("div");
    div.id = "day-card-container";

    widget.appendChild(h1);
    widget.appendChild(img);
    widget.appendChild(p);
    widget.appendChild(button);
    widget.appendChild(div);
}
//Build forecast day cards
function createDayCard(index){
    return `
    <div class="day-card">
        <h2>${index.date}</h2>
        <img src="${index.day.condition.icon}" alt="${index.day.condition.text}">
        <p>${index.day.avgtemp_c}<span class="temp">&degC<span></p>
    </div>
    `
}
//Render dynamic widget
async function renderWidget(){
    try{
        const weather = await fetchWeather(forecast_URL);

        const [current, forecast] = weather;

        createCurrentWeather(current);

        forecast.forEach((index) => {
            const cardContainer = document.getElementById("day-card-container");

            cardContainer.innerHTML += createDayCard(index);
        })        
    } catch(error) {
        console.log(error);
    } finally {
        loading.style.display = "none";
    }
}

renderWidget();

const toggleBtn = document.getElementById("temp-toggle");
const tempSymbol = document.querySelectorAll(".temp");

toggleBtn.addEventListener("click",function(){
    tempSymbol.classList.add("active");
})