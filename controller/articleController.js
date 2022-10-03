// Load Article model
const Article = require("../models/articles");

const getAllArticles = (req, res, next) => {
  Article.find()
    .then((articles) => res.json(articles))
    .catch((err) => res.status(404).json({ msg: "No Articles found" }));
};

const getArticleById = (req, res, next) => {
  const articleId = req.params.id;

  Article.findById(articleId)
    .then((article) => res.json(article))
    .catch((err) =>
      res.status(400).json({ error: "Unable to add this article", msg: err })
    );
};

const postArticle = (req, res, next) => {
  Article.create(req.body)
    .then((articles) => {
      res.json({ msg: "Book added successfully" });
    })
    .catch((err) =>
      res.status(400).json({ error: "Unable to add this article", msg: err })
    );
};

const editArticleById = (req, res, next) => {
  const articleId = req.params.id;
  const { title, authors, source, pubyear, doi, claim, evidence } = req.body;

  Article.findById(articleId)
    .then((article) => {
      article.title = title;
      article.authors = authors;
      article.pubyear = pubyear;
      article.source = source;
      article.doi = doi;
      article.claim = claim;
      article.evidence = evidence;
      res.json(article);
    })
    .catch((err) =>
      res.status(400).json({ error: "Unable to edit this article", msg: err })
    );
};

const deleteArticleById = (req, res, next) => {
  const articleId = req.params.id;

  Article.findById(articleId)
    .then((article) => {
      article.delete();
      res.json(article);
    })
    .catch((err) =>
      res.status(400).json({ error: "Unable to delete this article", msg: err })
    );
};

const editArticleStatusById = (req, res) => {
  Article.findById(req.params.id)
    .then((article) => {
      article.status = req.body.status;
      article.save();
    })
    .then(() => res.json({ msg: "Updated successfully" }))
    .catch((err) =>
      res.status(400).json({ error: "Unable to update the Database" })
    );
};

exports.getAllArticles = getAllArticles;
exports.getArticleById = getArticleById;
exports.postArticle = postArticle;
exports.editArticleById = editArticleById;
exports.deleteArticleById = deleteArticleById;
exports.editArticleStatusById = editArticleStatusById;
