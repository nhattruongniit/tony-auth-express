const jwt = require('jsonwebtoken');

const generateAccessToken = (payload) => {
  const result = jwt.sign(
    payload, 
    process.env.TOKEN_SECRET,
    { expiresIn: '1m' },
  );
  return result;
}

const generateRefreshToken = (payload) => {
  const result = jwt.sign(
    payload, 
    process.env.TOKEN_SECRET,
    { expiresIn: 3600 },
  );
  return result;
}

module.exports = { 
  generateAccessToken,
  generateRefreshToken
}
