import multer from "multer";

const storage = multer.memoryStorage()

const upload = multer({
    storage: storage , 
    limits :{
        fileSize: 20 * 1024 * 1024, // 20MB
    },
});

export const cpUpload = upload.fields([
    {name : 'audio' , maxCount : 1},
    {name : 'image' , maxCount : 1}
])