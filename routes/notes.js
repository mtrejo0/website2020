const express = require('express');

const Notes = require('../models/Notes');

const v = require('./validators');

const router = express.Router();

/**
 * Get likes for a note
 * @name GET/api/notes/likes
 * @param {string} id - id of post 
 */
router.get(
    '/:id',
    [],
    async (req, res) => {
    try {
        
      let likes = await Notes.getLikes(req.params.id);
      res.status(200).json({count: likes}).end();
      
    } catch (error) {
      res.status(503).json({ error: `Error getting Likes` }).end();
      return;
    }
  });