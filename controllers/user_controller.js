const userModel = require('../models/user_model')
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const { find } = require('../models/user_model');
const user_model = require('../models/user_model');



exports.register = [
    body('fullName').exists().notEmpty().withMessage('Full name field is required'),
    body('email').exists().notEmpty().withMessage('Email field is required')
    .isEmail().withMessage('Email must be a valid email.'),
    body('phoneNumber').isLength({ min: 10 }).withMessage('Number must be 10 in length'),
    async(req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    code: 400,
                    msg: errors.array()[0]['msg'],
                    data: errors.array()
                });
            } else {
                const { fullName, email, phoneNumber, } = req.body;
                const find = await userModel.findOne({ 'email': email });
                if (find) {
                    return res.status(402).json({
                        code: 402,
                        msg: "Email is already exist!"

                    });
                } else {

                    const refData = userModel({
                        full_name: fullName,
                        email: email.toLowerCase(),
                        phoneNumber: phoneNumber,


                    })
                    console.log(phoneNumber)
                    const save = await refData.save();

                    if (save) {
                        return res.status(200).json({
                            code: 200,
                            msg: "User registered successfully"
                        });
                    } else {
                        return res.status(400).json({
                            code: 400,
                            msg: "Something Went Wrong!"
                        });
                    }
                }
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                code: 500,
                msg: "Internal Server Error!!!"
            });
        }
    }
]


exports.login = [
    body('phoneNumber').isLength({ min: 10 }).withMessage('Phone Number must be 10 in length'),
    async(req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    code: 400,
                    msg: errors.array()[0]['msg'],
                    data: errors.array()
                });
            } else {
                const { phoneNumber } = req.body;
                const find = await userModel.findOne({ 'phoneNumber': phoneNumber });
                if (find) {

                    return res.status(200).json({
                        code: 200,
                        msg: "OTP Sent your  Phone Number",
                        data: find.phoneNumber

                    });
                } else {
                    return res.status(400).json({
                        code: 400,
                        msg: "Wrong Number "

                    });
                }
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                code: 500,
                msg: "Internal Server Error!!!"
            });
        }

    }
]


exports.list = (async(req, res) => {
    try {
        let find = await userModel.find()
        if (find) {
            console.log(find)
            res.status(200).json({
                Data: find

            })
        } else {
            return res.status(400).json({
                code: 400,
                msg: "Not able to fetch"

            });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            code: 500,
            msg: "Server Isue!!"
        });
    }

})


exports.verifyOtp = [
    body('phoneNumber').exists().notEmpty().withMessage('Phone Number field is required'),
    body('otp').exists().notEmpty().withMessage('OTP field is required'),
    async(req, res) => {
        try {

            const user = await userModel.findOne({ phoneNumber: req.body.phoneNumber, otp: req.body.otp });


            if (user) {
                const OTP = 12345;
                if (req.body.otp == OTP) {
                    await userModel.findOneAndUpdate({ phoneNumber: req.body.phoneNumber }, { otp: user.otp });
                    return res.status(200).json({
                        code: 200,
                        msg: 'otp verified'
                    });

                } else {
                    return res.status(400).json({
                        code: 400,
                        msg: 'OTP is not Valid ,Please enter the correct OTP'
                    });

                }

            } else {
                return res.status(400).json({
                    code: 400,
                    msg: 'Incorrect Phone Number'
                });
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                code: 500,
                msg: "Internal Server Error!!!"
            });
        }
    }
]


exports.updateProfile = (async(req, res) => {
    try {

        const profile = await userModel.findOneAndUpdate({ email: req.body.email }, {
            $set: {
                profileImage: req.file.filename,
                full_name: req.body.fullName,
                email: req.body.email,
                phoneNumber: req.body.phoneNumber,
                DOB: req.body.DOB,
                gender: req.body.gender,

            }
        }, { upsert: true })
        if (profile) {
            return res.status(200).json({
                code: 200,
                msg: "Profle Updated Succesfully"
            });
        } else {
            return res.status(400).json({
                code: 400,
                msg: "Something went wrong!!!"
            });
        }

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            code: 500,
            msg: "Internal Server Error!!!"
        });
    }
})


exports.uploadDocument = (async(req, res, err) => {
    try {

        let update = await userModel.findOneAndUpdate({ email: req.body.email }, {
            $set: {
                passportImage: req.files.passportImage[0].filename,
                IdCardImage: req.files.idCardImage[0].filename
            }
        })

        if (update) {

            console.log(update)
            return res.status(200).json({
                code: 200,
                msg: "Uploaded Successfully",

            });
        } else {
            return res.status(400).json({
                code: 400,
                msg: "Something went wrong"
            });
        }

        console.log(req.files.passportImage[0].filename, )
    } catch {
        return res.status(500).json({
            code: 500,
            msg: "Internal Server Error!!!"
        });
    }
    ``

})