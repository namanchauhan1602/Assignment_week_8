import express from "express";
import multer from "multer";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", "./views");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `./uploads`);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

app.get("/", (req, res) => {
  return res.render("main");
});

app.post("/upload", upload.single('profileImage'), (req, res) => {
    console.log(req.file);
    console.log(req.body);
    return res.redirect('/')
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
