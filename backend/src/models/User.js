const { database } = require("../database"); // Import the database instance
const bcrypt = require("bcrypt");

class User {
  id; //number
  username; //string
  raw_password;
  password; //string
  name; //string
  email; //string
  created_dt; //date

  constructor(id, username, raw_password, password, name, email, created_dt) {
    this.id = id;
    this.username = username;
    this.raw_password = raw_password;
    this.password = password;
    this.name = name;
    this.email = email;
    this.created_dt = created_dt;
  }

  static async signup(user) {
    return new Promise((resolve) => {
      try {
        const { username, password, name, email, created_dt } = user;

        //hash password
        const saltRounds = 10;

        bcrypt.genSalt(saltRounds, function (err, salt) {
          bcrypt.hash(password, salt, function (err, hash) {
            console.log(password);
            console.log(hash);
            const query =
              "INSERT INTO users (username, raw_password, password, name, email, created_dt) VALUES ?";
            const values = [
              [username, password, hash, name, email, created_dt],
            ];
            database.query(query, [values], (err, result) => {
              if (err !== null) {
                throw err;
              }
              resolve();
            });
          });
        });
      } catch (error) {
        console.error("Error creating user:", error);
        resolve();
      }
    });
  }

  static async login(user) {
    return new Promise((resolve, reject) => {
      try {
        const { username, password } = user;

        const query = "SELECT * FROM users WHERE username = ? ";
        database.query(query, [username], (err, result) => {
          if (err !== null) {
            throw err;
          }
          const resultUser = result[0];

          if (!resultUser) {
            // If the user doesn't exist, reject the promise with an error
            reject(new Error("User not found"));
            return;
          }
          // Validate Password
          bcrypt.compare(password, resultUser.password, function (err, result) {
            if (err) {
              reject(err);
              return;
            }

            if (result) {
              delete resultUser.password;
              delete resultUser.raw_password;
              resolve(resultUser);
            } else {
              // If the password is incorrect, reject the promise with an error
              reject(new Error("Invalid password"));
            }
          });
        });
      } catch (error) {
        console.error("Error logging in:", error);
        resolve();
      }
    });
  }

  static async getUserById(id) {
    return new Promise((resolve) => {
      try {
        const query = "SELECT * FROM users WHERE id = ?";
        database.query(query, [id], (err, result) => {
          if (err !== null) {
            throw err;
          }
          const ResultUser = result[0];
          console.log("RESULT 0: ", result[0]);
          resolve(ResultUser);
        });
      } catch (error) {
        console.error("Error geting user by id:", error);
        resolve(null);
      }
    });
  }
}

module.exports = User;
