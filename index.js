const express = require('express');
const cors = require('cors')
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;

// routes
const authRoute = require('./src/routes/auth');
const usersRoute = require('./src/routes/users.route');
const membersRoute = require('./src/routes/members');
const photosRoute = require('./src/routes/photos');
const todosRoute = require('./src/routes/todos');


dotenv.config();
app.use(cors());
app.use(express.static('public'))

// cloudinary
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

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


app.use(express.json({ extend: true }));
app.use(express.urlencoded({ extended: true }));
app.get('/', (_, res) => res.send('API running'));

// route
app.use('/api/auth', authRoute);
app.use('/api/user', usersRoute);
app.use('/api/member', membersRoute);
app.use('/api/photo', photosRoute);
app.use('/api/todo', todosRoute);

app.listen(PORT, () => {
  console.log(`Server Up and running localhost: ${PORT}`)
});