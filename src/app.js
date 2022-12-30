function displayTemp(response) {
  let h1 = document.querySelector("h1");
  let strong = document.querySelector("strong");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let state = document.querySelector("#weather-state");
  let icon = document.querySelector("#relevent-icon");
  h1.innerHTML = response.data.name;
  strong.innerHTML = Math.round(response.data.main.temp);
  humidity.innerHTML = Math.round(response.data.main.humidity);
  wind.innerHTML = Math.round(response.data.wind.speed);
  state.innerHTML = response.data.weather[0].description;
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].descriptions);

  celsius = response.data.main.temp;
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
  let apiKey = "7d5433d322af5ac78f642274f8113911";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  console.log(apiURL);
  axios.get(apiURL).then(displayTemp);
}

function submit(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#search-city");
  search(cityElement.value);
}

function convertTempToFarenhit(event) {
  event.preventDefault();
  let strongElement = document.querySelector("strong");
  strongElement.innerHTML = Math.round(celsius * 1.8 + 32);
  farenhitElement.classList.add("active");
  celsiusElement.classList.remove("active");
}

function convertTempToCelsius(event) {
  event.preventDefault();
  let strongElement = document.querySelector("strong");
  strongElement.innerHTML = Math.round(celsius);
  celsiusElement.classList.add("active");
  farenhitElement.classList.remove("active");
}

function displayForcast() {
  let forcastElement = document.querySelector("#forcast");
  let forcastHTML = `<div class="row">`;
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  days.forEach(function (day) {
    forcastHTML =
      forcastHTML +
      `<div class="col-2">
                <div class="forcast-day">${day}</div>
                <img
                  src="https://openweathermap.org/img/wn/01d@2x.png"
                  alt=""
                  class="forcast-icon"
                />

                <div class="forcast-temp">
                  <span class="forcast-temp-max">25°⬆</span>
                  <span class="forcast-temp-min">10°⬇</span>
                </div>
              </div>`;
  });
  forcastHTML = forcastHTML + `</div>`;
  forcastElement.innerHTML = forcastHTML;
}
let celsius = null;

let now = new Date();
showTime(now);

let form = document.querySelector("#search-form");
form.addEventListener("submit", submit);

let farenhitElement = document.querySelector("#farenhit");
farenhitElement.addEventListener("click", convertTempToFarenhit);

let celsiusElement = document.querySelector("#celsius");
celsiusElement.addEventListener("click", convertTempToCelsius);

displayForcast();
