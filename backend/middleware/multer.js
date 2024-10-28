import multer from 'multer'

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, 'backend/uploads/')
    },
    filename: function(req,file,cb){
        cb(null, file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('Unsupported file type'), false);
    }
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, 
    fileFilter: fileFilter
});

export default upload;