import pgPool from '../db/pgPool.js';

const insertIntoDatabase = async (req, res, next) => {
  const uploadPic = async ({ filename }) => {
    const {
      rows: [insertedPic]
    } = await pgPool.query('INSERT INTO images(name, path) VALUES ($1, $2) RETURNING *', [
      filename,
      '/uploads'
    ]);
    return insertedPic;
  };

  const { url, file, files } = req;

  if (url === '/upload-profile-pic') {
    const insertedPic = await uploadPic(file);
    req.insertedPic = insertedPic;
    next();
  }

  if (url === '/upload-cat-pics') {
    const insertedPics = files.map(file => uploadPic(file));
    req.insertedPics = await Promise.all(insertedPics);
    next();
  }
};

export default insertIntoDatabase;
