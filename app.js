const express = require('express');

const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static("public"));

var items = ["Buy food", "Cook food", "Eat food"];
var item = "";


app.get("/", (req, res) => {

    var today = new Date();

    var options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    };

    var day = today.toLocaleDateString("en-US", options);

    res.render("list", {
        kindOfDay: day,
        newList: items
    });
});


app.post("/", (req, res) => {
    item = req.body.item;
    items.push(item);
    res.redirect("/");
});


app.listen(process.env.PORT || 3000, () => {
    console.log("Server started");
});