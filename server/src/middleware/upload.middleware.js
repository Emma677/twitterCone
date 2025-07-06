// multer is a middleware for handling multipart/form-data, which is primarily used for file uploads

import multer from 'multer'

const storage = multer.memoryStorage()

const fileFilter = (req,file,cb)=>{
    if(file.mimetype.startWidth("image/")){
        cb(null, true);
    } else{
        cb(new Error("Only image files are allowed"))
    }
}


const upload = multer({
    storage:storage,
    fileFilter:fileFilter,
    limits:{fileSize: 5 * 1024*1024} //5mb
})

export default upload;