import { resolve, extname } from 'path';
import multer, { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';

const uploadFolder = resolve('public', 'uploads');
console.log(uploadFolder);

const storage = diskStorage({
  destination: (req, file, cb) => cb(null, uploadFolder),
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${uuidv4()}${extname(file.originalname)}` // will give something like: profile_pic-00000000-0000-0000-0000-000000000000.png
    );
  }
});

const isPicture = ({ mimetype }) => {
  const allowedMimeTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];
  return allowedMimeTypes.includes(mimetype);
};

const fileFilter = (req, file, cb) => {
  if (!isPicture(file)) {
    req.fileValidationError = 'Only images please';
    cb(null, false);
  }
  cb(null, true);
};

const upload = multer({ storage, fileFilter });

export default upload;
