const express = require("express");
const router = express.Router();
const Content = require("../models/content");

router.get("/", async (req, res, next) => {
  const contents = await Content.findAll({});
  res.render("main", {
    title: "Happy",
    contents,
  });
});

router.get(`/contents/write`, async (req, res) => {
  res.render("content", { title: "글쓰기" });
});

router.get(`/contents/write`, (req, res) => {
  res.redirect("/");
});

router.patch(`/contents/:id`, (req, res) => {
  Content.update(
    {
      ttl: req.params.ttl,
      cont: req.params.cont,
    },
    {
      ttl: req.params.new,
      cont: req.params.new,
    },
    (err, result) => {
      if (err) {
        return console.error(err);
      }
    }
  );
});

module.exports = router;
