const express = require('express');

const Users = require('../models/Users');
const Notes = require('../models/Notes');
const v = require('./validators');

const router = express.Router();

/**
 * Get all users.
 * 
 * @name GET /api/users
 */
router.get(
  '/', 
  [],
  async (req, res) => {
  try {
    // fetch all user from the DB
    let full = []
    let users = await Users.findAll();
    for( let i = 0 ; i < users.length ; i ++) {
      
      let links = await Users.getLinks(users[i].user_id)
      let fullUser = {...users[i], links}
      full.push(fullUser)
    }
    res.status(200).json(full).end();

  } catch (error) {
    console.log(error)
    res.status(404).json({ error: "Could not fetch users" }).end();
  }
});

/**
 * Get users
 * 
 * @name GET /api/users
 */
router.get(
  '/id/:id', 
  [],
  async (req, res) => {
  try {
    let user = await Users.findByID(req.params.id);
    let links = await Users.getLinks(user.user_id)
    res.status(200).json({...user, links}).end();
  } catch (error) {
    res.status(503).json({ error: "Could not fetch users" }).end();
  }
});

/**
 * Delete user by id
 * 
 * @name DELETE/api/users
 */
router.delete(
  '/:username', 
  [],
  async (req, res) => {
  try {
    await Users.deleteOne(req.params.username);
    req.session.user_id = undefined;
    req.session.username = undefined;
    res.status(200).json({message: "User removed!"}).end();
  } catch (error) {
    res.status(503).json({ error: "Could not remove user" }).end();
  }
});

/**
 * Get current user
 * 
 * @name GET/api/users/me
 */
router.get(
  '/me', 
  [],
  async (req, res) => {
  try {
    let user = await Users.findByID(req.session.user_id);
    let links = await Users.getLinks(req.session.user_id)
    res.status(200).json({...user, links}).end();
  } catch (error) {
    console.log(error)
    res.status(503).json({ error: "Could not fetch user" }).end();
  }
});

/**
 * Create new user.
 * 
 * @name POST /api/users
 */
router.post(
  '/',
  [
    v.ensureValidUsernameInBody,
    v.ensureValidPasswordInBody,
    v.ensureNotAdmin
  ],
  async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    // issue a call to the DB to create a new user with the given username
    let user = await Users.addOne(username, password);
    res.status(201).json({ user, message: "Please sign in to continue." }).end();
    
  } catch (error) {
    res.status(400).json({ error: "Username must be unique and non-empty" }).end();
  }
});

/**
 * Update the username for logged in user
 * 
 * @name PUT/api/users/username
 * @param {string} username 
 */
router.put(
  '/username',
  [
    v.ensureUserLoggedIn,
    v.ensureValidUsernameInBody,
    v.ensureNotAdmin
  ],
  async (req, res) => {
  try {

    const username = req.body.username;
    if (req.session.username === username) {
      res.status(400).json({ error: `Username is already (${username})`}).end();
      return;
    }

    let existingUser = await Users.findByUsername(username);
    if (existingUser) {
      res.status(400).json({ error: `There is already a user with the username (${username})`}).end();
    }
    
    let user = await Users.updateUsername(req.session.username, username)
    if (user) {
      req.session.username = username;
      res.status(200).json({ message: `Username changed to (${username})`}).end();
    }
  } catch (error) {
      res.status(503).json({ error: `Could not change the username!` }).end();
  }
});

/**
 * Update the password for logged in user
 * @name PUT/api/users/password
 * @param {string} password 
 */
router.put(
  '/password',
  [
    v.ensureUserLoggedIn,
    v.ensureValidPasswordInBody,
  ],
  async (req, res) => {
  try {
    let user = await Users.updatePassword(req.session.username, req.body.password);
    if (user) {
      res.status(200).json({message: `Password succesfully changed!`}).end();
    }
  } catch (error) {
    res.status(503).json({ error: `Could not change your password` }).end();
    return;
  }
});

/**
 * Update the description for logged in user
 * @name PUT/api/users/description
 * @param {string} description 
 */
router.put(
  '/description',
  [
    v.ensureUserLoggedIn,
  ],
  async (req, res) => {
  try {
    let user = await Users.updateDescription(req.session.username, req.body.description);
    if (user) {
      res.status(200).json({message: `Description succesfully changed!`}).end();
    }
  } catch (error) {
    res.status(503).json({ error: `Could not change your description` }).end();
    return;
  }
});



/**
 * Get links for a user
 * @name GET/api/users/link
 */
router.get(
  '/link',
  [
    v.ensureUserLoggedIn
  ],
  async (req, res) => {
  try {
    let links = await Users.getLinks(req.session.user_id);
    res.status(200).json({links}).end();
    
  } catch (error) {
    res.status(503).json({ error: `Couldnt get links` }).end();
    return;
  }
});


/**
 * Add link for a user
 * @name POST/api/users/link
 * @param {string} link 
 */
router.post(
  '/link',
  [
    v.ensureUserLoggedIn,
    v.ensureValidLinkInBody,
    v.ensureValidNameInBody
  ],
  async (req, res) => {
  try {
    await Users.addLink(req.session.user_id, req.body.name, req.body.link);

    res.status(200).json({message: `New link was saved!`}).end();
    
  } catch (error) {
    console.log(error)
    res.status(503).json({ error: `Could not add link` }).end();
    return;
  }
});

/**
 * Remove payment for a user
 * @name POST/api/users/link-delete
 * @param {string} payment 
 */
router.post(
  '/link-delete',
  [
    v.ensureUserLoggedIn
  ],
  async (req, res) => {
  try {
    console.log(req.body)
    await Users.removeLink(req.session.user_id, req.body.name, req.body.link);

    res.status(200).json({message: `Link was removed!`}).end();
    
  } catch (error) {
    res.status(503).json({ error: `Could not remove Link` }).end();
    return;
  }
});


/**
 * Get payments for a user
 * @name GET/api/users/payment
 */
router.get(
  '/payment',
  [
    v.ensureUserLoggedIn
  ],
  async (req, res) => {
  try {
    console.log('yerr')

    let links = await Users.getLinks(req.session.user_id);
    res.status(200).json({links}).end();
    
  } catch (error) {
    res.status(503).json({ error: `Could not get links` }).end();
    return;
  }
});



/**
 * Add payment for a user
 * @name POST/api/users/payment
 * @param {string} payment 
 */
router.post(
  '/payment',
  [
    v.ensureUserLoggedIn,
    v.ensureValidPaymentInBody
  ],
  async (req, res) => {
  try {

    await Users.addPayment(req.session.user_id, req.body.payment);

    res.status(200).json({message: `New payment was saved!`}).end();
    
  } catch (error) {
    res.status(503).json({ error: `Could not add payment` }).end();
    return;
  }
});

/**
 * Remove payment for a user
 * @name POST/api/users/payment/delete
 * @param {string} payment 
 */
router.post(
  '/payment-delete',
  [
    v.ensureUserLoggedIn
  ],
  async (req, res) => {
  try {
    await Users.removePayment(req.session.user_id, req.body.payment);

    res.status(200).json({message: `New payment was removed!`}).end();
    
  } catch (error) {
    res.status(503).json({ error: `Could not remove payment` }).end();
    return;
  }
});

/**
 * Add like for post
 * @name POST/api/users/payment
 * @param {string} id - id of post 
 */
router.post(
  '/like/:id',
  [
    v.ensureUserLoggedIn,
  ],
  async (req, res) => {
  try {

    await Users.addLike(req.params.id, req.session.user_id);

    res.status(201).json({message: `Liked was saved!`}).end();
    
  } catch (error) {
    res.status(503).json({ error: `Failed to like` }).end();
    return;
  }
});


/**
 * Remove like for post
 * @name DELETE/api/users/payment
 * @param {string} id - id of post 
 */
router.delete(
  '/like/:id',
  [
    v.ensureUserLoggedIn,
  ],
  async (req, res) => {
  try {

    await Users.removeLike(req.params.id, req.session.user_id);
    res.status(200).json({message: `Liked was removed!`}).end();
    
  } catch (error) {
    res.status(503).json({ error: `Failed to unlike` }).end();
    return;
  }
});

module.exports = router;
