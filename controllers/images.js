import pgPool from '../db/pgPool.js';

export const getImages = async (req, res) => {
  const { rowCount: total, rows: images } = await pgPool.query('SELECT * FROM images;');
  res.status(200).json({ total, images });
};

export const renderSingle = (req, res) => {
  const {
    insertedPic: { path, name }
  } = req;
  res.render('singlePic', { path, name });
};

export const renderMulti = (req, res) => {
  const { insertedPics } = req;
  res.render('multiPic', { insertedPics });
};
