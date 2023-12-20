const express=require('express');
const controller=require("../controllers/auth-controller")
const signupSchema = require("../validators/auth-validator")
const validate =require("../middlewares/validate-middleware");
const authMiddleware = require("../middlewares/auth-middleware")

const router= express.Router();

router.get('/', controller.home);

router.route('/register').post(validate(signupSchema),controller.register);  //another way same as above
router.route('/login').post(controller.login);
router.route("/user").get(authMiddleware, controller.user);

module.exports=router;
