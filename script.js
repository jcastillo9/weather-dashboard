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
                console.log("weather", weatherData);

            var lat = weatherData.coord.lat
            console.log("lat", lat)
            localStorage.setItem("lat", JSON.stringify(lat))
            var lon = weatherData.coord.lon
            console.log("lon", lon)
            localStorage.setItem("lon", JSON.stringify(lon))
        
            var time = moment().format("MM/DD/YYYY");
            var timeEl= time
            var cityEl = document.createElement('h3');
            cityEl.textContent = weatherData.name + "(" + timeEl + ")";
            var currentTemp =document.body.children[1].children[1].children[0].children[0]
            currentTemp.append(cityEl);

            var icon = document.createElement('img')
            icon.src= 'https://openweathermap.org/img/wn/' + weatherData.weather[0].icon + '@2x.png'
            var currentTempIcon = document.body.children[1].children[1].children[0] 
            currentTemp.appendChild(icon)

            var cityTemp = document.createElement('p');
            cityTemp.textContent = " Temp: " + ((weatherData.main.temp_max - 273) * 1.8 + 32).toFixed(2) +  "\u2109";
            currentTemp.append(cityTemp);

            var cityWind = document.createElement('p');
            cityWind.textContent = " Wind: " + weatherData.wind.speed + " MPH ";
            currentTemp.append(cityWind);

            var cityHumidity = document.createElement('p');
            cityHumidity.textContent = " Humidity: " + weatherData.main.humidity + " % ";
            currentTemp.append(cityHumidity);

            inputField.value = "";

            })
        }

        function fetchForecastData() {

            var lat2 = JSON.parse(localStorage.getItem("lat"))
            console.log("lat2", lat2)

            var lon2 = JSON.parse(localStorage.getItem("lon"))
            console.log("lon2", lon2)

            var apiKey = 'fd531081518e808eb0375251a19ac935'
            var uvURL = "https://api.openweathermap.org/data/2.5/onecall?lat="+ lat2 + "&lon=" + lon2 + "&exclude=hourly&units=imperial&appid="  + apiKey
            console.log(uvURL)
            fetch(uvURL)
            .then(function(response){
                return response.json();
            })
            .then(function(uvData){
                console.log(uvData)

                var cityUv = document.createElement('p');
                var uvIndex = uvData.current.uvi
                cityUv.textContent = " UV Index: " + uvIndex;
                var currentTemp =document.body.children[1].children[1].children[0]
                currentTemp.append(cityUv);
                cityUv.classList.add("uvStyle")
                var uvSyleEl = document.querySelector(".uvStyle")
                console.log(typeof uvIndex)
                if (uvIndex <= 2.99) {
                    uvSyleEl.setAttribute("style", "background-color: #008000")
                } else if (uvIndex >= 3 && uvIndex <= 7.99) {
                    uvSyleEl.setAttribute("style", "background-color: #cccc0a")
                } else if (uvIndex >= 8) {
                    uvSyleEl.setAttribute("style", "background-color: #ff0000")
                }

                // 5-day forecast
                // date
                var card = document.body.children[1].children[1].children[1].children[1].children[i]
                for (var i=0; i <5; i++){
                    var day = document.createElement('h5')
                    var unix = uvData.daily[i+1].dt
                    var date = new Date(unix*1000)
                    var date0 = date.toLocaleDateString("en-US")
                    day.textContent = date0
                    var card = document.body.children[1].children[1].children[1].children[1].children[i]
                    card.appendChild(day)
                }
                // icon
                for (var i=0; i<5;i++) {
                    var icon = document.createElement('img')
                    icon.src = 'https://openweathermap.org/img/wn/' + uvData.daily[i+1].weather[0].icon +'@2x.png'
                    document.body.children[1].children[1].children[1].children[1].children[i].appendChild(icon)
                    icon.classList.add("iconStyle")
                }
                // temp
                for (var i=0;i<5;i++) {
                    var temp = document.createElement('p')
                    temp.textContent = "Temp: " + uvData.daily[i+1].temp.day + '\xB0'
                    document.body.children[1].children[1].children[1].children[1].children[i].appendChild(temp)
                }
                // wind
                for (var i=0;i<5;i++) {
                    var wind = document.createElement('p')
                    wind.textContent = "Wind: "+ uvData.daily[i+1].wind_speed + " MPH"
                    document.body.children[1].children[1].children[1].children[1].children[i].appendChild(wind)
                }
                // humidity 
                for (var i=0;i<5;i++) {
                    var humidity = document.createElement('p')
                    humidity.textContent= "Humidity: "+ uvData.daily[i+1].humidity +"%"
                    document.body.children[1].children[1].children[1].children[1].children[i].appendChild(humidity)
                }
            })
        }

        button.addEventListener("click", fetchData)
        button.addEventListener("click", fetchForecastData)