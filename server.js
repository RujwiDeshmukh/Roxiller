const express = require("express");
const App = express();

//port
const PORT = 3000;

//Middlewares global
App.use(express.json());
App.use(express.urlencoded({ extended: true }));


App.get("/", (req, res) => {
	res.status(200).send("Incorrect Path");
});

//ROUTES
App.use("/todos", require("./routes/getTodos"));
App.use("/user/:id", require("./routes/getUsers"));

//  Listening Server
App.listen(PORT, () => {
	console.log(`Server Started at ${PORT}`);
});
