import 'dotenv/config.js';
import express from 'express';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import upload from './utils/imageUpload.js';
import multerValidate from './middlewares/multerValidate.js';
import insertIntoDatabase from './middlewares/insertIntoDatabase.js';
import { getImages, renderMulti, renderSingle } from './controllers/images.js';

const app = express();
const port = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.set('view engine', 'ejs');
app.use(express.static(join(__dirname, 'public')));

app.get('/', (req, res) => res.render('index'));
app.get('/single-form', (req, res) => res.render('singleForm'));
app.get('/multi-form', (req, res) => res.render('multiForm'));

app.get('/images', getImages);

app.post(
  '/upload-profile-pic',
  upload.single('profile_pic'),
  multerValidate,
  insertIntoDatabase,
  renderSingle
);

app.post(
  '/upload-cat-pics',
  upload.array('cat_pics'),
  multerValidate,
  insertIntoDatabase,
  renderMulti
);

app.listen(port, console.log(`Server running on port ${port}`));
