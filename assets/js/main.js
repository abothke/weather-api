// API Key acf8bf4b4cccf9e8d7a865ecedf740d5
// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

const apiKey = "acf8bf4b4cccf9e8d7a865ecedf740d5"
let lat, lon, timezone, localtimeConvH, date, temperature, dateToMs, gmtDate, offsetDate, correctedDate, timer, localTimeInMs, localTimeInS

    localTimeInMs = new Date().getTime();
    localTimeInS = localTimeInMs / 1000;

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

    // Fetch um longitute und latitude zu bekommen
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`)
.then((response) => response.json())
.then ((data) =>{
    lat = (data[0].lat);
    lon = (data[0].lon);
}) // Fetch um Wetterdaten zu bekommen
.then(() => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
    .then ((response) => response.json())
    .then ((data) =>{
        console.log(data);
        cityResult.textContent = data.name
        countryResult.textContent = data.sys.country
        temperature = (data.main.temp).toFixed(1)
        weatherResult.innerHTML = `
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
        <h2>${temperature} °C</h2>
        `
        weatherStatus.textContent = data.weather[0].description
        // Formatierung der Zeit in Stunden, Minuten und Sekunden und hinzufügen einer Null falls die Zahl kleiner als 10 ist. Die Zeit wird in UTC angegeben, deshalb muss die Zeitzone abgezogen werden.

        timeInterval = setInterval(() => {
            console.log(timeInterval);
            if (timeInterval > 15){
                clearInterval(timeInterval)
            }
            localTimeInMs = new Date().getTime();
            localTimeInS = localTimeInMs / 1000;
            formatTime(localTimeInS, localTime)

        }, 1000);
        const formatTime = (time, container) =>{
        const hourConvert = new Date((time + data.timezone) * 1000).getUTCHours()
        const hourFormat = hourConvert < 10 ? `0${hourConvert}` : hourConvert
        const minuteConvert = new Date(time * 1000).getUTCMinutes()
        const minuteFormat = minuteConvert < 10 ? `0${minuteConvert}` : minuteConvert
        const secondsConvert = new Date (time * 1000).getUTCSeconds()
        const secondsFormat = secondsConvert < 10 ? `0${secondsConvert}` : secondsConvert
        const formattedTime = `${hourFormat}:${minuteFormat}:${secondsFormat}`
        container.textContent = formattedTime
        }
        formatTime(localTimeInS, localTime)
        windSpeed.textContent = data.wind.speed;
        cloudiness.textContent = data.weather[0].main;
        pressure.textContent = `${data.main.pressure} hpa`
        humidity.textContent = `${data.main.humidity} %`
        formatTime(data.sys.sunrise, sunrise)
        formatTime(data.sys.sunset, sunset)
        geoCoords.textContent = `Lat: ${data.coord.lat}, Lon: ${data.coord.lon}`
    })
})
}



document.querySelector("#checkWeather").addEventListener("click", callWeather)