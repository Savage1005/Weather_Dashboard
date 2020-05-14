//form section
var searches = JSON.parse(localStorage.getItem("searches")) || [];
function renderHistory() {
  $("#history").empty();

  for (var i = 0; i < searches.length; i++) {
    $("#history").prepend($("<p class='city'>").text(searches[i]));
  }
}

$("form").on("submit", function (event) {
  event.preventDefault();
  query($("#city").val())
  var city = $("#city").val().trim();
  searches.push(city);
  

  localStorage.setItem("searches", JSON.stringify(searches));
  $("#city").val("");

  renderHistory();
});

$(document).on("click", ".city", function () {
  console.log($(this).text());
});
renderHistory();

//localStorage.clear();

//api data section

function query(city) {
  $.ajax({
    url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=c9c478a157f268c22eedc9b26117af86",
    method: "GET",
  }).then(function (response) {
    //console.log(response);

    $(".city").text(response.name);
    $(".temp").text("Temperature (F) : " + Math.floor(response.main.temp));
    $(".humidity").text("Humidity: " + response.main.humidity);
    $(".wind").text("Wind Speed: " + response.wind.speed);
  });

   $.ajax({
    url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=c9c478a157f268c22eedc9b26117af86",
    method: "GET",
    }).then(function (response) {
    console.log(response);
    var fiveDay = [response.list[4], reponse.list[12], response.list[20], response.list[28], response.list[36]]
    var fiveText = $("<h2>").text("5 day forecast")
    $("#display").append(fiveText)

  });

}


