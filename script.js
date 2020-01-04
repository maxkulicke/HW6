// TO DO:

// - query openWeather API, find correct syntax, traverse JSON response for:
// City
// Date
// Icon image (visual representation of weather conditions)
// Temperature
// Humidity
// Wind speed
// UV index

// - append results

// figure out how to avoid duplicate search buttons

// - localStorage of search history (append search string to buttons),
// use buttons as secondary way to implement weather call
// ideas: 

// - date
// including, how to display future dates?

// - Include a 5-Day Forecast below the current weather conditions. Each day for the 5-Day Forecast should display the following:
// Date
// Icon image (visual representation of weather conditions)
// Temperature
// Humidity

$(document).ready(function () {

  var openWeatherKey = "192f20e20e9ac8e9e102a10e908ac702";

  // jQuery to target search form
  $("#searchButton").on("click", function () {
    var searchQuery = $("#searchForm").val();
    var urlSearchQuery = spaceToPlusParser(searchQuery); // can this just be the argument to the ajax call?
    buttonMaker(searchQuery);
    // more args later
    openWeatherCaller(urlSearchQuery)
    // throw arguments later
    textAppender();
  })

  // jQuery to target button text
  $(".searchHistory").on("click", function () {
    targetId = event.target.id;
    var searchQuery = $(targetId).text(); // parse this for URL
  })

  // redesign for getting current date, including day, month
  function getDate() {
    var date = parseInt(moment().format('MMMM Do YYYY'));
    return date;
  }

  // redesign for openWeather API
  // figure out args
  function openWeatherCaller(cityQuery,) {
    countryCode = "uk"
    // var currentWeatherQueryURL
    //   = "https://api.openweathermap.org/data/2.5/weather?q=" 
    //   + cityQuery + "," + countryCode + "&APPID=" + openWeatherKey;
    // $.ajax({
    //   url: currentWeatherQueryURL,
    //   method: "GET",
    //   success: function (response) {
    //     // console.log(response);
    //   }
    // })
    var fiveDayQueryURL
    = "https://api.openweathermap.org/data/2.5/forecast?q=" 
    + cityQuery + "," + countryCode + "&APPID=" + openWeatherKey;
    $.ajax({
      url: fiveDayQueryURL,
      method: "GET",
      success: function (response) {
        // console.log(response);
        currentWeatherGetter(response);
        fiveDayMaker(response);
      }
    })
  }

  function currentWeatherGetter(response) {
    console.log(response.list[0].dt_txt); // date
    console.log(response.list[0].weather[0].icon); // weather icon
    console.log(response.list[0].main.temp); // temp
    console.log(response.list[0].main.humidity); // humidity
    console.log(response.list[0].wind.speed); // wind speed
  }

  function fiveDayMaker(response) {
    for (var i = 1; i < 6; i++) {
      cardMaker(response.list[i]);
      console.log("day " + i);
      console.log(response.list[i].dt_txt); // date
      console.log(response.list[i].weather[0].icon); // weather icon
      console.log(response.list[i].main.temp); // temp
      console.log(response.list[i].main.humidity); // humidity
      // console.log(response.list[0].wind.speed); // wind speed
    }
  }

  // test call
  openWeatherCaller("london");

  // redesign
  function storage(day) {
    // needs to access
    for (var i = 0; i < day.length; i++) {
      var key = "hour" + day[i].slot;
      localStorage.setItem(key, JSON.stringify(day[i]));
    }
  }

  // redesign!
  function divMaker() {
    var deck = $("#cardDeck"); // can this line be eliminated?
    var divClassCard = $("<div></div>")
      .addClass("card");
    deck.append(divClassCard);
    var divClassCardBody = $("<div></div>")
      .attr({
        "class": "card-body fiveDay" + hourSlot,
        "id": "hour" + hourSlot,
      });
    divClassCard.append(divClassCardBody);
    return divClassCardBody;
  }

  // will append the weather info in the upper container
  function textAppender() {
    $("#locationDate").text("PLACEHOLDER");
    $("#temp").text("Temperature: ");
    $("#humidity").text("Humidity: ");
    $("#windSpeed").text("Wind Speed: ");
    $("#UV").text("UV Index: ");
  }

    // a little messy, would love to clean up with more time
    function divMaker(hourSlot) {
      var deck = $("#cardDeck"); // can this line be eliminated?
      var divClassCard = $("<div></div>")
        .addClass("card");
      deck.append(divClassCard);
      var divClassCardBody = $("<div></div>")
        .attr({
          "class": "card-body hourCard hour" + hourSlot,
          "id": "hour" + hourSlot,
        });
      divClassCard.append(divClassCardBody);
      return divClassCardBody;
    }

  // redesign
  function cardMaker(object) {
    var forecastCard = $("<div></div>")
    .addClass("card");  
    var forecastCardInner = $("<div></div>")
    .addClass("card-body"); 
    forecastCardInner.append([
      $("<p></p>").text(object.dt_txt),
      $("<p></p>").text(object.weather[0].icon),
      $("<p></p>").text(object.main.temp),
      $("<p></p>").text(object.main.humidity)
    ])
    forecastCard.append(forecastCardInner);
    $("#fiveDay").append(forecastCard);
  }

  // this will definitely be used
  function buttonMaker(location) {
    //use this line if the search history is a scroll box of <li>
    // $("#testP").append($("<li>").append(event));
    var idText = spaceDeleter(location);
    var id = "#" + idText;
    $("#searchHistoryList").append($("<button>")
      .attr({
        "type": "button",
        "class": "btn btn-dark float-right searchHistory",
        "id": idText,
      })
    );
    $(id).text(location);
    $("#searchHistoryList").append($("<br>"));
    $("#searchHistoryList").append($("<br>"));
  }

  function spaceToPlusParser(str) {
    var spaceToPlusString = str.replace(/ /g, '+');
    return spaceToPlusString;
  }

  function spaceDeleter(str) {
    var noSpaceString = str.replace(/ /g, '');
    return noSpaceString;
  }
})


