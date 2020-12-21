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
   * Toggle show for user
   * @param {string} user_id
   */
  static async toggleShow(user_id) {
    return db.run(`UPDATE users SET ${db.columnNames.show} = NOT ${db.columnNames.show}
    WHERE ${db.columnNames.user_id} = '${user_id}'`).then(() => Users.findByID(user_id))
  }
  
}



module.exports = Users;
