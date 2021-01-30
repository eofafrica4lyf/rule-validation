const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/ErrorHandler");
const Validation = require("../services/Validation");

/**
 * @route GET /
 * @desc Get personal info
 * @access
 */
exports.personalInfo = catchAsyncError( async(req, res, next) => (
    res.status(200).json({
        message: "My Rule-Validation API",
        status: "success",
        data: {
            "name": "Emmanuel Aboderin",
            "github": "@eofafrica4lyf",
            "email": "aboderinemmanuel@gmail.com",
            "mobile": "08156612100",
            "twitter": "@aboderinemman"
        }
    })
))

/**
 * @route POST /validate-rule
 * @desc Validate data based on specified rules
 * @access
 */
exports.validateRule = catchAsyncError( async(req, res, next) => {
    Validation.validatePayload(req.body);
    const data = Validation.performEvaluation(req.body);
    return res.status(200).json({
        message: data.validation.error ? 
            `field ${data.validation.field} failed validation` : 
            `field ${data.validation.field} successfully validated.`,
        status: data.validation.error ? 
            "error" :
            "success",
        data
    });
})