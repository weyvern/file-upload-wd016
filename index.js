import express from 'express';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';

const app = express();
const port = process.env.PORT || 5000;
const upload = multer({ dest: './public/uploads/' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.set('view engine', 'ejs');
app.use(express.static(join(__dirname, 'public')));

app.get('/', (req, res) => res.render('index'));
app.get('/single-form', (req, res) => res.render('singleForm'));
app.get('/multi-form', (req, res) => res.render('multiForm'));

app.post('/upload-profile-pic', upload.single('profile_pic'), (req, res) => {
  const {
    file: { path, filename }
  } = req;
  res.render('singlePic', { path, filename });
});

app.post('/upload-cat-pics', upload.array('cat_pics'), (req, res) => {
  const { files } = req;
  res.render('multiPic', { files });
});

app.listen(port, console.log(`Server running on port ${port}`));
