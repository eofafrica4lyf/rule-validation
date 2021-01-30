const router = require("express").Router();
const {
    personalInfo,
    validateRule
} = require("../controller/RootController");

router.get("/", personalInfo);
router.post("/validate-rule", validateRule);

module.exports = router;