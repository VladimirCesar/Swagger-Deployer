require('dotenv').config();
const env = process.env;

const fs = require('fs');
const yaml = require('js-yaml');
const HTMLPattern = require('./HTMLPattern');
const path = require('path');
const cors = require('cors');
const express = require('express');
const multer  = require('multer');
const app = express();
const port = 3001;



app.use(cors());
app.use(express.json());
// app.use();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'));
    InitYAMLFiles();
});
app.get('/apilist', (req, res) => {
    const dir = './Defs';
    const files = fs.readdirSync(dir);
    const items = [];
    files.forEach(file => {
        const fileNameWithoutExtension = FileNameWithoutExtension(file);
        // const doc = yaml.load(fs.readFileSync(dir + '/' + file, 'utf8'));
        const doc = YAMLDoc(dir + '/' + file);
        items.push({ id: fileNameWithoutExtension, name: doc.info.title });
    });
    res.send(items);
});
app.post('/addyaml', multer().single('file'), (req, res, next) => {
    const file = req.file;
    // get file extension
    file.originalname = translit(decode_utf8(file.originalname));
    const fileExtensionIndex = file.originalname.lastIndexOf('.');
    if(fileExtensionIndex === -1) {
        res.status(400).send('Ошибка: файл не имеет расширения');
        return;
    }
    const fileExtension = file.originalname.substring(fileExtensionIndex);
    if(fileExtension !== '.yaml')
    {
        res.status(400).send('Ошибка: файл не имеет расширения .yaml');
        return;
    }
    if (!file) {
        res.status(400).send('No file uploaded');
    } else {
        createFile(file.originalname, file.buffer.toString());
        res.status(200).send('File uploaded');
    }
});

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});


function InitYAMLFiles() {
    const fs = require('fs');
    const dir = './Defs';
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const title = YAMLDoc(dir + '/' + file)?.info?.title ?? '<Ошибка чтения заголовка>';
        const fileNameWithoutExtension = FileNameWithoutExtension(file);
        app.get(`/${fileNameWithoutExtension}`, (req, res) => {
            res.send(HTMLPattern(`http://localhost:${port}/${fileNameWithoutExtension}/yaml`, title));
        });
        app.get(`/${fileNameWithoutExtension}/yaml`, (req, res) => {
            res.sendFile(path.join(__dirname, `./Defs/${file}`));
        });
    });
}

function createFile(fileName, data) {
    const fileNameWithoutExtension = FileNameWithoutExtension(fileName);
    fs.writeFile(`./Defs/${fileNameWithoutExtension}.yaml`, data, (err) => {
        if (err) console.log(err);
        console.log(`Saved file ${fileName}`);
    });
}

/* Служебные */

function FileNameWithoutExtension(fileName) {
    return fileName.split('.')[0];
}

function YAMLDoc(path) {
    return yaml.load(fs.readFileSync(path, 'utf8'));
}

function decode_utf8(s) {
    return decodeURIComponent(escape(s));
}

function translit(str) {
    let transl = {
        'а': 'a',
        'б': 'b',
        'в': 'v',
        'г': 'g',
        'д': 'd',
        'е': 'e',
        'ё': 'e',
        'ж': 'zh',
        'з': 'z',
        'и': 'i',
        'й': 'y',
        'к': 'k',
        'л': 'l',
        'м': 'm',
        'н': 'n',
        'о': 'o',
        'п': 'p',
        'р': 'r',
        'с': 's',
        'т': 't',
        'у': 'u',
        'ф': 'f',
        'х': 'h',
        'ц': 'c',
        'ч': 'ch',
        'ш': 'sh',
        'щ': 'shch',
        'ъ': '',
        'ы': 'y',
        'ь': '',
        'э': 'e',
        'ю': 'yu',
        'я': 'ya',
    };
    let result = '';
    str = str.toLowerCase();
    for(var i = 0; i < str.length; i++) {
        if(transl[str[i]] != undefined) {
            result += transl[str[i]];
        } else {
            result += str[i];
        }
    }
    return result;
}