const db = require('../db/db_config');

/**
 * @typeof Note
 * 
 * @prop {string} note - note text
 * @prop {string} tags - tags associated with this note

/**
 * @class Notes
 * 
 * Stores all Notes.
 * Note that all methods are static.
 * Wherever you import this class, you will be accessing the same data.
 */
class Notes {

  /**
   * Get Likes for this note
   * @param {string} note_id 
   */
  static async getLikes(note_id) {
    return db.all(`SELECT * from noteLikes 
        WHERE ${db.columnNames.note_id} = '${note_id}'`);
  }
  
}

module.exports = Notes;
