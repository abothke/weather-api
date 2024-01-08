// API Key acf8bf4b4cccf9e8d7a865ecedf740d5
// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

const apiKey = "acf8bf4b4cccf9e8d7a865ecedf740d5"
let lat, lon, timezone, localtimeConvH, date

const callWeather = () =>{
    const city = document.querySelector("#cityInput").value // Lowercase?
    const cityResult = document.querySelector("#cityResult")
    const countryResult = document.querySelector("#countryResult")
    const weatherResult = document.querySelector("#weatherResult")
    const weatherStatus = document.querySelector("#weatherStatus")
    const localTime = document.querySelector("#localTime")
    const windSpeed = document.querySelector("#windSpeed")
    const cloudiness = document.querySelector("#cloudiness")
    const pressure = document.querySelector("#pressure")
    const humidity = document.querySelector("#humidity")
    const sunrise = document.querySelector("#sunrise")
    const sunset = document.querySelector("#sunset")
    const geoCoords = document.querySelector("#geoCoords")

    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`)
.then((response) => response.json())
.then ((data) =>{
    lat = (data[0].lat);
    lon = (data[0].lon);
})
.then(() => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
    .then ((response) => response.json())
    .then ((data) =>{
        console.log(data);
        cityResult.textContent = data.name
        countryResult.textContent = data.sys.country
        weatherResult.innerHTML = `
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
        <h2>${data.main.temp} °C</h2>
        `
        weatherStatus.textContent = data.weather[0].description
        date = new Date((data.dt - 3600 + data.timezone ) * 1000)
        console.log(date);
        localtimeConvH = new Date(`${date}`).getHours()
        localTime.textContent = `${localtimeConvH}:${new Date(data.dt * 1000).getMinutes()}:${new Date(data.dt * 1000).getSeconds()}`
        windSpeed.textContent = data.wind.speed;
        cloudiness.textContent = data.weather[0].main;
        pressure.textContent = `${data.main.pressure} hpa`
        humidity.textContent = `${data.main.humidity} %`
        sunrise.textContent = `${new Date(data.sys.sunrise * 1000).getHours()}:${new Date(data.sys.sunrise * 1000).getMinutes()}:${new Date(data.sys.sunrise * 1000).getSeconds()}`
        sunset.textContent = `${new Date(data.sys.sunset * 1000).getHours()}:${new Date(data.sys.sunset * 1000).getMinutes()}:${new Date(data.sys.sunset * 1000).getSeconds()}`
        geoCoords.textContent = `${data.coord.lat},${data.coord.lon}`
    })
})
}


document.querySelector("#checkWeather").addEventListener("click", callWeather)

// let dateTestZwei = (1704708328 - 3600) * 1000
// console.log(dateTestZwei);
// let dateTest = new Date(dateTestZwei)
// console.log(1704708328 * 1000);
// console.log(dateTest);
// console.log(new Date(`${dateTest}`));