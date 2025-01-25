let country = document.querySelector("#country");
let city = document.querySelector("#city");
let check = document.querySelector("#check");
let tempIcon = document.querySelector("#tempIcon");
let weatherCountry = document.querySelector("#weatherCountry");
let temperature = document.querySelector("#temperature");
let weatherDescription = document.querySelector("#weatherDescription");
let feelsLike = document.querySelector("#feelsLike");
let humidity = document.querySelector("#humidity");
let longitude = document.querySelector("#longitude");
let latitude = document.querySelector("#latitude");
let wind_spd = document.querySelector("#wind_spd");

let defaultCountry = "Pakistan"; // Default country
let defaultCity = "Faisalabad"; // Default city
const key=API_KEY;

function fetchWeather(cityValue, countryValue) {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue},${countryValue}&lang=en&units=metric&appid=${key}`;
    let error_msg=document.querySelector("#error_msg");

    fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            weatherCountry.innerHTML = `<img src="/img/location.png" alt="Location Icon" class="country-icon">${data.name} / ${data.sys.country}`;
            temperature.innerHTML = `${data.main.temp}<b>°C</b>`;
            weatherDescription.classList.remove("visible");

            data.weather.forEach(items => {
                weatherDescription.innerText = items.description;
                weatherDescription.classList.add("visible");

                if (items.id < 250) {
                    tempIcon.src = `/img/storm.svg`;
                    document.body.style.backgroundImage = "url('/img/storm.jpg')";

                } else if (items.id < 350) {
                    tempIcon.src = `/img/drizzle.svg`;
                    document.body.style.backgroundImage = "url('/img/drizzle.jpg')";

                } else if (items.id < 550) {
                    tempIcon.src = `/img/rain.svg`;
                    document.body.style.backgroundImage = "url('/img/rain.jpg')";
                } else if (items.id < 650) {
                    tempIcon.src = `/img/snow.svg`;
                    document.body.style.backgroundImage = "url('/img/snow.jpg')";
                } else if (items.id < 800) {
                    tempIcon.src = `/img/atmosphere.svg`;
                    document.body.style.backgroundImage = "url('/img/atmosphere.jpg')";
                } else if (items.id === 800) {
                    tempIcon.src = `/img/sun.svg`;
                    document.body.style.backgroundImage = "url('/img/sunny.jpg')";

                } else if (items.id > 800) {
                    tempIcon.src = `/img/clouds.svg`;
                    document.body.style.backgroundImage = "url('/img/clouds.jpg')";

                }
            });
            error_msg.innerText="";
            feelsLike.innerHTML = `<b>Feels Like:</b> ${data.main.feels_like}°C`;
            humidity.innerHTML = `<b>Humidity:</b> ${data.main.humidity}`;
            latitude.innerHTML = `<b>Latitude:</b> ${data.coord.lat}`;
            longitude.innerHTML = `<b>Longitude:</b> ${data.coord.lon}`;
            wind_spd.innerHTML=`<b>Wind Speed:</b> ${data.wind.speed}`;
        })
        .catch(error => {

            error_msg.innerText="Error: Check country and city";
        });
}

function fetch_5_day(cityValue) {
    let url_5day = `https://api.openweathermap.org/data/2.5/forecast?q=${cityValue}&appid=${key}&units=metric`;
    let error_msg = document.querySelector("#error_msg");

    fetch(url_5day)
        .then(response => {
            return response.json();
        })
        .then(data => {
            // Loop through the forecast data (usually every 3 hours)
            let dailyForecast = data.list.filter((item, index) => index % 8 === 0); // Filter to get one entry per day (every 8th item is a daily forecast)
            const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

            // Iterate for 5 days
            dailyForecast.slice(0, 5).forEach((day, index) => {
                let dayElement = document.querySelector(`#day${index + 1}`);
                let date = new Date(day.dt * 1000); // Get the raw Date object

                // Day of week
                let dayOfWeek = daysOfWeek[date.getDay()];


                //Min and max temperature entry
                let temp_min_ele = document.querySelector(`#temp${index + 1}`);
                let temp_max_ele = document.querySelector(`#temp_max${index + 1}`);

                // Extract the min and max temperatures
                let tempMin = day.main.temp_min;
                let tempMax = day.main.temp_max;

                // Set the inner HTML for min and max temperatures
                temp_min_ele.innerHTML = `${tempMin.toFixed(0)}°C`;
                temp_max_ele.innerHTML = `${tempMax.toFixed(0)}°C`;

                // Set the inner HTML for the day element
                if (index===0){
                    dayElement.innerHTML = `<b>Today</b>`;
                }
                else {
                dayElement.innerHTML = `<b>${dayOfWeek.slice(0,3)}</b>`;
                    }
            });
        })
        .catch(error => {
            error_msg.innerText = "Error: fetching the 5-day forecast.";
            console.error(error);
        });
}




// Default location
window.addEventListener("load", () => {
    country.value = defaultCountry; // Set default country in input
    city.value = defaultCity; // Set default city in input
    fetchWeather(defaultCity, defaultCountry);
});

// Button click action
check.addEventListener("click", () => {
    fetchWeather(city.value, country.value);
    fetch_5_day(city.value);
    // country.value = "";
    // city.value = "";
});
