const express = require('express');
const app = express();
const tasksRouter = require('./routes/tasks.router.js');
const PORT = process.env.PORT || 5017;

/** ---------- MIDDLEWARE ---------- **/
app.use(express.json()); // needed for axios requests
app.use(express.static('build'));

/** ---------- EXPRESS ROUTES ---------- **/
app.use('/tasks', tasksRouter);

/** ---------- START SERVER ---------- **/
app.listen(PORT,  () => {
    console.log('Listening on port: ', PORT);
});