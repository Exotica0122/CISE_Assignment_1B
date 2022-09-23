const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    authors: {
        type: String,
        required: true,
    },
    source: {
        type: String,
        required: true,
    },
    pubyear: {
        type: String,
        min: 4,
        max: 4,
    },
    doi: {
        type: String,
    },
    claim: {
        type: String,
    },
    evidence: {
        type: String,
    },
    status: {
        type: String, //unchecked, checked, approved, rejected
        default: "Unchecked",
    },
});

module.exports = Article = mongoose.model("article", ArticleSchema);
