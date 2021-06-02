const express = require('express');

const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {

    var today = new Date();

    var options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    };

    var day = today.toLocaleDateString("en-US", options);
    res.render("list", {kindOfDay: day}); 
});

app.post("/", (req, res) => {
    console.log(req.body.item);
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server started");
});