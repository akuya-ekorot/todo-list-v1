const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/todolistDB";

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const tasksSchema = mongoose.Schema({
  name: String,
});

const DefaultTask = mongoose.model("DefaultTask", tasksSchema);

exports.defaultTasks = () => {
  //   const task1 = new DefaultTask({
  //     name: "Make Bijou some porridge",
  //   });

  //   const task2 = new DefaultTask({
  //     name: "Get the internet",
  //   });

  //   const task3 = new DefaultTask({
  //     name: "Take a shower",
  //   });

  const task1 = { name: "Make Bijou some porridge" };
  const task2 = { name: "Make myself a coffee" };
  const task3 = { name: "Make mum a glass of wine" };

  tasks = [task1, task2, task3];

  return tasks;
};
