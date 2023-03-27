const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');
const luxon = require('luxon');
const dateTime = luxon.DateTime;


// GET
router.get('/', (req, res) => {
    console.log('GET Request made for /tasks');
    const sqlText = `SELECT * FROM "tasks" ORDER BY id DESC;`;
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
    console.log('POST Request made for /tasks');
    const taskToAdd = req.body;
    const sqlText = `INSERT INTO "tasks" ("task_name", "start_date", "end_date", "priority", "assigned_user", "finished_date", "completed")
                     VALUES ($1, $2, $3, $4, $5, $6, $7)`;
    pool.query(sqlText, [taskToAdd.task_name, transformDate(taskToAdd.start_date), transformDate(taskToAdd.end_date), taskToAdd.priority, taskToAdd.assigned_user, transformDate(taskToAdd.finished_date), taskToAdd.completed])
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
    let taskToUpdate = req.body;
    let values = [taskToUpdate.completed, taskId];
    let sqlText = `UPDATE "tasks" SET "completed" = $1 WHERE "id" = $2;`;
    pool.query(sqlText, values)
        .then((result) => {
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log(`Error in PUT ${error}`);
            res.sendStatus(500)
        });
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

function transformDate(date) {
    let time = dateTime.fromISO(date);
    let year = `${time.year}`;
    let slice = year.slice(2);
    return `${time.month}/${time.day}/${slice}`;
}


module.exports = router;
