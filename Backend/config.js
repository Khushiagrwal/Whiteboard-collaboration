require('dotenv').config();
const config={
    PORT:process.env.PORT || 3000,
    FrontendUrl:process.env.FrontendUrl,
    MONGODB_URL:process.env.MONGODB_URL,
    JWT_SECRET:process.env.JWT_SECRET
}

module.exports = config;