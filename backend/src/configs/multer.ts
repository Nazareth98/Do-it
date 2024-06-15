import multer from "multer";
import fs from "fs";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "uploads/";
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const originalName = file.originalname;
    const uniqueSuffix = Date.now() + "-" + originalName;
    const fileName = `${uniqueSuffix}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

export default upload;
