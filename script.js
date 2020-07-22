var city = "Atlanta";
var lat ="";
var lng ="";
var APIKey = "90d9a6c424644e20ace24af65a026967";
var queryURL ="";



    
var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey;


$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {

    // var temp = Math.floor((response.main.temp - 273.15) * 1.80 + 32)

    console.log(response);

});


