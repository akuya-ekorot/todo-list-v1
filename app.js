const express = require("express");
const mongoose = require("mongoose");
const _ = require('lodash');
const date = require(`${__dirname}/date.js`);
const defaultTasks = require(`${__dirname}/defaultTasks.js`);
const app = express();

app.set("view engine", "ejs");
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.static("public"));

const url = "mongodb://localhost:27017/todolistDB";

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const tasksSchema = mongoose.Schema({
  name: String,
});

const listSchema = mongoose.Schema({
  name: String,
  tasks: [tasksSchema],
});

const Task = mongoose.model("Task", tasksSchema);
const List = mongoose.model("List", listSchema);

app.get("/", (req, res) => {
  Task.find({}, (err, docs) => {
    //handle errors
    if (err) {
      console.log(err);
    } else {
      //if tasks collection is empty in db, add default tasks
      if (docs.length === 0) {
        Task.insertMany(defaultTasks.defaultTasks(), (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("Succesfully added default tasks");
          }
          res.redirect("/");
        });
      } else {
        res.render("list", {
          listTitle: date.getDate(),
          newList: docs,
        });
      }
    }
  });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.post("/", (req, res) => {
  const taskName = req.body.task;
  const listName = req.body.list;

  const newTask = new Task({
    name: taskName,
  });

  if (listName === date.getDate()) {
    newTask.save();
    res.redirect("/");
  } else {
    List.findOne({ name: listName }, (err, doc) => {
      if (err) {
        console.log(err);
      } else {
        doc.tasks.push(newTask);
        doc.save();
        res.redirect(`/${listName}`);
      }
    });
  }
});

app.post("/delete", (req, res) => {
  const taskID = req.body.checkbox;
  const listName = req.body.listName;

  if (listName === date.getDate()) {
    Task.deleteOne({ _id: taskID }, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Succesfully deleted the task");
        res.redirect("/");
      }
    });
  } else {
    List.findOneAndUpdate(
      { name: listName },
      { $pull: { tasks: { _id: taskID } } },
      (err, list) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Successfully deleted the task in this list");
          res.redirect(`/${listName}`);
        }
      }
    );
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started");
});

app.get("/:customListName", (req, res) => {
  const customListName = _.capitalize(req.params.customListName);

  const list = new List({
    name: customListName,
    tasks: defaultTasks.defaultTasks(),
  });

  List.findOne({ name: customListName }, async (err, doc) => {
    if (err) {
      console.log(err);
    } else {
      if (!doc) {
        list.save();
        console.log("created list");
        await new Promise((resolve) => setTimeout(resolve, 50));
        res.redirect(`/${customListName}`);
      } else {
        console.log("using existing list");
        res.render("list", {
          listTitle: customListName,
          newList: doc.tasks,
        });
      }
    }
  });
});
