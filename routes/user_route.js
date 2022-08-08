//const { urlencoded } = require('body-parser');
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');
const multer = require('multer');
const path = require("path");
const filePath = path.join(__dirname, "../views/images");

console.log(filePath)

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, filePath);
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
})

var upload = multer({ storage: storage })


const cpUpload = upload.fields([{ name: 'passportImage', maxCount: 1 }, { name: 'idCardImage', maxCount: 1 }])


router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/list', userController.list);
router.post('/verifyOtp', userController.verifyOtp);
router.post('/verifyOtp', userController.verifyOtp);
router.patch('/updateProfile', upload.single('profileImage'), userController.updateProfile);
router.post('/uploadDocument', cpUpload, userController.uploadDocument);



module.exports = router