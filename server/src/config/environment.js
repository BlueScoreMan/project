export default {
    port: parseInt(process.env.PORT)||8080,
    nodeEnv: process.env.NODE_ENV||'production',
    saltRounds: parseInt(process.env.SALT_ROUNDS)||10,
    jwtAccessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET||'494138e80bcb405bc99dde5766ababce7da8c0523a9767880e546f736cee554c',
    jwtRefreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET||'90333b4d8218643a66b4a929e8bd775896f0c215cb48761c7a15deb1912abc95',
};