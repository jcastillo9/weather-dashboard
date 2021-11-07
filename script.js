var inputField = document.querySelector('#search');
var button = document.querySelector('#searchCity');
var currentTemp = document.querySelector('#currentCityTemp');
var forecastDisplay = document.querySelector('#forecast');

function fetchData(event){
        event.preventDefault();
        var cityName = inputField.value
        var apiKey = 'fd531081518e808eb0375251a19ac935'
        var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + apiKey
        
     
        fetch(requestUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (weatherData) {
                console.log(weatherData);

            var time = moment().format("MM/DD/YYYY");
            var timeEl= time
            var cityEl = document.createElement('h3');
            cityEl.textContent = weatherData.name + "(" + timeEl + ")";
            currentTemp.append(cityEl);

            var icon = document.createElement('img')
            icon.src = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png"
            icon.classList.add("resize")
            currentTemp.appendChild(icon)
            console.log(weatherData.weather[0],icon)

            var cityTemp = document.createElement('p');
            cityTemp.textContent = " Temp: " + ((weatherData.main.temp_max - 273) * 1.8 + 32).toFixed(2) +  "\u2109";
            currentTemp.append(cityTemp);

            var cityWind = document.createElement('p');
            cityWind.textContent = " Wind: " + weatherData.wind.speed + " MPH ";
            currentTemp.append(cityWind);

            var cityHumidity = document.createElement('p');
            cityHumidity.textContent = " Humidity: " + weatherData.main.humidity + " % ";
            currentTemp.append(cityHumidity);

            var cityUv = document.createElement('p');
            cityUv.textContent = " UV Index: " + ((weatherData.main.temp_max - 273) * 1.8 + 32).toFixed(2) +  "\u2109";
            currentTemp.append(cityUv);

            inputField.value = "";

            forecastFetch()
            })
        }
        button.addEventListener("click", fetchData);


// function fetchData(event){
//     event.preventDefault();
//     var cityName = inputField.value
//     var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + apiKey
    
 
//     fetch(requestUrl)
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (weatherData) {
//             console.log(weatherData);
        
//             var cityEl = document.createElement('h3');
//             var cityTemp = document.createElement('p');
//             var cityWind = document.createElement('p');
//             var cityHumidity = document.createElement('p');
//             var cityUv = document.createElement('p');

//             cityEl.textContent = weatherData.name;
//             cityTemp.textContent = "Temp:" + ((weatherData.main.temp_max - 273) * 1.8 + 32).toFixed(2) +  "\u2109";
//             cityWind.textContent = "Wind:" + ((weatherData.main.temp_max - 273) * 1.8 + 32).toFixed(2) +  "\u2109";
//             cityHumidity.textContent = "Humidity:" + ((weatherData.main.temp_max - 273) * 1.8 + 32).toFixed(2) +  "\u2109";
//             cityUv.textContent = "UV Index:" + ((weatherData.main.temp_max - 273) * 1.8 + 32).toFixed(2) +  "\u2109";
        
//             displayContainer.append(cityEl);
//             displayContainer.append(cityTemp);
//             displayContainer.append(cityWind);
//             displayContainer.append(cityHumidity);
//             displayContainer.append(cityUv);

        
//     inputField.value = "";
//     var part = 'hourly,daily'
//     var lat = weatherData.coord.lat
//     var lon = weatherData.coord.lon
//     // var requestUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=' + part + '&appid=' + apiKey
 
//         return fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=' + part + '&appid=' + apiKey);
//         })

//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (fiveDayData) {
//             console.log(fiveDayData);
//         });

//         forecastContainer.append(cityEl);
//     }

    
   
//         button.addEventListener('click', fetchData)

