const multer = require('multer');


const fileUpload = (req, res, next) => {
    const storage = multer.diskStorage({
        destination : (req, file, cb) => {
            cb(null, 'public/img')
        },
        filename : (req, file, cb) => {
            const prefix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            cb(null, prefix + '-' +  file.originalname);
        }
    });

    const fileFilter = (req, file, cb) => {
        if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
            cb(null, true);
        }else {
            cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE'));
        }
    };

    const upload = multer({
        storage: storage,
        limits : {
            fileSize : 1000000
        },
        fileFilter : fileFilter 
    });
    
    upload.single('image')(req,res, function(err) {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({message: "Please use jpg/png file with Max Size 500 KB", error: err.name });
        }

        if (!req.file) {
            return res.status(400).json({message: "No file selected" });
        }
        next();
    });
} 

module.exports = {
    fileUpload
}