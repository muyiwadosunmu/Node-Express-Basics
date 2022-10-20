const passport = require("passport");
const { Strategy } = require("passport-discord");
const DiscordUser = require('../database/schemas/DiscordUser');

passport.use(
    new Strategy({
        clientID: "1032634414955499530",
        clientSecret: "FYcnUCGrB01wyUt5RGv5OfXJB9NdnOAw",
        callbackURL: "http://localhost:3000/api/v1/auth/discord/redirect",
        scope: ['identify'],
    }, async (accessToken, refreshToken, profile, done) => {
        console.log(accessToken, refreshToken);
        console.log(profile);
        try {
            const discordUser = await DiscordUser.findOne({ discordId: profile.id });
            if (discordUser) {
                return done(null, discordUser)
            } else {
                const newUser = await DiscordUser.create({
                    discordId: profile.id,
                });
                return done(null, newUser);
            }
        } catch (err) {
            console.log(err)
            return done(err, null)
        }
    })
);