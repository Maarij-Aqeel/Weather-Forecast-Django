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
let feature= document.querySelector(".features");
let forecastContainer=document.querySelector(".forecast-container");
let error_msg=document.querySelector("#error_msg");

let defaultCountry = "Pakistan"; // Default country
let defaultCity = "Faisalabad"; // Default city
const key=API_KEY;

function fetchWeather(cityValue, countryValue) {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue},${countryValue}&lang=en&units=metric&appid=${key}`;
    let weather_img=''


    fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => {
            weatherCountry.innerHTML = `<img src="/img/location.png" alt="Location Icon" class="country-icon">${data.name} / ${data.sys.country}`;
            temperature.innerHTML = `${data.main.temp}<b>°C</b>`;



            data.weather.forEach(items => {
                weatherDescription.innerText = items.description;

                if (items.id < 250) {
                    weather_img=`/img/isolated-thunderstorms.svg`;
                    document.body.style.backgroundImage = "url('/img/storm.jpg')";

                } else if (items.id < 350) {
                    weather_img = `/img/hail.svg`;//Weather icon
                    document.body.style.backgroundImage = "url('/img/drizzle.jpg')";//Background image

                } else if (items.id < 550) {
                    weather_img = `/img/rainy-1.svg`;
                    document.body.style.backgroundImage = "url('/img/rain.jpg')";
                } else if (items.id < 650) {
                    weather_img = `/img/snowy-1.svg`;
                    document.body.style.backgroundImage = "url('/img/snow.jpg')";
                } else if (items.id < 800) {
                    weather_img = `/img/haze-day.svg`;
                    document.body.style.backgroundImage = "url('/img/atmosphere.jpg')";
                } else if (items.id === 800) {
                    weather_img = `/img/clear-day.svg`;
                    document.body.style.backgroundImage = "url('/img/sunny.jpg')";

                } else if (items.id > 800) {
                    weather_img = `/img/cloudy.svg`;
                    document.body.style.backgroundImage = "url('/img/clouds.jpg')";

                }

                change_tempicon(weather_img);
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
                let weather_icon=document.querySelector(`#icon${index + 1}`);

                //Min and max temperature entry
                let temp_min_ele = document.querySelector(`#temp${index + 1}`);
                let temp_max_ele = document.querySelector(`#temp_max${index + 1}`);

                let weather_id=day.weather[0].id;
                let date = new Date(day.dt * 1000); // Get the raw Date object

                // Extract the min and max temperatures
                let tempMin = day.main.temp_min;
                let tempMax = day.main.temp_max;

                get_icon(weather_id,weather_icon);//Changing the icon


                // Set the inner HTML for the day element
                if (index===0){
                    dayElement.innerHTML = `<b>Today</b>`;
                }
                else {

                // Day of week
                let dayOfWeek = daysOfWeek[date.getDay()];
                dayElement.innerHTML = `<b>${dayOfWeek.slice(0,3)}</b>`;

                }


                // Set the inner HTML for min and max temperatures
                temp_min_ele.innerHTML = `${tempMin.toFixed(0)}°C`;
                temp_max_ele.innerHTML = `${tempMax.toFixed(0)}°C`;


            });
        })
        .catch(error => {
            error_msg.innerText = "Error: fetching the Data." ;
        });
}


// Changing the weather icon
function change_tempicon(img_src)
{
    tempIcon.classList.add("hidden");

    setTimeout(() =>{

        tempIcon.src=img_src;
        tempIcon.onload = () => tempIcon.classList.remove("hidden");
    },500);


}
function get_icon(id,weather_icon){

    let imgSrc = "";

    if (id < 250) {
        imgSrc = "/img/storm.svg";
    } else if (id < 350) {
        imgSrc = "/img/drizzle.svg";
    } else if (id < 550) {
        imgSrc = "/img/rain.svg";
    } else if (id < 650) {
        imgSrc = "/img/snow.svg";
    } else if (id < 800) {
        imgSrc = "/img/atmosphere.svg";
    } else if (id === 800) {
        imgSrc = "/img/sun.svg";
    } else if (id > 800) {
        imgSrc = "/img/clouds.svg";
    }
    weather_icon.src= imgSrc;
}



// Default location
window.addEventListener("load", () => {

    country.value = defaultCountry; // Set default country in input
    city.value = defaultCity; // Set default city in input
    fetchWeather(defaultCity, defaultCountry);
    feature.classList.add('fade_out');
    weatherDescription.classList.add('visible');
    forecastContainer.classList.add('open');

});

// Button click action
check.addEventListener("click", () => {

    forecastContainer.classList.remove('open');
    feature.classList.remove('fade_out');
    weatherDescription.classList.remove('visible');


//changing the transitions
    setTimeout(() => {
        forecastContainer.classList.add('open');
        feature.classList.add('fade_out');
        weatherDescription.classList.add('visible');
    }, 500);

    fetchWeather(city.value, country.value);
    fetch_5_day(city.value);

});
