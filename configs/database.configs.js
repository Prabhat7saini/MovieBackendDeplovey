const mongoose = require('mongoose');
const {MongoDB_URL} =require(`../utils/dotenvVariables`)


exports.connect = () => {
    mongoose.connect(MongoDB_URL).then(() => console.log("Connect to Database"))
        .catch((error) => {
            console.log("Db connection error");
            console.error(error.message);
            process.exit(1);
        });
}