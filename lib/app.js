const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
// const authenticate = require('./middleware/authenticate');


// ADD IN CORS BEFORE LINKING BE (Ntlify app is added for deployed site / NPM I CORS and set secure cookies to true in .env)
// need to change BASE_URL for production to deployed heroku
// the local host was 5500 on demo, needs to be local host of FE or which port the FE is running on. 
//Backend is running on 7890, not the frontend which schould be 5500
const app = express();
// Built in middleware
app.use(express.json());
app.use(cookieParser());


app.use(cors({
  origin: [
    'https://tranquil-blini-5d46ce.netlify.app',
    'http://localhost:7890',
  
  ],
  credentials: true,
})
);

// App routes
app.use('/api/v1/users', require('./controllers/users'));
app.use('/api/v1/todo', require('./controllers/todo'));
// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
