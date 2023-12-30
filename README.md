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

https://tony-auth-express.vercel.app/

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
POST  /api/user/sigin
Content-Type: application/json
Body
{
  "data": {
    email: xxx,
    password: xxx,
  }
}

# Signup User
POST  /api/user/signup
Content-Type: application/json
Body
{
  "data": {
    avatar: 'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/00/009d272e2b496aa0758a86a17eac5f7716a99133_full.jpg',
    firstName: 'Tony',
    lastName:'Nguyen',
    email: 'tony@gmail.com',
    role: 'operator',
    password: '123456',
  }
}

# Get List Users
GET  /api/user
GET  /api/user?page=1&limit=10

# Get User
GET  /api/user/:id

# Update User
PUT  /api/user/:id
Body data:
{
  "data": {
    avatar: '...',
    firstName: '...',
    lastName:'...',
    email: '...',
    role: 'operator',
    password: '...',
  }
}

# Delete User
DELETE  /api/user/:id
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

### Todos

```bash
# Add New Todo
POST  /api/todo
Body data:
{
  "data": {
    "title": "Learn React",
    "author": "Tony Nguyen",
    "severity": "low",
    "description": "Lizards are a widespread group",
    "status": "new"
  }
}


# Get List Todos
GET  /api/todo
GET  /api/todo?page=1&limit=10

# Get Todo
GET  /api/todo/:id

# Delete Todo
DELETE  /api/todo/:id

# Update Todo
PUT  /api/todo/:id
Body data:
{
  "data": {
    "title": "Learn React",
    "author": "Tony Nguyen",
    "severity": "low",
    "description": "Lizards are a widespread group",
    "status": "new"
  }
}

```
