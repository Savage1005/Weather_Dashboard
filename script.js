//form section

var searches = JSON.parse(localStorage.getItem("searches")) || [];

function renderHistory() {
  $("#history").html("");

  searches.forEach(function (e) {
    console.log(e, "<=== this is e");
    var pTag =$("<p>").text(e).addClass("city")
    console.log(pTag)
    $("#history").prepend(pTag);
  });
  query(searches[searches.length - 1]);
}

$("form").on("submit", function (event) {
  event.preventDefault();
  var city = $("#city").val().trim();
  // query(city);
  searches.push(city);

  localStorage.setItem("searches", JSON.stringify(searches));
  $("#city").val("");

  renderHistory();
});

$(document).on("click", ".city", function () {
  query($(this).text());
});

//api data section

function query(city) {
  $("#fiveDayDisplay").empty();
  $("#fiveDayTitle").empty();
  $.ajax({
    url:
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&units=imperial&appid=c9c478a157f268c22eedc9b26117af86",
    method: "GET",
  }).then(function (response) {
    //console.log(response);

    $(".theCity").text(response.name);
    $(".temp").text("Temperature (F) : " + Math.floor(response.main.temp));
    $(".humidity").text("Humidity: " + response.main.humidity);
    $(".wind").text("Wind Speed: " + response.wind.speed);
  });
 // using ajax to access api and use information for the 5 day forecast
  $.ajax({
    url:
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      city +
      "&units=imperial&appid=c9c478a157f268c22eedc9b26117af86",
    method: "GET",
  }).then(function (response) {
    console.log(response);
    var fiveDay = [
      response.list[4],
      response.list[12],
      response.list[20],
      response.list[28],
      response.list[36],
    ];
    var fiveText = $("<h2>").text("5 day Forecast:");
    $("#fiveDayTitle").append(fiveText);
    fiveDay.forEach(function (fiveArray) {
      var fiveDiv = $("<div>").addClass("eachday");
      var fiveDate = $("<p>").text(fiveArray.dt_txt.split(" ")[0]);
      var fiveIcon = $("<img>").attr(
        "src",
        "https://openweathermap.org/img/wn/" +
          fiveArray.weather[0].icon +
          "@2x.png"
      );
      var fiveTemp = $("<p>").text(
        "Temperature: " + Math.floor(fiveArray.main.temp)
      );
      var fiveHumid = $("<p>").text(
        "Humidity: " + fiveArray.main.humidity + "%"
      );
      fiveDiv.append(fiveDate, fiveIcon, fiveTemp, fiveHumid);

      $("#fiveDayDisplay").append(fiveDiv);
    });
 });
}

renderHistory();
