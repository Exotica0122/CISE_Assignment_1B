const express = require("express");
const router = express.Router();

const articleController = require("../controller/articleController");

router.get("/", articleController.getAllArticles);
router.get("/:id", articleController.getArticleById);

router.post("/", articleController.postArticle);

router.put("/:id", articleController.editArticleById);

router.delete("/:id", articleController.deleteArticleById);

module.exports = router;

//moderator stuff
const articles = require('../models/articles');
router.post('/update/:id', (req, res) => {
    articles.findByIdAndUpdate(req.params.id, req.body)
        .then(articles => res.json({ msg: 'Updated successfully' }))
        .catch(err =>
            res.status(400).json({ error: 'Unable to update the Database' })
        );
});