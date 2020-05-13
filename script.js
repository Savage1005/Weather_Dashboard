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

localStorage.clear();

//api data section

function query(searches) {
  $("#display").empty();
  $.ajax({
    url:
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      searches +
      "&units=imperial&appid=c9c478a157f268c22eedc9b26117af86",
    method: "GET",
  }).then(function (response) {
    console.log(response);

    $(".city").text(response.name);
    $(".temp").text("Temperature (F) : " + response.main.temp);
    $(".humidity").text("Humidity: " + response.main.humidity);
    $(".wind").text("Wind Speed: " + response.wind.speed);
  });
}
