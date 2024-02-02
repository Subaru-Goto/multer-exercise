import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads");
  },

  filename: (req, file, cb) => {
    const fileExt = file.originalname.split(".")[1];
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + fileExt);
  }
})

const fileFilter = (req, file, cb) => {
  const re = "\.(jpg|jpeg|png|gif|svg)$"
  const fileName = file.mimetype;
  const matchedFormat = fileName.match(re);
  if(!matchedFormat) {
    cb(new Error("file format not accepted Please upload jpg|jpeg|png|gif|svg."), false);
  } else {
    cb(null, true);
  }
};

export const upload = multer({storage, fileFilter });



