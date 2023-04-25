const express = require('express');
const cors = require('cors')
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
// routes
const authRoute = require('./routes/auth');
const usersRoute = require('./routes/users');
const membersRoute = require('./routes/members');
const photosRoute = require('./routes/photos');
const todosRoute = require('./routes/todos');

dotenv.config();
app.use(cors());
app.use(express.static('public'))

// env  
const PORT = process.env.PORT || 3000;

// connect to DB
mongoose
  .connect(
    process.env.DB_CONNECT, 
    {
      useNewUrlParser: true,
    }
  )
  .catch((error) => console.log("Connect Fail: ", error));


// middlewares
app.use(express.json({ extend: true }));
app.get('/', (_, res) => res.send('API running'));

// route middleware
app.use('/api/auth', authRoute);
app.use('/api/user', usersRoute);
app.use('/api/member', membersRoute);
app.use('/api/photo', photosRoute);
app.use('/api/todo', todosRoute);

app.listen(PORT, () => {
  console.log(`Server Up and running localhost: ${PORT}`)
});