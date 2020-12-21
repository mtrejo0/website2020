const express = require('express');


// ------------------------------ AUTH

const ensureUserNotLoggedIn = function(req, res, next) {
  if (req.session.username) {
    res.status(400).json({ error: "You are signed in!" }).end();
    return;
  }
  next();
};

const ensureUserLoggedIn = function(req, res, next) {
  if (!req.session.username) {
    res.status(401).json({ error: "Must be signed in!" }).end();
    return;
  }
  next();
};

// ------------------------------ BODY

const ensureValidUsernameInBody = function(req, res, next) {
  if (!req.body.username) {
    res.status(400).json({ error: "You must specify a valid username!" }).end();
    return;
  }
  next();
};

const ensureNotAdmin = function(req, res, next) {
  if (req.body.username == 'admin') {
    res.status(400).json({ error: "You must specify a valid username!" }).end();
    return;
  }
  next();
};

const ensureValidPasswordInBody = function(req, res, next) {
  if (!req.body.password) {
    res.status(400).json({ error: "You must specify a valid password!" }).end();
    return;
  }
  next();
};

const ensureValidPaymentInBody = function(req, res, next) {
  if (!req.body.payment) {
    res.status(400).json({ error: "You must specify a valid payment!" }).end();
    return;
  }
  next();
};

const ensureValidVaccineInBody = function(req, res, next) {
  if (!req.body.vaccine) {
    res.status(400).json({ error: "You must specify a valid vaccine!" }).end();
    return;
  }
  next();
};


const ensureValidLinkInBody = function(req, res, next) {
  if (!req.body.link) {
    res.status(400).json({ error: "Empty Link!" }).end();
    return;
  }
  if (!/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/.test(req.body.link)) {
    res.status(400).json({ error: "Invalid link format!" }).end();
    return;
  }
  next();
};

const ensureValidNameInBody = function(req, res, next) {
  if (!req.body.name) {
    res.status(400).json({ error: "Invalid name format!" }).end();
    return;
  }
  next();
};

const ensureValidNote = function(req, res, next) {
  if (!req.body.note) {
    res.status(400).json({ error: "Invalid note!" }).end();
    return;
  }
  next();
};



module.exports = {
  ensureUserNotLoggedIn,
  ensureUserLoggedIn,
  ensureValidUsernameInBody,
  ensureValidPasswordInBody,
  ensureValidPaymentInBody,
  ensureValidVaccineInBody,
  ensureValidLinkInBody,
  ensureValidNameInBody,
  ensureValidNote,
  ensureNotAdmin
};