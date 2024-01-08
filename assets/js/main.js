// API Key acf8bf4b4cccf9e8d7a865ecedf740d5
// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

const apiKey = "acf8bf4b4cccf9e8d7a865ecedf740d5" // API Key
let lat, lon, timezone, localtimeConvH, date, temperature, dateToMs, gmtDate, offsetDate, correctedDate, timer, localTimeInMs, localTimeInS, timeInterval // Variablen die später gebraucht werden und deshalb global definiert werden.


localTimeInMs = new Date().getTime(); // die aktuelle Zeit in Millisekunden
localTimeInS = localTimeInMs / 1000; // Umrechnung in Sekunden

const callWeather = () =>{
    // Variablen für die HTML Elemente
    const city = document.querySelector("#cityInput").value
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
 // Fetch um Wetterdaten zu bekommen und diese in HTML bzw. in die Variablen zu schreiben.
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then ((response) => response.json()) // Antwort wird in JSON umgewandelt
    .then ((data) =>{ 
        lat = (data.coord.lat); // Latitude wird in Variable gespeichert
        lon = (data.coord.lon); // Longitude wird in Variable gespeichert
        cityResult.textContent = data.name // Stadtname wird in HTML geschrieben
        countryResult.textContent = data.sys.country // Ländercode wird in HTML geschrieben
        temperature = (data.main.temp).toFixed(1) // Temperatur wird in Variable gespeichert und auf eine Nachkommastelle gerundet
        weatherResult.innerHTML = `
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
        <h2>${temperature} °C</h2>
        ` // Wetter Icon und Temperatur wird in HTML geschrieben
        weatherStatus.textContent = data.weather[0].description // Wetterbeschreibung wird in HTML geschrieben

        // Ruft bei jedem Klick einen ClearInterval auf um laufende Timer zu stoppen.
        clearInterval(timeInterval)

        // Setzt direkt einen neuen Interval, damit die Funktion nie stoppt.
        // Die Funktion wird jede Sekunde aufgerufen und die Zeit wird aktualisiert.
        timeInterval = setInterval(() => {
            localTimeInMs = new Date().getTime(); 
            localTimeInS = localTimeInMs / 1000;
            formatTime(localTimeInS, localTime);
        }, 1000);

        // Funktion um die Zeit immer zweistellig darzustellen und anhand von UTC zu standardisieren um die Abweichung in Millisekunden aus data.timezone zu berücksichtigen.
        // z.B. 09:05:01 statt 9:5:1

        const formatTime = (time, container) =>{
        const hourConvert = new Date((time + data.timezone) * 1000).getUTCHours() // Die Zeit wird in Stunden ausgegeben und die Zeitzone (UTC) dabei berücksichtigt
        const hourFormat = hourConvert < 10 ? `0${hourConvert}` : hourConvert // Wenn die Stunde kleiner als 10 ist, wird eine 0 vor die Stunde gesetzt
        const minuteConvert = new Date(time * 1000).getUTCMinutes()
        const minuteFormat = minuteConvert < 10 ? `0${minuteConvert}` : minuteConvert // Wenn die Minute kleiner als 10 ist, wird eine 0 vor die Minute gesetzt
        const secondsConvert = new Date (time * 1000).getUTCSeconds()
        const secondsFormat = secondsConvert < 10 ? `0${secondsConvert}` : secondsConvert // Wenn die Sekunde kleiner als 10 ist, wird eine 0 vor die Sekunde gesetzt
        const formattedTime = `${hourFormat}:${minuteFormat}:${secondsFormat}` // Die Zeit wird in der Variable zusammengefügt
        container.textContent = formattedTime // Die Zeit wird als Text in das HTML Element geschrieben
        }

        formatTime(localTimeInS, localTime) // Funktion wird mit der aktuellen Zeit aufgerufen und in dem HTML Element localTime ausgegeben
        windSpeed.textContent = data.wind.speed;
        cloudiness.textContent = data.weather[0].main;
        pressure.textContent = `${data.main.pressure} hpa`
        humidity.textContent = `${data.main.humidity} %`
        formatTime(data.sys.sunrise, sunrise) // Funktion wird mit der Sonnenaufgangszeit aufgerufen und in dem HTML Element sunrise ausgegeben
        formatTime(data.sys.sunset, sunset) // Funktion wird mit der Sonnenuntergangszeit aufgerufen und in dem HTML Element sunset ausgegeben
        geoCoords.textContent = `Lat: ${data.coord.lat}, Lon: ${data.coord.lon}`
    })
    .catch(() => weatherResult.innerHTML = ("City not found!")); // Fehlermeldung falls Fetch nicht funktioniert
}


document.querySelector("#checkWeather").addEventListener("click", callWeather) // EventListener für den Button um die Funktion callWeather aufzurufen