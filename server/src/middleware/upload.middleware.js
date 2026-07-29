import multer from "multer";
import path from "path";
import fs from "fs";

const uploadPath = "src/uploads/leave-documents";

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadPath);
  },

  filename(req, file, cb) {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(null, uniqueName + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = ["application/pdf", "image/png", "image/jpeg", "image/jpg"];

  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF and Images are allowed"));
  }
};

export default multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});
