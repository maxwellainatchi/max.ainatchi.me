let Express = require("express");
let renderer = require("express-render");
let app = Express();

app.set("view engine", "pug");
app.set("views", "./src");

app.use((req, res, next) => {
	console.log(`HTTP ${req.httpVersion} ${req.method} ${req.originalUrl}`);
	next();
});

app.use(Express.static("public"))
app.use(renderer());

let port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log("Running on port " + port);
});
