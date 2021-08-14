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

### Members

```bash
# Add New Member
POST  /api/member
Headers: x-auth-token: {token}
Body data:
{
    "avatar": "https://cdn.fakercloud.com/avatars/ManikRathee_128.jpg",
    "firstName": "Donna",
    "lastName": "Hiti",
    "email": "donna@gmail.com",
    "position": "Front End Engineer",
    "dateJoin": "2014-08-20",
    "location": [
        {
            "address": "140 Dang Van Ngu",
            "district": "phunhuan",
            "city": "hcm"
        }
    ]
}

# Get List Members
GET  /api/member
GET  /api/member?page=1&limit=10
Headers: x-auth-token: {token}

# Get Member
GET  /api/member/:id
Headers: x-auth-token: {token}

# Delete Member
DELETE  /api/member:id

# Update Member
PUT  /api/member/:id
Headers: x-auth-token: {token}
Body data:
{
  "avatar": "https://cdn.fakercloud.com/avatars/ManikRathee_128.jpg",
  "firstName": "Larry",
  "lastName": "Steve",
  "email": "Larry@gmail.com",
  "position": "Web Developer",
  "dateJoin": "2020-02-20",
  "location": [
    {
      "address": "140 Dang Van Ngu",
      "district": "phunhuan",
      "city": "hcm"
    },
  ]
}
```

### Photos

```bash
# Add New Photo
POST  /api/photo
Headers: x-auth-token: {token}
Body data:
{
  "image": "https://cdn.fakercloud.com/avatars/ManikRathee_128.jpg",
  "title": "Sport 2",
  "description": "Lizards are a widespread group of squamate reptiles",
  "category": "sports"
}

# Get List Photos
GET  /api/photo
GET  /api/photo?page=1&limit=10
Headers: x-auth-token: {token}

# Get Photo
GET  /api/photo/:id
Headers: x-auth-token: {token}

# Delete Photo
DELETE  /api/photo:id

# Update Photo
PUT  /api/photo/:id
Headers: x-auth-token: {token}
Body data:
{
  "image": "https://cdn.fakercloud.com/avatars/ManikRathee_128.jpg",
  "title": "Sport 4",
  "description": "Lizards are a widespread group of squamate reptiles",
  "category": "sports"
}
```
