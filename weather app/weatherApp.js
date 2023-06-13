let apiKey = "key";
let weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?';
let weatherData;
let temp;
let feelsLike;
let maxTemp;
let minTemp;
let windSpeed;
let isCelsius;

const displayFeelsLike = document.getElementById("feels_like");
const displayMaxTemp = document.getElementById("max_temp");
const displayMinTemp = document.getElementById("min_temp");
const displayWindSpeed = document.getElementById("wind");

isCelsius = true;
temp = 37;

const erdekPos = ["40.3983", "27.7917"];
const karachiPos = ["24.927181", "67.119441"];

function getWeatherData(pos) {
    let paramObj = {
        "lat" : pos[0],
        "lon" : pos[1],
        "appid" : apiKey,
    };
    
    let newUrl;

    newUrl = weatherUrl +  new URLSearchParams(paramObj).toString()
    
    fetch(newUrl)
        .then(response => response.json())
        .then(data => displayData(data));
};

function displayData(weatherData) {
    console.log(weatherData);
    temp = Math.floor(weatherData['main']['temp']) - 273;
    feelsLike = Math.floor(weatherData['main']['feels_like']) - 273;
    maxTemp = Math.floor(weatherData['main']['temp_max']) - 273;
    minTemp = Math.floor(weatherData['main']['temp_min']) - 273;
    let cityName = weatherData['name'];
    let description = weatherData['weather'][0]['description'];
    windSpeed = (3.6 * weatherData['wind']['speed']).toFixed(1);
    let humidity = weatherData['main']['humidity'];


    document.getElementById("temp").innerHTML = `<a id="convert_temp">${temp}°C</a>`;
    displayFeelsLike.innerHTML = feelsLike + "°C";
    displayMinTemp.innerHTML = minTemp + "°C";
    displayMaxTemp.innerHTML = maxTemp + "°C";
    document.getElementById("city").innerHTML = cityName;
    document.getElementById("description").innerHTML = description.charAt(0).toUpperCase() + description.substring(1);
    displayWindSpeed.innerHTML = windSpeed + " kmh";
    document.getElementById("humidity").innerHTML = humidity + "%";

    let main = weatherData['weather'][0]['main'];
    let icon = document.getElementById('icon');
    switch (main) {
        case "Drizzle" || "Rain":
            icon.src = "images/rain.png";
            break;
        case "Thunderstorm":
            icon.src = "images/storm.png";
            break;
        case "Snow":
            icon.src = "images/snow.png";
            break;
        case "Clear":
            icon.src = "images/clear.png";
            break;
        case "Clouds":
            icon.src = "images/clouds.png";
            break;
        default:
            icon.src = "images/haze.png";
    };

    const displayTemp = document.getElementById("convert_temp");

    displayTemp.addEventListener('click', () => {
        if (isCelsius) {
            fahrenheit_temp = (9/5 * temp) + 32;
            fahrenheit_feels = (9/5 * feelsLike) + 32;
            fahrenheit_max = (9/5 * maxTemp) + 32;
            fahrenheit_min = (9/5 * minTemp) + 32;

            displayTemp.innerHTML = Math.floor(fahrenheit_temp) + "°F";
            displayFeelsLike.innerHTML = Math.floor(fahrenheit_feels) + "°F";
            displayMaxTemp.innerHTML = Math.floor(fahrenheit_max) + "°F";
            displayMinTemp.innerHTML = Math.floor(fahrenheit_min) + "°F";
            displayWindSpeed.innerHTML = (windSpeed/1.609).toFixed(1) + " mph";  

            isCelsius = false;
        } else {
            displayTemp.innerHTML = temp + "°C";
            displayFeelsLike.innerHTML = feelsLike + "°C";
            displayMaxTemp.innerHTML = maxTemp + "°C";
            displayMinTemp.innerHTML = minTemp + "°C";
            displayWindSpeed.innerHTML = windSpeed + " kmh";

            isCelsius = true;
        };
    });
};

getWeatherData(erdekPos);

const tabButtons = document.querySelectorAll('.tab button');

tabButtons.forEach((click_button) => {
    click_button.addEventListener('click', () => {
        tabButtons.forEach((button) => {
            button.classList.remove('active');
        });

        click_button.classList.add('active');

        if (click_button.id == "erdek") {
            getWeatherData(erdekPos);
        } else {
            getWeatherData(karachiPos);
        };
    });
});