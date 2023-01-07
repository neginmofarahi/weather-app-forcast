function displayTemp(response) {
  let h1 = document.querySelector("h1");
  let strong = document.querySelector("strong");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let state = document.querySelector("#weather-state");
  let icon = document.querySelector("#relevent-icon");
  h1.innerHTML = response.data.city;
  strong.innerHTML = Math.round(response.data.temperature.current);
  humidity.innerHTML = Math.round(response.data.temperature.humidity);
  wind.innerHTML = Math.round(response.data.wind.speed);
  state.innerHTML = response.data.condition.description;
  icon.setAttribute("src", response.data.condition.icon_url);
  icon.setAttribute("alt", response.data.condition.description);

  mainCity = response.data.city;
  addApi();
}

function showTime(Date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "Jan.",
    "Feb.",
    "Mar.",
    "Apr.",
    "May.",
    "June.",
    "July.",
    "Aug.",
    "Sept.",
    "Oct.",
    "Nov.",
    "Dec.",
  ];
  let month = months[now.getMonth()];
  let day = days[now.getDay()];
  let date = now.getDate();
  let hour = now.getHours();
  let min = now.getMinutes();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  if (min < 10) {
    min = `0${min}`;
  }
  let dayElement = document.querySelector("#current-date");
  let timeElement = document.querySelector("#current-time");
  dayElement.innerHTML = `${day}, ${month} ${date}th`;
  timeElement.innerHTML = `${hour}:${min}`;
}

function search(city) {
  let apiKey = "bfa61db2bc3af1t5c04ce30131329o2a";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  console.log(apiURL);
  axios.get(apiURL).then(displayTemp);
}

function submit(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#search-city");
  search(cityElement.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForcast(response) {
  let forcast = response.data.daily;
  let forcastElement = document.querySelector("#forcast");
  let forcastHTML = `<div class="row">`;
  forcast.forEach(function (forcastDay, index) {
    if (0 < index && index < 7) {
      forcastHTML =
        forcastHTML +
        `<div class="col-2">
                <div class="forcast-day">${formatDay(forcastDay.time)}</div>
                <img
                  src=${forcastDay.condition.icon_url}
                  alt=${forcastDay.condition.description}
                  class="forcast-icon"
                />

                <div class="forcast-temp">
                  <span class="forcast-temp-max">${Math.round(
                    forcastDay.temperature.maximum
                  )}⬆</span>
                  <span class="forcast-temp-min">${Math.round(
                    forcastDay.temperature.minimum
                  )}⬇</span>
                </div>
              </div>`;
    }
  });
  forcastHTML = forcastHTML + `</div>`;
  forcastElement.innerHTML = forcastHTML;
}
function addApi() {
  let apiKey = "bfa61db2bc3af1t5c04ce30131329o2a";
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?query=${mainCity}&key=${apiKey}`;
  console.log(apiURL);
  axios.get(apiURL).then(displayForcast);
  //displayForcast();
}

let mainCity = null;

let now = new Date();
showTime(now);

let form = document.querySelector("#search-form");
form.addEventListener("submit", submit);
