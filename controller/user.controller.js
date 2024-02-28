const moment = require("moment");
const Datastore = require("nedb");
const path = require("path");
const INITIAL_USERS_LIST = require("../data/initialUsers");

class User {
  constructor({ username, password, useremail, type }) {
    this.username = username;
    this.useremail = useremail;
    this.password = password; // Password should be hashed
    this.type = type;
  }
}

const userCollection = new Datastore({
  filename: path.join(__dirname, "../database_files/user_collection.nedb"),
  autoload: true,
});

const initializeDatabase = async () => {
  const users = await getInitialUsers();
  if (users.length === 0) {
    const sampleData = INITIAL_USERS_LIST.map((user) => new Book(user));
    await insertBooks(sampleData);
  }
};

const getInitialUsers = async () => {
  return new Promise((resolve, reject) => {
    userCollection.find({}, (err, users) => {
      if (err) reject(err);
      else resolve(users);
    });
  });
};

//Insert User
const insertUsers = (users) => {
  const user = new User(users);
  return new Promise((resolve, reject) => {
    user.type = user.type || "user";

    userCollection.insert(user, (err, insertedUsers) => {
      if (err) {
        reject(err);
      } else {
        resolve(insertedUsers);
      }
    });
  });
};

//Get user by email
const getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    const query = { useremail: email };
    userCollection.findOne(query, (err, user) => {
      if (err) {
        reject(err);
      } else {
        resolve(user);
      }
    });
  });
};

initializeDatabase();

module.exports = {
  User,
  insertUsers,
  getUserByEmail,
};
