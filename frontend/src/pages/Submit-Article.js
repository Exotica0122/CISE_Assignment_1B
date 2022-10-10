import React from "react";
import SubmissionForm from "../components/SubmissionForm";
import '../index.css';
const SubmitArticle = () => {
    return (
        <div className="content-center">
            <h2>Submit Article</h2>
            <p>
                This will be a form to allow submitters to submit an article for
                possible inclusion in our SEED repo.
            </p>
            <SubmissionForm />
        </div>
    );
};

export default SubmitArticle;
