const passport = require('passport');
const User = require("../user-model");
const FacebookStrategy = require('passport-facebook').Strategy;
const mongoose = require('mongoose');

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});
passport.use(new FacebookStrategy({
    clientID: '1934935630146191',
    clientSecret: 'ed7052d9bbaebfa53b0ce911b062ffec',
    callbackURL: "/auth/facebook/callback",
    proxy: true
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({ fbId: profile.id })
      .then(user => {
        if (user) {
          done(null, user);
        } else {
          const newUser = new User({
            fbId: profile.id,
            userName: profile.displayName
          })
            .save()
            .then(user => {
              done(null, user);
            });
        }
      })
  }
));
