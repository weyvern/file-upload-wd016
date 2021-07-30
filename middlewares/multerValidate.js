const multerValidate = (req, res, next) => {
  const { url, file, files, fileValidationError } = req;
  if (url === '/upload-profile-pic') {
    if (!file) return res.render('error', { error: 'Please upload one picture' });
  }
  if (url === '/upload-cat-pics') {
    if (!files || !files.length)
      return res.render('error', { error: 'Please upload some pictures' });
  }
  if (fileValidationError) return res.render('error', { error: fileValidationError });
  next();
};

export default multerValidate;
