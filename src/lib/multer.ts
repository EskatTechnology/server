import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: 'public/uploads',
    filename: (req, file, cb) =>{
        cb(null, new Date().getTime() + path.extname(file.originalname));
    }
});

export default multer({storage});