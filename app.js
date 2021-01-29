const express = require("express");
const app = express();
const server = require("http").Server(app);
const cors = require("cors");

const ErrorHandler = require("./utils/ErrorHandler");
const errorMiddleware = require("./middleware/errors")

const allRoutes = require("./routes");

const PORT = process.env.PORT || 3000

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.use("/", allRoutes)

app.all("*", (req, res, next) => {
    next(new ErrorHandler(`${req.originalUrl} route not found`, 404));
})

app.use(errorMiddleware)

server.listen(PORT, () => console.log(`Server is live on port ${PORT}`));

module.exports = server;