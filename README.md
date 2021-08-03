# Build A Node.js API Authentication With JWT

A api authenticate to serve for the final course front end developer by Tony

- express js
- mongo

Api:

https://tony-auth-express.herokuapp.com

Get fake avatar url:

https://rawgit.com/Marak/faker.js/master/examples/browser/index.html

```bash
# Admin account
email: admin@gmail.com
pass: 123456

# Authenticate User & Token
POST  /api/auth
Headers: x-auth-token: {token}

# Register User
POST  /api/user/register
Content-Type: application/json

{
  avatar: xxx,
  firstName: xxx,
  lastName: xxx,
  email: xxx,
  role: 'operator',
  password: xxx,
}

# Login User
POST  /api/user/login
Content-Type: application/json

{
  email: xxx,
  password: xxx,
}
```
