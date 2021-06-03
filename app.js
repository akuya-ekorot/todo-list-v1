const express = require('express');
const date = require(`${__dirname}/date.js`);
const app = express();


app.set('view engine', 'ejs');
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static("public"));


let items = ["Buy food", "Cook food", "Eat food"];
let workItems = [];


app.get("/", (req, res) => {
    res.render("list", {
        listTitle: date.getDate(),
        newList: items
    });
});


app.get("/work", (req, res) => {
    res.render("list", {
        listTitle: "Work List",
        newList: workItems
    });
});


app.get("/about", (req, res) => {
    res.render("about");
});


app.post("/", (req, res) => {
    let item = req.body.item;
    let list = req.body.list;

    if (list === day) {
        console.log(list);
        items.push(item);
        res.redirect("/");
    } else {
        console.log(list);
        workItems.push(item);
        res.redirect("/work");
    } 
});


app.listen(process.env.PORT || 3000, () => {
    console.log("Server started");
});

