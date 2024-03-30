
/**************************
 * Require Statements
 *************************/
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 5500;
const dataBase = require('./models');
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;



/**************************
 * Middleware
 **************************/
app.use(bodyParser.json())
    .use(session({ secret: 'secret', resave: false, saveUninitialized: true }))
    .use(passport.initialize())
    .use(passport.session())
    .use('/', require('./routes'))
    .use(cors({ methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'] }))
    .use(cors({ origin: '*' }))

passport.use(
new GitHubStrategy(
    {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
    },
    function (accessToken, refreshToken, profile, done) {
    return done(null, profile);
    }
)
);

passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  app.get('/', (req, res) => {
    res.send(
      req.session.user !== undefined
        ? `Logged in as ${req.session.user.displayName}`
        : 'Logged Out'
    )
  });
  
app.get(
'/github/callback',
passport.authenticate('github', {
    failureRedirect: '/api-docs',
    session: false
}),
(req, res) => {
    req.session.user = req.user;
    res.redirect('/');
});



/****************************
 * Error handling
 ****************************/
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    res.status(err.statusCode).json({ message: err.message });
})

/**************************
 * Verify database operation
 **************************/
dataBase.mongoose.connect(
    process.env.MONGODB_URI)
    .then(() => {
        app.listen(port, () => {
            console.log(`Connected to database on port: ${port}`);
        });
    })
    .catch((err) => {
        console.error('Cannot connect to the database', err);
        process.exit();
    });








