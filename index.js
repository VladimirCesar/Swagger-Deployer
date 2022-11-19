require('dotenv').config();
const env = process.env;

const path = require('path');
const cors = require('cors');
const express = require('express');
const app = express();
const port = 3001;



app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'));
});
app.get('/apilist', (req, res) => {
    const fs = require('fs');
    const dir = './Defs';
    const files = fs.readdirSync(dir);
    const yaml = require('js-yaml');
    const items = [];
    files.forEach(file => {
        const fileNameWithoutExtension = FileNameWithoutExtension(file);
        const doc = yaml.load(fs.readFileSync(dir + '/'
            + file, 'utf8'));
            items.push({id: fileNameWithoutExtension,name: doc.info.title});
    });
    res.send(items);
});
app.post('/addyaml', (req, res) => {
    createFile(req.body.fileName, req.body.data);
    InitYAMLFiles();
    res.send(200);
});

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
    InitYAMLFiles();
});


function InitYAMLFiles() {
    const fs = require('fs');
    const dir = './Defs';
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const fileNameWithoutExtension = FileNameWithoutExtension(file);
        app.get(`/${fileNameWithoutExtension}`, (req, res) => {
            res.sendFile(path.join(__dirname, `./Defs/${file}`));
            console.log(fileNameWithoutExtension);
        });
    });
}

function createFile(fileName, data) {
    const fileNameWithoutExtension = FileNameWithoutExtension(fileName);
    const fs = require('fs');
    fs.writeFile(`./Defs/${fileNameWithoutExtension}.yaml`, data, (err) => {
        if (err) console.log(err);
        console.log('Saved!');
    });
}

/* Служебные */

function FileNameWithoutExtension(fileName) {
    return fileName.split('.')[0];
}
