//----API information 
//url components
const base_URL = "https://api.weatherapi.com/v1";
const key = "19d952ab1d164771b4723930262110";
//Free Tier 3 day forecast API request url
const forecast_URL = `${base_URL}/forecast.json?key=${key}&q=calgary&days=3`;

//-------VARIABLES
//Loading Page
const statusEl = document.getElementById("status");
const loading = document.getElementById("loading");
//Widget
const widget = document.getElementById("widget-container");
const header = document.getElementById("widget-header");
//Temperature
let celsius = true;
let currentWeather;
let forecastWeather;


//----------FETCHING WEATHER DATA
async function fetchWeather(url){
    try{
        const response = await fetch(url);
        
        if(!response.ok){
            throw new Error(`Error fetching data: ${response.status}`);
        }

        const jsonData = await response.json();
        const {current} = jsonData;
        const {forecast} = jsonData;
        const {forecastday} = forecast;

        return [current,forecastday];

    } catch(error) {
        console.log(error);
        throw error;
    } 
}

//----------FUNCTIONS

//Formatting Date from ISO to Month and Day
function formatDate(dateString){
    const date = new Date(dateString);

    const months = ["Jan", "Feb", "Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const month = months[date.getMonth()];
    const day = date.getDate();
    return `${month} ${day}`;
}

//Mapping weather icons from weatherAPI for Iconify icons
function getWeatherIcon(condition) {
    const weather = condition.toLowerCase();

    if (weather.includes("sunny")) {return "wi:day-sunny";}
    if (weather.includes("partly")) {return "wi:day-cloudy";}
    if (weather.includes("cloud")) {return "wi:cloudy";}
    if (weather.includes("overcast")) {return "wi:cloudy";}
    if (weather.includes("rain")) {return "wi:rain";}
    if (weather.includes("snow")) {return "wi:snow";}
    if (weather.includes("fog")) {return "wi:fog";}
    if (weather.includes("mist")) {return "wi:fog";}
    if (weather.includes("thunder")) {return "wi:thunderstorm";}

    return "wi:day-sunny-overcast";
}

//Build currentWeather section
function createCurrentWeather(today){
    
    const h1 = document.createElement("h1");
    h1.id="today-date"
    h1.textContent = formatDate(today.last_updated);

    const currently = document.createElement("div");
    currently.id = "today-weather";

        const condition = document.createElement("div");
    
            const icon = document.createElement("iconify-icon");
            icon.setAttribute("icon", getWeatherIcon(today.condition.text));
            icon.setAttribute("width", "100");
            icon.setAttribute("height", "100");

            const p = document.createElement("p");
            p.textContent = today.condition.text;
            p.id = "today-condition";

        condition.appendChild(icon);
        condition.appendChild(p);

        const temp = document.createElement("p");
        temp.id = "today-temp";
        temp.classList.add("temp");
        temp.innerHTML = `${celsius ? today.temp_c : today.temp_f} ${celsius ? "°C" : "°F"}`;
    currently.appendChild(condition);
    currently.appendChild(temp);

    const button = document.createElement("button");
    button.textContent = "°C | °F";
    button.id = "temp-toggle";

    const div = document.createElement("div");
    div.id = "day-card-container";

    widget.appendChild(h1);
    widget.appendChild(currently);
    widget.appendChild(div);
    widget.appendChild(button);
}

//Build forecast day cards
function createDayCard(index){
    const temp = celsius ? index.day.avgtemp_c : index.day.avgtemp_f;
    const unit = celsius ? "°C" : "°F";
    
    const weatherIcon = getWeatherIcon(index.day.condition.text);

    return `
    <div class="day-card">
        <h2>${formatDate(index.date)}</h2>

        <iconify-icon
            icon="${weatherIcon}"
            width="60"
            height="60">
        </iconify-icon>

        <p class="temp">${temp} ${unit}</p>
    </div>
    `
}

//Update widget
function updateWidget(){
    widget.innerHTML = "";

    createCurrentWeather(currentWeather);

    const cardContainer = document.getElementById("day-card-container");

    forecastWeather.forEach((index) => {
        cardContainer.innerHTML += createDayCard(index);
    });

    const toggleBtn = document.getElementById("temp-toggle");

    toggleBtn.addEventListener("click",function(){
            celsius = !celsius;
            updateWidget();
        }) 
}


//-------------RENDERING DYNAMIC WIDGET

async function renderWidget(){
    try{
        const weather = await fetchWeather(forecast_URL);

        const [current, forecast] = weather;

        currentWeather = current;
        forecastWeather = forecast

        createCurrentWeather(currentWeather);

        forecastWeather.forEach((index) => {
            const cardContainer = document.getElementById("day-card-container");

            cardContainer.innerHTML += createDayCard(index);
        })

        const toggleBtn = document.getElementById("temp-toggle");

        toggleBtn.addEventListener("click",function(){
            celsius = !celsius;
            updateWidget();
        }) 
  

    } catch(error) {
        widget.innerHTML = `
        <section id="error">
            <h1>Weather Unavailable</h1>

            <p>Sorry, something went wrong.</p>

            <p class="error-details">${error.message}</p>
        </section>
        `
        console.log(error);
    } finally {
        loading.style.display = "none";
    }
}

renderWidget();

