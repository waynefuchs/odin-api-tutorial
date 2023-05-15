# API Tutorial for The Odin Project

The Odin Project assigned part 3 of a tutorial by Robin Wieruch titled [How to create a REST API with Express.js in Node.js](https://www.robinwieruch.de/node-express-server-rest-api/).

[The Ultimate Guide to Passpor](https://dev.to/zachgoll/the-ultimate-guide-to-passport-js-k2l)

## Installation

If anyone is wanting to run this, for whatever reason, PostgreSQL is required. I used a [docker container](https://hub.docker.com/_/postgres) and pgAdmin to ensure that the ports were being forwarded properly, and initially to verify that sequalize was properly inserted data into the database.

Clone this repo.

Run `npm install` to install the packages.

A `.env` file should contain values such as:

```
# Web port
PORT=3000

# Postgres Details
DATABASE=api_tutorial
DATABASE_USER={Your Postgre Admin User}
DATABASE_PASSWORD={Your Database Password}
```

You will need to create a database with the name specified in this file, for me it is `api_tutorial`.

Edit the `src/index.js` file, and set `eraseDatabaseOnSync = true` on line 37, which will seed the database.

`npm run start` will run the project.

Make sure to set `eraseDatabaseOnSync = false`, unless you want to reset the data in the database every time you restart the application.

## NPM Packages

| Package   | Purpose                                  |
| --------- | ---------------------------------------- |
| cors      | To handle cross-origin resource sharing. |
| dotenv    | Read environment variables               |
| express   | Set up routing and middleware            |
| pg        | Postgres                                 |
| sequelize | Easy SQL queries                         |

## Example Queries

`http://localhost:3000/users`

```
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 433
ETag: W/"1b1-NIJCYUEyxx45lVb8asKExDXTZVs"
Date: Sun, 14 May 2023 11:11:40 GMT
Connection: close

[
  {
    "id": 1,
    "username": "alice",
    "createdAt": "2023-05-14T10:29:19.476Z",
    "updatedAt": "2023-05-14T10:29:19.476Z"
  },
  {
    "id": 2,
    "username": "eaglet",
    "createdAt": "2023-05-14T10:29:19.491Z",
    "updatedAt": "2023-05-14T10:29:19.491Z"
  },
  {
    "id": 3,
    "username": "rabbit",
    "createdAt": "2023-05-14T10:29:19.499Z",
    "updatedAt": "2023-05-14T10:29:19.499Z"
  },
  {
    "id": 4,
    "username": "caterpillar",
    "createdAt": "2023-05-14T10:29:19.505Z",
    "updatedAt": "2023-05-14T10:29:19.505Z"
  }
]
```

Get all messages for the user with the id of `1`.
`http://localhost:3000/messages/1`

```
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 402
ETag: W/"192-5G07LFCdYGPE4I7NSeCAgwdGBaE"
Date: Sun, 14 May 2023 11:13:19 GMT
Connection: close

[
  {
    "id": 1,
    "text": "I wish I hadn’t cried so much!",
    "createdAt": "2023-05-14T10:29:19.485Z",
    "updatedAt": "2023-05-14T10:29:19.485Z",
    "userId": 1
  },
  {
    "id": 2,
    "text": "I shall be punished for it now, I suppose, by being drowned in my own tears! That will be a queer thing, to be sure! However, everything is queer to-day.",
    "createdAt": "2023-05-14T10:29:19.485Z",
    "updatedAt": "2023-05-14T10:29:19.485Z",
    "userId": 1
  }
]
```
