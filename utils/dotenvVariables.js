require(`dotenv`).config();


const MongoDB_URL=process.env.MongoDB_URL;
const PORT =process.env.PORT || 5000;
const por="prabhat"

module.exports = {
    MongoDB_URL,
    PORT,
    por
};