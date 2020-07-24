var city = "Atlanta";
var lat = "";
var lng = "";

var APIKey = "90d9a6c424644e20ace24af65a026967";
var queryURL = "";
var forecastDisplay = $("#five-day-display");
var currentWeatherDisplay = $("#display-current-weather");
var datesArray = [];
var savedCities = ["Atlanta"];


$("#submit-btn").on("click", function () {
    city = $("#user-input").val();
    console.log("typed city: " + city);
    
    openWeatherAPIRequest();    
});


function saveCityNameToArray(object) {
    
    if (savedCities.includes(object.name)) {
        console.log("city name already selected");
        return;
    } else {
        savedCities.push(object.name);
    };
};


function generateButtons(){

    var btnGroup = $(".button-group");
    btnGroup.empty();

    savedCities.forEach(element => {
        var cityBtn = $("<button type='button' class='city-btn btn btn-dark btn-lg btn-block'>");
        cityBtn.text(element);
        btnGroup.append(cityBtn);
        console.log("cities: " + element);
        console.log(cityBtn);
    });
};


function openWeatherAPIRequest() {
    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey;
    
    $.ajax({
        
        url: queryURL,
        method: "GET"
        
    }).then(function (response) {
        
        saveCityNameToArray(response.city);
        $("#current-city-name").text(response.city.name);
        var dayText = response.list[0].dt_txt.split(" ");
        var dateArray = dayText[0].split("-");
        var day = "" + dateArray[1] + "/" + dateArray[2] + "/" + dateArray[0];
        $("#current-date").text(day);
        
        console.log("Currently saved cities: ", savedCities);
        currentWeatherDisplay.empty();
        forecastDisplay.empty();
        lat = response.city.coord.lat;
        lng = response.city.coord.lon;

        // console.log("response:", response);

        response.list.forEach(element => {

            if (element.dt_txt.includes("12:00:00")) {

                // console.log(element);
                var dayText = element.dt_txt.split(" ");
                var dateArray = dayText[0].split("-");
                var day = "" + dateArray[1] + "/" + dateArray[2] + "/" + dateArray[0];
                datesArray.push(day);
                console.log("date:" + day);

            };
        });
        console.log("Dates Array: ", datesArray);
        oneCallRequest(lat, lng);
        generateButtons();

        $(".city-btn").on("click",  function () {
            console.log("clicked");
            city = $(this).text();
            console.log("clicked city: " + $(this).text());
            openWeatherAPIRequest();
        });
    });
};



function oneCallRequest(lat, lng) {

    var queryURL = "http://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lng + "&appid=" + APIKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        displayCurrentWeather(response.current);
        console.log(response);

        for (i = 1; i < 6; i++) {

            console.log("five day: ", response.daily[i]);
            displayFiveDayForecast(response.daily[i], datesArray[i]);
        };
        
        
        
    });
};



function displayCurrentWeather(current) {

    var iconcode = current.weather[0].icon;
    var iconURL = "http://openweathermap.org/img/w/" + iconcode + ".png";
    $("#current-icon").attr("src", iconURL);

    var temp = Math.floor((current.temp - 273.15) * 1.80 + 32);

    var currentTemp = $("<h4>").text("Temperature: " + temp + " °F");
    var currentHumidity = $("<h4>").text("Humidity: " + current.humidity + "%");
    var currentWind = $("<h4>").text("Wind Speed: " + current.wind_speed + " MPH");
    var currentUV = $("<h4 id='uvi'>").text("UV Index: " + current.uvi);

    currentWeatherDisplay.append(currentTemp, currentHumidity, currentWind, currentUV);
    console.log(current);
};



function displayFiveDayForecast(daily, date) {

    var temp = Math.floor((daily.temp.day - 273.15) * 1.80 + 32);
    var card = $("<div class='card' id='daily-forecast' style='width: 16rem;'>");

    var cardBody = $("<div class='card-body'>");
    var cardTitle = $("<h3 class='card-title text-center'>").text(date);

    var iconcode = daily.weather[0].icon;
    var iconURL = "http://openweathermap.org/img/w/" + iconcode + ".png";
    var icon = $("<img id='icons' src=" + iconURL + " alt='Weather icon'>");

    var futureTemp = $("<h5>").text("Temp:  " + temp + " °F");
    var futureHumidity = $("<h5>").text("Humidity: " + daily.humidity + "%");

    cardBody.append(cardTitle, $("<hr>"), icon, futureTemp, futureHumidity);
    card.append(cardBody);
    forecastDisplay.append(card);
};

openWeatherAPIRequest();

