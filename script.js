const apikey = "140dbe0c749652015faa5b7324a2c43f";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apikey}`);
    
    if (!response.ok) {
        document.querySelector(".city").innerHTML = "City not found";
        document.querySelector(".temp").innerHTML = "--°C";
        document.querySelector(".humidity").innerHTML = "--%";
        document.querySelector(".wind").innerHTML = "-- kmph";
        weatherIcon.src = "images/error.png"; // optional
        return;
    }

    const data = await response.json();
    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " kmph";

    // Optional: change icon based on weather condition
    if (data.weather && data.weather.length > 0) {
        const condition = data.weather[0].main;
        switch (condition.toLowerCase()) {
            case "clouds":
                weatherIcon.src = "images/clouds.png";
                break;
            case "clear":
                weatherIcon.src = "images/clear.png";
                break;
            case "rain":
                weatherIcon.src = "images/rain.png";
                break;
            case "drizzle":
                weatherIcon.src = "images/drizzle.png";
                break;
            case "mist":
                weatherIcon.src = "images/mist.png";
                break;
            case "snow":
                weatherIcon.src = "images/snow.png";
                break;
            default:
                weatherIcon.src = "images/clear.png";
        }
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value.trim());
});
