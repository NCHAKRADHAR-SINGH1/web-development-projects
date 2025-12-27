const cityInput = document.getElementById("cityInput");
const getWeatherBtn = document.getElementById("getWeatherBtn");
const weatherResult = document.getElementById("weatherResult");
const apiKey = "a2cb4c8d815e4623898f3f8c2136d9d3";
const sun = document.querySelector(".sun");
const cloud = document.querySelector(".cloud");
const rain = document.querySelector(".rain");
getWeatherBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city === "") {
        weatherResult.innerHTML = "<p>Please enter a city name!</p>";
        sun.classList.add("hidden");
        cloud.classList.add("hidden");
        rain.classList.add("hidden");
        return;
    }
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(res => res.json())
        .then(data => {
            if (data.cod != 200) {
                weatherResult.innerHTML = "<p>City not found!</p>";
                return;
            }
            const temp = data.main.temp;
            const feelsLike = data.main.feels_like;
            const humidity = data.main.humidity;
            const desc = data.weather[0].description.toLowerCase();
            const name = data.name;
            if (desc.includes("clear")) {
                sun.textContent = "☀️";
                sun.classList.remove("hidden");
            }
            else if (desc.includes("haze") || desc.includes("mist") || desc.includes("fog")) {
                cloud.textContent = "☁️";
                cloud.classList.remove("hidden");
            }
            else if (desc.includes("rain") || desc.includes("drizzle")) {
                rain.textContent = "💧💧💧";
                rain.classList.remove("hidden");
            }
            else {
                cloud.textContent = "☁️";
                cloud.classList.remove("hidden");
             }
            const body = document.body;
            const card = document.querySelector(".weather-container");

            if (temp > 30) {
                body.style.background = "linear-gradient(to bottom, #4facfe, #00f2fe)";
                card.style.background = "rgba(255,255,255,0.28)";
            } else if (temp > 20) {
                body.style.background = "linear-gradient(to bottom, #6dd5fa, #bfe9ff)";
                card.style.background = "rgba(255,255,255,0.3)";
            } else {
                body.style.background = "linear-gradient(to bottom, #cfd9df, #e2ebf0)";
                card.style.background = "rgba(255,255,255,0.35)";
            }
            const tempColor =
                temp > 30 ? "#ff4b5c" :
                temp > 20 ? "#ff9800" :
                "#1e90ff";
            weatherResult.innerHTML = `
                <h2>${name}</h2>
                <p class="temp" style="color:${tempColor}">${temp}°</p>
                <p>${desc}</p>
                <p>Feels like ${feelsLike}°</p>
                <p>Humidity : ${humidity}%</p>
            `;
        })
        .catch(() => {
            weatherResult.innerHTML = "<p>Error fetching data</p>";
            sun.classList.add("hidden");
            cloud.classList.add("hidden");
            rain.classList.add("hidden");
        });
});












