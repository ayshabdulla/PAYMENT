const multer = require("multer");
const path = require("path");

//set where and how the file should be stored 
const storage = multer.diskStorage({
    //Folder where flies will be saved
    destination: "uploads/",

    //Rename the file with a unique timestamp + original extension
    filename: (req, file, cb) => {
        //cb = callback function provided by Multer
        //cb(error,newFileName)
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

//Multer setup with storage + file type checking
const upload = multer({
    storage,
    //Allow only image files
    fileFilter: (req, file, cb) => {
        const allowed = ["image/jpeg","image/png","image/jpg","image/webp"];

        //allowed.includes() returns true if image type is valid 
        //cb(null,true) -> accept files
        //cb(new Error(...),false) -> reject file
        allowed.includes(file.mimetype)
        ? cb(null, true)
        : cb(new Error("Only image files allowed"), false);
    }
});

module.exports = upload;