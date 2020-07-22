var city = "Boston";

var APIKey = "90d9a6c424644e20ace24af65a026967";
var queryURL = "";
var forecastDisplay = $("#five-day-display");



$("#submit-btn").on("click", function () {
    city = $("#user-input").val();
    console.log("this is the typed city: " + city);
    currentWeatherRequest();
});



function currentWeatherRequest() {

    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        displayCurrentWeather(response);
        // console.log(element);


        response.list.forEach(element => {

            if (element.dt_txt.includes("18:00:00")) {

                console.log(element);

                var dayText = element.dt_txt.split(" ");
                var dateArray = dayText[0].split("-");
                var day = dateArray[1] + "/" + dateArray[2] + "/" + dateArray[0];

                var iconcode = element.weather[0].icon;
                var iconURL = "http://openweathermap.org/img/w/" + iconcode + ".png";

                console.log(dateArray);
                console.log(day);
                displayForecast(element, day, iconURL);
            };

        });
        // var lat = response.coord.lat;
        // var lng = response.coord.lon;
        // oneCallRequest(lat, lng, currentWeatherDisplay );

    });
};
function displayCurrentWeather(response) {
    $("#current-city-name").text(response.name);

        var currentWeatherDisplay = $("#display-current-weather");
        var temp = Math.floor((response.list[0].main.temp - 273.15) * 1.80 + 32);
        var currentTemp = $("<h4>").text("Temperature: " + temp);
        var currentHumidity = $("<h4>").text("Humidity: " + response.list[0].main.humidity);
        var currentWind = $("<h4>").text("Wind Speed: " + response.list[0].wind.speed);
        currentWeatherDisplay.append(currentTemp, currentHumidity, currentWind);
        console.log(response);
}
function displayForecast(element, day, iconURL ) {
    

    var card = $("<div class='card' id='daily-forecast' style='width: 16rem;'>");
    
    var cardBody = $("<div class='card-body'>");
    var cardTitle = $("<h5 class='card-title'>");
    cardTitle.text(day);
    var futureTemp = $("<h6>").text("" + element.main.temp);
    var futureHumidity = $("<h6>").text(element.wind.speed);

    var icon = $("<img id='icons' src=" + iconURL + " alt='Weather icon'>");
    cardBody.append(cardTitle, $("<hr>"), icon, futureTemp, futureHumidity);
    card.append(cardBody);
    forecastDisplay.append(card);

}

function oneCallRequest(lat, lng, display) {

    var queryURL = "http://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lng + "&appid=" + APIKey;


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        var currentUV = $("<h4>").text("UV Index: " + response.current.uvi);
        display.append(currentUV);



        for (i = 0; i < 5; i++) {

            var card = $("<div class='card' id='daily-forecast'style='width: 16rem;'>");
            var cardBody = $("<div class='card-body'>");
            var cardTitle = $("h5 class='card-title'>").text()

        };

        console.log(response);

    });
};


