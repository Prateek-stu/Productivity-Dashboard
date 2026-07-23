function openFeatures() {
  let elems = document.querySelectorAll(".container .elem");
  let allElems = document.querySelectorAll(".fullpage");
  let allBtn = document.querySelectorAll(".fullpage .back");
  elems.forEach(function (e) {
    e.addEventListener("click", function () {
      allElems[e.id].style.display = "block";
    });
  });
  allBtn.forEach(function (e) {
    e.addEventListener("click", function () {
      console.log();
      allElems[e.id].style.display = "none";
    });
  });
}

openFeatures();

function todoList() {
  var tasks = [];

  if (localStorage.getItem("tasks")) {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  } else {
    console.log("No data found in localStorage");
  }
  function renderTask() {
    const allTask = document.querySelector(".all-task");

    let sum = "";
    tasks.forEach(function (elem, idx) {
      sum += `<div class="task">
                        <summary><h5>${elem.task} <span class="${elem.important}">imp</span></h5>
                          <details><p>${elem.details}</p></summary>
                        </details>
                        <button id=${idx}>Mark As Completed</button>
                    </div>`;
    });
    allTask.innerHTML = sum;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    let markComplete = document.querySelectorAll(".task button");
    markComplete.forEach(function (btn) {
      btn.addEventListener("click", function () {
        console.log();
        tasks.splice(btn.id, 1);
        renderTask();
      });
    });
  }
  // renderTask();

  function addTask() {
    let inp = document.querySelector(".add-task .inp-task");
    let inpDetails = document.querySelector(".add-task .task-details");
    let box = document.querySelector(".add-task #check");
    const form = document.querySelector(".add-task form");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      tasks.push({
        task: inp.value,
        details: inpDetails.value,
        important: box.checked,
      });
      renderTask();
      ((inp.value = ""), (inpDetails.value = ""), (box.checked = false));
    });
  }
  addTask();

  let clearBtn = document.querySelector(".todo-fullpage .clear");
  clearBtn.addEventListener("click", function () {
    localStorage.removeItem("tasks");
    location.reload();
  });
  renderTask();
}

todoList();

// var hours = Array.from({length=18},(elem,idx)=> `${6+idx}:00 - ${7+idx}:00` to create an array of 18 elements and return the values from 0-17 in idx;

function dailyPlanner() {
  let dayPlanData = {};
  dayPlanData = JSON.parse(localStorage.getItem("dayPlanData")) || {};
  let dayPlanner = document.querySelector(".day-planner");
  let hours = Array.from(
    { length: 18 },
    (elem, idx) => `${6 + idx}:00 - ${7 + idx}:00`,
  );

  let dailyData = "";
  hours.forEach(function (elem, idx) {
    let savedData = dayPlanData[idx] || "";

    dailyData =
      dailyData +
      `<div class="day-planner-time">
                    <p>${elem}</p>
                    <input id=${idx} type="text" placeholder="...." value=${savedData}>

                </div>`;
  });
  dayPlanner.innerHTML = dailyData;
  let dayPlannerInput = document.querySelectorAll(".day-planner-time input");
  dayPlannerInput.forEach(function (e) {
    e.addEventListener("input", function () {
      dayPlanData[e.id] = e.value;

      localStorage.setItem("dayPlanData", JSON.stringify(dayPlanData));
    });
  });
}
dailyPlanner();

function motivationalQuote() {
  let motivationQuate = document.querySelector(".motivationalQuote");
  let Author = document.querySelector(".Author");

  async function getMotivationData() {
    let abc = await fetch("https://api.quotable.io/random");
    let data = await abc.json();

    motivationQuate.innerHTML = data.content;
    Author.innerHTML = data.author;
  }

  getMotivationData();
}
motivationalQuote();

function pomodoroTimer() {
  let timer = document.querySelector(".pomo-timer h2");
  var startBtn = document.querySelector(".pomo-timer .start-timer");
  var pauseBtn = document.querySelector(".pomo-timer .pause-timer");
  var resetBtn = document.querySelector(".pomo-timer .reset-timer");
  var session = document.querySelector(".pomodoro-fullpage .session");
  var isWorkSession = true;

  let totalSeconds = 25 * 60;
  let timerInterval = null;

  function updateTimer() {
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    timer.innerHTML = `${String(minutes).padStart("2", "0")}:${String(seconds).padStart("2", "0")}`;
  }

  function startTimer() {
    clearInterval(timerInterval);

    if (isWorkSession) {
      timerInterval = setInterval(function () {
        if (totalSeconds > 0) {
          totalSeconds--;
          updateTimer();
        } else {
          isWorkSession = false;
          clearInterval(timerInterval);
          timer.innerHTML = "05:00";
          session.innerHTML = "Take a Break";
          session.style.backgroundColor = "var(--blue)";
          totalSeconds = 5 * 60;
        }
      }, 1000);
    } else {
      timerInterval = setInterval(function () {
        if (totalSeconds > 0) {
          totalSeconds--;
          updateTimer();
        } else {
          isWorkSession = true;
          clearInterval(timerInterval);
          timer.innerHTML = "25:00";
          session.innerHTML = "Work Session";
          session.style.backgroundColor = "var(--green)";
          totalSeconds = 25 * 60;
        }
      }, 10);
    }
  }

  function pauseTimer() {
    clearInterval(timerInterval);
  }
  function resetTimer() {
    totalSeconds = 25 * 60;
    clearInterval(timerInterval);
    updateTimer();
  }
  startBtn.addEventListener("click", startTimer);
  pauseBtn.addEventListener("click", pauseTimer);
  resetBtn.addEventListener("click", resetTimer);
}

pomodoroTimer();

function heroWeather() {
  let data = null;
  const apiKey = "e8def0fe6af24644b5f154551261606";
  let city = "Mau";

  let header1Time = document.querySelector(".header1 h1");
  let header1Date = document.querySelector(".header1 h2");
  let header1Location = document.querySelector(".header1 h2");
  let temp = document.querySelector(".header2 .temp");
  let precipitate = document.querySelector(".header2 .precipitation");
  let humidity = document.querySelector(".header2 .humidity");
  let wind = document.querySelector(".header2 .wind");
  let condition = document.querySelector(".header2 .condition");
  let Area = document.querySelector(".header1 .location");

  async function getWeather() {
    let responce = await fetch(
      ` http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`,
    );

    data = await responce.json();

    console.log(data);

    temp.innerHTML = ` ${data.current.temp_c}°C`;
    humidity.innerHTML = `Humidity : ${data.current.humidity}%`;
    wind.innerHTML = `Wind Speed (km/h) : ${data.current.wind_kph} km/h`;
    condition.innerHTML = `  ${data.current.condition.text}`;
    precipitate.innerHTML = `Precipitation: ${data.current.heatindex_f}`;
    Area.innerHTML = ` 📍 ${data.location.name}: ${data.location.region}(${data.location.country})`;
  }
  getWeather();

  function dateTime() {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    let date = new Date();
    let dayOfWeek = days[date.getDay()];
    let hours = date.getHours();

    let minutes = date.getMinutes();
    var currentdate = date.getDate();
    var month = months[date.getMonth()];
    var year = date.getFullYear();

    header1Date = `${currentdate} ${month} , ${year}`;

    if (hours > 12) {
      header1Time.innerHTML = `${dayOfWeek} <br> ${String(hours - 12).padStart("2", "0")}:${String(minutes).padStart("2", "0")} PM`;
    } else {
      header1Time.innerHTML = `${dayOfWeek} , ${hours}:${String(minutes).padStart("2", "0")} AM`;
    }
  }

  setInterval(function () {
    dateTime();
  }, 1000);
}
heroWeather();

function dailyPlans() {

    let dailyTasks = JSON.parse(localStorage.getItem("dailyTasks")) || [];

    let stickytasks = document.querySelector(".sticky-notes");

    function gettasks() {

        let allTsks = "";

        dailyTasks.forEach(function (e) {

            allTsks += `
            <div
            style="
                position:absolute;
                top:${e.top}%;
                left:${e.left}%;
                rotate:${e.rotate}deg;
                background:${e.color};
            ">

                <h2>${e.task}</h2>
                <p>${e.details}</p>

            </div>`;

        });

        stickytasks.innerHTML = allTsks;
    }

    gettasks();

    function addDailyTask() {

        let frm = document.querySelector(".dailyTask-Container .add-tasks form");
        let taskInput = document.querySelector(".add-tasks form .inp-task");
        let taskDets = document.querySelector(".add-tasks form .task-details");

        frm.addEventListener("submit", function (e) {
            console.log("submitted");
            
            e.preventDefault();

            let posy = Math.floor(Math.random() * 80);
            let posx = Math.floor(Math.random() * 70);
            let rotation = Math.floor(Math.random() * 31) - 15;
            let red = Math.floor(Math.random() * 256);
            let green = Math.floor(Math.random() * 256);
            let blue = Math.floor(Math.random() * 256);

            dailyTasks.push({

                task: taskInput.value,
                details: taskDets.value,

                top: posy,
                left: posx,
                rotate: rotation,
                color: `rgb(${red},${green},${blue})`

            });

            localStorage.setItem(
                "dailyTasks",
                JSON.stringify(dailyTasks)
            );

            gettasks();

            taskInput.value = "";
            taskDets.value = "";

        });

    }

    addDailyTask();

    let clearTaskBtn = document.querySelector(".dailyTask-Container .clear");

    clearTaskBtn.addEventListener("click", function () {

        dailyTasks = [];

        localStorage.removeItem("dailyTasks");

        gettasks();

    });

}