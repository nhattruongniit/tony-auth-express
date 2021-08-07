# Build A Node.js API Authentication With JWT

A api authenticate to serve for the final course front end developer by Tony

- express js
- mongo

## Script

```bash
# install dependency
$ npm install

# run localhost:3002
$ npm run dev
```

## API

https://tony-auth-express.herokuapp.com

Get fake avatar url:

https://rawgit.com/Marak/faker.js/master/examples/browser/index.html

### Acount

```bash
# Admin account
email: admin@gmail.com
pass: 123456
```

### Authenticate User & Token

```bash
POST  /api/auth
Headers: x-auth-token: {token}
```

### Users

```bash
# Login User
POST  /api/user/login
Content-Type: application/json
Body data:
{
  email: xxx,
  password: xxx,
}

# Register User
POST  /api/user/register
Content-Type: application/json
Body data:
{
  avatar: xxx,
  firstName: xxx,
  lastName: xxx,
  email: xxx,
  role: 'operator',
  password: xxx,
}

# Get List Users
GET  /api/user
GET  /api/user?page=1&limit=10
Headers: x-auth-token: {token}

# Get User
GET  /api/user/:id
Headers: x-auth-token: {token}

# Update User
PUT  /api/user/:id
Headers: x-auth-token: {token}
Body data:
{
  role: 'operator'
}

# Delete User
DELETE  /api/user/:id
Headers: x-auth-token: {token}
```
