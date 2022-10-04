const expect = require("chai").expect;
const request = require("supertest");

const server = require("../app");
const app = request.agent(server);

let articleId = "630365d8f9e18f3fb81a24cf";

describe("GET Request", () => {
    describe(`Get Article with ID: ${articleId}`, () => {
        it("Should successfully retrieve the saved article object with correct title", async () => {
            app.get(`/api/articles/${articleId}`).end((err, res) => {
                expect(res.body.title).to.equal(
                    "Does Test-Driven Development Really Improve Software Design Quality?"
                );
            });
        });
    });
});

describe("POST Request", () => {
    it("Should successfully make new Article", async () => {
        app.post(`/api/articles/`)
            .send({
                title: "Yolo",
                authors: "Janzen, D. S.",
                source: "Software, IEEE, 25(2) 77-84",
                pubyear: "2008",
                doi: "www.peter.com",
                status: "Unchecked",
            })
            .end((err, res) => {
                expect(res.body.msg).to.equal("Article added successfully");
            });
    });
});

describe("PUT Request", () => {
    it(`Should edit Article by ID: ${articleId}`, async () => {
        app.put(`/api/articles/${articleId}`)
            .send({
                title: "Cool article",
                authors: "Gaymen, D. S.",
                source: "Software, IEEE, 25(2) 77-84",
                pubyear: "2008",
                doi: "www.peter.com",
                status: "Unchecked",
            })
            .end((err, res) => {
                expect(res.status).to.equal(200);
            });
    });
});
