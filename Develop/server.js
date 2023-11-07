const express = require('express');
const path = require('path');
const { clog } = require('./middware/clog')
const api = require('')

const PORT = process.env.port || 3001;

const app = express();

app.use(clog);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('api', api);

app.use(express.static('public'));

app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/*', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/404.html'))
);

app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.listen(PORT, () => 
    console.log(`App listening at https://localhost:${PORT}`)
);