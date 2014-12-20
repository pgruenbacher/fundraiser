var passport = require('passport');
var StripeStrategy = require('passport-stripe').Strategy;


exports.setup = function (User, config) {
  passport.use(new StripeStrategy({
      clientID: config.stripe.clientID,
      clientSecret: config.stripe.clientSecret,
      callbackURL: config.stripe.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {
      User.findOne({
        'stripe.stripe_user_id': profile.stripe_user_id
      }, function(err, user) {
        if (!user) {
          user = new User({
            name: 'asdtasdf',
            email: 'asdfasdf',
            role: 'user',
            username: 'asdfasdf',
            provider: 'stripe',
            stripe: profile._json
          });
          user.save(function(err) {
            console.log('new user saved',accessToken,err);
            if (err) done(err);
            return done(err, user);
          });
        } else {
          return done(err, user);
        }
      });
    }
  ));
};
