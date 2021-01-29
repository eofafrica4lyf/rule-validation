const router = require("express").Router();
const {
    personalInfo
} = require("../controller/RootController");

router.get("/", personalInfo)

module.exports = router;