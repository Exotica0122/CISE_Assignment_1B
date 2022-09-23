const express = require("express");
const router = express.Router();

const articleController = require("../controller/articleController");

router.get("/", articleController.getAllArticles);
router.get("/:id", articleController.getArticleById);

router.post("/", articleController.postArticle);

router.put("/:id", articleController.editArticleById);

router.delete("/:id", articleController.deleteArticleById);

module.exports = router;
