module.exports = {
    TOKEN_SECRET: process.env.TOKEN_SECRET || "aws1617-02-token-secret",
    DEFAULT_TOKEN: process.env.DEFAULT_TOKEN || "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0OTI3NjYyMjQsImV4cCI6MTQ5Mzk3NTgyNH0.WExNusVFHUcM6LKCwp3cz2SudqM1-CWF3DCZZIPNF-E",
    FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID || "410175979366123",
    FACEBOOK_APP_SECRET: process.env.FACEBOOK_APP_SECRET || "88bc04b0ba6678f3de1e0df511603071",
    FACEBOOK_APP_CALLBACK: process.env.FACEBOOK_APP_CALLBACK || "https://aws-researcher-api-aws1617dcp.c9users.io/login/facebook/return"
};
