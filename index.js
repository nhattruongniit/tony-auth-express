const express = require('express');
const cors = require('cors')
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
// routes
const authRoute = require('./routes/auth');
const postsRoute = require('./routes/posts');

dotenv.config();
app.use(cors());

// env  
const PORT = process.env.PORT || 3000;

// connect to DB
mongoose.connect(
  // 'mongodb+srv://nhattruongniit:truong123@cluster0.xga7w.mongodb.net/tony_course_fe?retryWrites=true&w=majority', 
  process.env.DB_CONNECT,
  { 
    useNewUrlParser: true, 
    useUnifiedTopology: true
  },
  () => {
    console.log('connect to DB')
  }
)

// middlewares
app.use(express.json());
// route middleware
app.use('/api/user', authRoute);
app.use('/api/posts', postsRoute);

app.listen(3000, () => {
  console.log(`Server Up and running localhost: ${3000}`)
});