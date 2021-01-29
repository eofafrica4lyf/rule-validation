const catchAsyncError = require("../middleware/catchAsyncError");

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