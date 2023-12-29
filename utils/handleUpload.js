import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${__dirname}/../storage`);
  },
  filename: function (req, file, cb) {
    const suffix = file.originalname.split(".").pop();
    cb(null, `file-${Date.now()}.${suffix}`);
  },
});

const uploadMiddleware = multer({ storage });

export { uploadMiddleware };
