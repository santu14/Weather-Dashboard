var city = "Boston";
var lat ="";
var lng ="";
var APIKey = "90d9a6c424644e20ace24af65a026967";
var queryURL ="";
var lat = '';
var lng = '';
var geocoder = new google.maps.Geocoder();

$("#submit-btn").on("click", function(){
    city = $("#user-input").val();
    console.log("this is the typed city: " + city);
});
    
geocoder.geocode({ 'address': city }, function (results, status) {

    if (status == google.maps.GeocoderStatus.OK) {
        lat = results[0].geometry.location.lat();
        lng = results[0].geometry.location.lng();

        console.log("latitude: " + lat + " Longitude: " + lng);

        ajaxQuery();
    
    } else {

       
        return;
  }
});

function ajaxQuery(){

    var queryURL = "http://api.openweathermap.org/data/2.5/onecall?lat="+ lat + "&lon="+ lng + "&appid=" + APIKey;
    
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
    
        // $("#current-city-name").text(response.city.name)
    
        // var currentWeatherDisplay = $("#display-current-weather");
        // var currentTemp = $("<h4>").text("Temperature: " + response.list[0].main.temp);
        // var currentHumidity = $("<h4>").text("Humidity: " + response.list[0].main.humidity);
        // var currentWind = $("<h4>").text("Wind Speed: " + response.list[0].wind.speed);
        // var currentUV = $("<h4>").text("UV Index: " + response.list[0].main.temp);
        // currentWeatherDisplay.append(currentTemp, currentHumidity, currentWind, currentUV);
        console.log(response);
    
    });
};
