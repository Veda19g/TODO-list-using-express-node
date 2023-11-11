const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
const taskList = [];
const WorkList = [];
app.get("/", (req, res) => {
  const date = new Date();
  const daysOfWeek = [
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

  const day = daysOfWeek[date.getDay()];
  const month = months[date.getMonth()];
  const no = date.getDate();

  // Determine which list to display based on the isWorkMode flag
  const newtask = taskList;

  res.render("index.ejs", { newtask, day, month, no });
});

app.get("/work", (req, res) => {
  const wtask = WorkList;
  res.render("work.ejs", { wtask });
});

app.post("/submit", (req, res) => {
  const task = req.body.details; // Get the task from the form
  const isWorktask = req.body.Nworktask;

  if (task !== "") {
    taskList.push(task);

    res.redirect("/");
    // Redirect back to the homepage
  } else {
    res.send(
      '<script>alert("Please enter a task."); window.location.href = "/";</script>'
    );
  }
});

app.post("/addworktask", (req, res) => {
  const task = req.body.details;

  if (task !== "") {
    WorkList.push(task); // Add the task to the WorkList
    res.redirect("/work"); // Redirect to the work page
  } else {
    res.send(
      '<script>alert("Please enter a task."); window.location.href = "/";</script>'
    );
  }
});

app.listen(port, (req, res) => {
  console.log(`server running on ${port}`);
});
