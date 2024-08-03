const User = require("../models/user.models");
const bycrpt = require("bcrypt");
const jwt = require("jsonwebtoken");






exports.signUp = async (req, res) => {


    try {
        
        const { name ,email, password } = req.body;

       

        if (!email || !password  || !name ) {
            // console.log(name email, password,  );
            return res.status(403).json({
                success: false,
                message: 'All fields are required',
            });
        }
       
        const CheckUserPresent = await User.findOne({ email });
        if (CheckUserPresent) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        // Hash Password
        const Hashedpassword = await bycrpt.hash(password, 10);

        const user = await User.create({
            
            name,
            email,
            password: Hashedpassword,
        });
        console.log(user);
        return res.status(200).json({
            success: true,
            message: `Account Successfully created`,
        })
    }
    catch (error) {
        console.log(`Error while singUp${error}`);
        return res.status(500).json({
            success: false,
            message: `An error occurred while singup Try again later`,
        });


    }
}




exports.login = async (req, res) => {
    try {
        
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(403).json({
                success: false,
                message: 'All fields are required',
            })
        }
        const user = await User.findOne({ email }).populate("FavMovie").exec();;
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User does not exist Please first SingUp',
            });
        }
        // check password and create jwt token
        // console.log(`under user: ${user.accountType}`)
        if (await bycrpt.compare(password, user.password)) {
            const payload = {
                email: user.email,
                id: user._id,
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: '3h',
               
            });
            user.token = token;
            user.password = undefined;
            // Genrate cookie
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            }

            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: `Login was successful. You have access to your account.`,
            })
        }
        else {
            return res.status(401).json({
                success: false,
                message: `Invalid password`,
            });
        }
    }
    catch (error) {
        console.log(`error while logging in: ${error}`);
        return res.status(500).json({
            success: false,
            message: `Loggined failed Try again later`,
        })
    }

}