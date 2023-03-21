const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// GET
router.get('/', (req, res) => {
    console.log('GET Request made for /tasks');
    const sqlText = `SELECT * FROM "tasks";`;
    pool.query(sqlText)
    .then((result) => {
        console.log(`Got stuff back from the database`, result);
        res.send(result.rows); 
    })
    .catch((error) => {
        console.log(`Error making the database query ${sqlText}`, error);
        res.sendStatus(500); 
    })
});


// POST

// PUT

// DELETE

module.exports = router;
