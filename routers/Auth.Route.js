// Import the required modules
const express = require("express")
const router = express.Router();

const {signUp, login}=require(`../controllers/Auth`);
const { validateSchema, signUPSchema, LoginSchema } = require("../utils/validationSchema/userSchema");
// const {vali}

router.post(`/signup`,validateSchema(signUPSchema),signUp);

router.post('/login',validateSchema(LoginSchema),login)


module.exports = router