require("dotenv").config();
const express = require("express");
const app = express();
const server = require("http").Server(app);
const cors = require("cors");

const ErrorHandler = require("./utils/ErrorHandler");
const errorMiddleware = require("./middleware/errors")

const swaggerUi = require("swagger-ui-express")
const swaggerDocument = require("./ruleValidation.json")

const allRoutes = require("./routes");

const PORT = process.env.PORT || 3000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

//api documentation
app.use("/api-docs", function(req, res, next){
    swaggerDocument.host = req.get('host');
    swaggerDocument.schemes = process.env.NODE_ENV === "production" ? ["https"]: ["http"]
    req.swaggerDoc = swaggerDocument;
    next();
}, swaggerUi.serve, swaggerUi.setup())

app.use("/", allRoutes)

app.all("*", (req, res, next) => {
    next(new ErrorHandler(`${req.originalUrl} route not found`, 404));
})

app.use(errorMiddleware)

server.listen(PORT, () => console.log(`Server is live on port ${PORT}`));

module.exports = server;