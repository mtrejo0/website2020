const db = require('../db/db_config');

/**
 * @typeof User
 * 
 * @prop {string} name - name of the user
 * @prop {number} id - id of the user
 */

/**
 * @class Users
 * 
 * Stores all Users.
 * Note that all methods are static.
 * Wherever you import this class, you will be accessing the same data.
 */
class Users {
  /**
   * Add a User.
   * 
   * @param {string} name - User name
   * @param {string} password - User password
   * @return {User} - created user
   */
  static async addOne(name, password) {
    // first insert the user into the db then fetch the user from the DB
    return db.run(`INSERT INTO users (${db.columnNames.username},
                                     ${db.columnNames.password}) VALUES ('${name}', '${password}')`)
              .then(() => Users.findByUsername(name));
  }

  /**
   * Remove a User.
   * 
   * @param {string} username 
   * @return {User} - created user
   */
  static async deleteOne(username) {
    return db.run(`DELETE FROM users WHERE ${db.columnNames.username} = '${username}'`);
  }

  /**
   * Find a User by id.
   * @param {string} id 
   * @return {User | undefined} - found User
   */
  static async findByID(id) {
    return db.get(`SELECT * FROM users WHERE ${db.columnNames.user_id} = '${id}'`);
  }

  /**
   * Find a User by username.
   * @param {string} username 
   * @return {User | undefined} - found User
   */
  static async findByUsername(username) {
    return db.get(`SELECT * FROM users WHERE ${db.columnNames.username} = '${username}'`);
  }

  /**
   * Return an array of all of the Users.
   * @return {User[]}
   */
  static async findAll() {
    return db.all(`SELECT * FROM users`);
  }

  /**
   * Update a Users username
   * @param {string} username - username of User
   * @param {string} new_username - new username for User
   * @return {User | undefined} - updated User
   */
  static async updateUsername(username, new_username) {
    return db.run(`UPDATE users 
        SET ${db.columnNames.username} = '${new_username}' 
        WHERE ${db.columnNames.username} = '${username}'`)
        .then( () => {
          return Users.findByUsername(new_username);
        });
  }
  /**
   * Update a Users password
   * @param {string} username - username of User to find
   * @param {string} password - password of User to update
   * @return {User | undefined} - updated User
   */
  static async updatePassword(username, password) {
    return db.run(`UPDATE users 
        SET ${db.columnNames.password} = '${password}' 
        WHERE ${db.columnNames.username} = '${username}'`)
        .then( () => {
          return Users.findByUsername(username);
        });
  }

  /**
   * Update a Users description
   * @param {string} username - username of User to find
   * @param {string} description - description of User to update
   * @return {User | undefined} - updated User
   */
  static async updateDescription(username, description) {
    return db.run(`UPDATE users 
        SET ${db.columnNames.description} = '${description}' 
        WHERE ${db.columnNames.username} = '${username}'`)
        .then( () => {
          return Users.findByUsername(username);
        });
  }


   /**
   * Get all links for a User
   * @param {string} user_id - user_id
   */
  static async getLinks(user_id) {
    return db.all(`SELECT * from userLinks 
    WHERE ${db.columnNames.user_id} = '${user_id}'`)
  }

  /**
   * Add a link for Users
   * @param {string} name - link name
   * @param {string} link -  link
   */
  static async addLink(user_id, name, link) {
    return db.run(`INSERT INTO userLinks 
    (${db.columnNames.user_id},${db.columnNames.name}, ${db.columnNames.link}) 
    VALUES ('${user_id}','${name}', '${link}')`)
  }

  /**
   * Remove a link for Users
   * @param {string} name - link name
   * @param {string} link - link
   */
  static async removeLink(user_id, name, link) {
    return db.run(`DELETE FROM userLinks WHERE
    ${db.columnNames.user_id} = '${user_id}' AND
    ${db.columnNames.name} = '${name}' AND
    ${db.columnNames.link} = '${link}'`)
  }

  /**
   * Get all vaccines for a User
   * @param {string} user_id - user_id
   */
  static async getVaccines(user_id) {
    return db.all(`SELECT * from vaccineHistory 
    WHERE ${db.columnNames.user_id} = '${user_id}'`)
  }

  /**
   * Add a vaccine for Users
   * @param {string} vaccine - vaccine name
   * @param {string} date - vaccine date
   */
  static async addVaccine(user_id, vaccine, date) {
    return db.run(`INSERT INTO vaccineHistory 
    (${db.columnNames.userID},${db.columnNames.vaccine}, ${db.columnNames.date}) 
    VALUES ('${user_id}','${vaccine}', '${date}')`)
  }

  /**
   * Remove a vaccine for Users
   * @param {string} vaccine - vaccine name
   * @param {string} date - vaccine date
   */
  static async removeVaccine(user_id, vaccine, date) {
    return db.run(`DELETE FROM vaccineHistory WHERE
    ${db.columnNames.userID} = '${user_id}' AND
    ${db.columnNames.vaccine} = '${vaccine}' AND
    ${db.columnNames.date} = '${date}'`)
  }

  

  /**
   * Get all payments for a User
   * @param {string} user_id - user_id
   */
  static async getPayments(user_id) {
    return db.all(`SELECT * from paymentHistory 
    WHERE ${db.columnNames.userID} = '${user_id}'`)
  }

  /**
   * Add a payment for Users
   * @param {string} payment - payment
   */
  static async addPayment(user_id, payment) {
    return db.run(`INSERT INTO paymentHistory 
    (${db.columnNames.userID},${db.columnNames.payment}) 
    VALUES ('${user_id}','${payment}')`)
  }

  /**
   * Remove a payment for Users
   * @param {string} payment - payment
   */
  static async removePayment(user_id, payment) {
    console.log(user_id, payment)
    return db.run(`DELETE FROM paymentHistory WHERE
    ${db.columnNames.userID} = '${user_id}' AND
    ${db.columnNames.payment} = '${payment}'`)
  }

  /**
   * Add like for post
   * @param {string} note_id
   * @param {string} user_id
   */
  static async addLike(note_id, user_id) {
    return db.run(`INSERT INTO noteLikes 
    (${db.columnNames.note_id},${db.columnNames.userID}) 
    VALUES ('${note_id}','${user_id}')`)
  }

  /**
   * Remove like for post
   * @param {string} note_id
   * @param {string} user_id
   */
  static async removeLike(note_id, user_id) {
    return db.run(`DELETE FROM noteLikes 
    WHERE ${db.columnNames.note_id} = '${note_id}' AND
    ${db.columnNames.userID} = '${user_id}'`)
  }
  
}



module.exports = Users;
