const express = require("express");
const router = express.Router();

const Picture = require("../models/pictures");

// FOR FILEUPLOADS
const multer = require("multer");

/* GET home page. */
router.get("/", function(req, res, next) {
  Picture.find({}, (err, picture) => {
    if (err) {
      next(err);
    } else {
      const data = {
        pictures: picture
      };
      res.render("index", data);
    }
  });
});

// Route to upload from project base path
const upload = multer({ dest: "./public/uploads/" });

router.post("/upload", upload.single("photo"), (req, res, next) => {
  const pic = new Picture({
    name: req.body.name,
    pic_path: `/uploads/${req.file.filename}`,
    pic_name: req.file.originalname
  });

  pic.save(err => {
    if (err) {
      next(err);
    } else {
      res.redirect("/");
    }
  });
});

module.exports = router;
