import React from "react";
import SubmissionForm from "../components/SubmissionForm";
import '../index.css';
const SubmitArticle = () => {
    return (
        <div className="content-center">
            <h1>Submit an Article</h1>
            <SubmissionForm />
        </div>
    );
};

export default SubmitArticle;
