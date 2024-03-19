const path = require('path');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb)=> {
        cb(null, './uploads')
    },
    filename: (req, file, cb)=> {
        cb(null, `${file.fieldname}_${Date.now()}${ path.extname(file.originalname)}`)
    }
});

const upload = multer({
    storage: storage,
    limits: {fileSize: 5000000}
}).single('pics');

exports.uploadPic = async(req, res)=> {
    upload(req, res, (err)=> {
        if(err) {
            console.log(err.message)
            return res.status(400).json({error: 'File is too large, max limit of 5MB'})
        }
        console.log(req.file)
        res.status(201).json({message: 'Successfully Uploaded'})
    })
}
