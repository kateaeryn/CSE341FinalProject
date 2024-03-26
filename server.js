const express = require('express');
const app = express();

const port = 3000

app.get('/', (req, res) => {
  res.send(`Hello, this is the starter file for the cse341 team 4 final project.`);
})
app.listen(process.env.port || port);
console.log(`I'm listening on port` + (process.env.port || port));