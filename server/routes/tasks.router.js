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
router.post('/', (req, res) => {
    const taskToAdd = req.body;
    const sqlText = `INSERT INTO "tasks" ("task", "completed")
                    VALUES ($1, $2)`;
    pool.query(sqlText, [taskToAdd.task, taskToAdd.completed])
    .then((result) => {
        res.sendStatus(201);
    })
    .catch((error) => {
        console.log(`Error making database query ${sqlText}`, error);
        res.sendStatus(500);
    })
});


// PUT
router.put('/:id', (req, res) => {
    console.log(`In PUT Request /task`);
    let taskId = req.params.id;
    let taskToEdit = req.body;
    let sqlText = 'UPDATE "tasks" SET '
})
// DELETE
router.delete('/:id', (req, res) => {
    console.log(req.params.id);
    const deleteIndex = Number(req.params.id);
    let sqlText = `DELETE FROM "tasks" WHERE "id" = $1`;
    pool.query(sqlText, [deleteIndex])
    .then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log(`Error in DELETE ${error}`);
        res.sendStatus(500);
    })
})
module.exports = router;
