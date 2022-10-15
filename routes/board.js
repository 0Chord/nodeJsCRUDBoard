const express = require("express");
const router = express.Router();
const Content = require("../models/content");

router.post("/write", async (req, res) => {
  const { nickname, title, content } = req.body;
  Content.create({
    nickname,
    title,
    content,
  })
    .then(() => res.status(201).send("Success"))
    .catch((err) => res.status(500).send("Fail"));
});

router.get(`/:id`, async (req, res) => {
  const content = await Content.findOne({
    where: { id: req.params.id },
  });
  res.render("viewing", {
    title: "정보",
    content,
  });
});

router.delete(`/:id`, async (req, res) => {
  try {
    Content.destroy({
      where: { id: req.params.id },
    })
      .then(() => res.status(200).send("success"))
      .catch((err) => res.status(404).send("no id"));
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Error");
  }
});

router.get(`/:id/edit`, async (req, res) => {
  const content = await Content.findOne({
    where: { id: req.params.id },
  });
  res.render("modifying", {
    title: "수정",
    content,
  });
});

router.get(`/:id/edit`, (req, res) => {
  res.redirect("/");
});

router.patch(`/:id/edit`, async (req, res) => {
  try {
    const { title, content } = req.body;
    Content.update(
      {
        title,
        content,
      },
      {
        where: { id: req.params.id },
      }
    )
      .then(() => res.status(200).send("success"))
      .catch((err) => res.status(404).send("no id"));
  } catch (err) {
    console.error(err);
    res.status(500).send("internal error");
  }
});

module.exports = router;
