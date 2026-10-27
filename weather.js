//API information 
const base_URL = "http://api.weatherapi.com/v1";
const key = "19d952ab1d164771b4723930262110";
//3 day forecast API request url
const forecast_URL = `${base_URL}/forecast.json?key=${key}&q=calgary&days=3`;

//Variables
const statusEl = document.getElementById("status");
const loading = document.getElementById("loading");

let celsius = true;
let currentWeather;
let forecastWeather


//Fetch Weather Data
async function fetchWeather(url){
    try{
        const response = await fetch(url);
        
        if(!response.ok){
            throw new Error(`Something has gone wrong fetching the data: ${response.status}`);
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

//Formatting Date from ISO to Month and Day
function formatDate(dateString){
    const date = new Date(dateString);

    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric"
    });
}

//Mapping weather icons from weatherAPI for Iconify icons
function getWeatherIcon(condition) {
    const weather = condition.toLowerCase();

    if (weather.includes("sunny")) { return "wi:day-sunny";}
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

//Build current weather section
function createCurrentWeather(today){
    const widget = document.getElementById("widget-container");

    const h1 = document.createElement("h1");
    h1.textContent = formatDate(today.last_updated);

    const icon = document.createElement("iconify-icon");
    icon.setAttribute("icon", getWeatherIcon(today.condition.text));
    icon.setAttribute("width", "100");
    icon.setAttribute("height", "100");

    const p = document.createElement("p");
    p.textContent = today.condition.text;
    p.id = "today-condition";

    const temp = document.createElement("p");
    temp.id = "current-temp";
    temp.classList.add("temp");
    temp.innerHTML = `${celsius ? today.temp_c : today.temp_f} ${celsius ? "°C" : "°F"}`;

    const button = document.createElement("button");
    button.textContent = "°C | °F";
    button.id = "temp-toggle";

    const div = document.createElement("div");
    div.id = "day-card-container";

    widget.appendChild(h1);
    widget.appendChild(icon);
    widget.appendChild(p);
    widget.appendChild(temp);
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
    document.getElementById("widget-container").innerHTML = "";

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

//Render dynamic widget
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
        console.log(error);
    } finally {
        loading.style.display = "none";
    }
}

renderWidget();

