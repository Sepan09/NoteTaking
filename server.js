const express = require('express');
const fs = require('fs');
const path = require('path');
const { clog } = require('./middleware/clog');
const { v4: uuid } = require('uuid');

const PORT = process.env.port || 3001;

const app = express();

app.use(clog);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));



app.get('/api/notes', (req,res) => {
    console.log('hit')
    const notesDb = fs.readFileSync('./db/db.json', 'utf-8');
    // console.log(notesDb);
    res.json(JSON.parse(notesDb));
}
);

app.post('/api/notes', (req,res) => {
    const { title, text } = req.body;

    console.log('hit')

    if (title && text) {
        const newPost = {
            title,
            text,
            id: uuid()
        };

        console.log(newPost)

        const notesDb = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));

        notesDb.push(newPost);

        fs.writeFileSync('./db/db.json', JSON.stringify(notesDb));


        res.status(200).json(newPost);
    } else {
        res.status(500).json('Err')
    }
});

app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('*', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () => 
    console.log(`App listening at http://localhost:${PORT}`)
);