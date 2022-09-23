import React from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

const SubmissionForm = () => {
    const history = useHistory();

    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
        // setResult(JSON.stringify(data));
        axios
            .post("http://localhost:8082/api/articles", data)
            .then((res) => {
                history.push("/SEPractice");
            })
            .catch((err) => {
                console.log("Error in CreateBook!");
            });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("title")} placeholder="Title" />
            <p>
                <input {...register("authors")} placeholder="Authors" />
            </p>
            <p>
                <input {...register("source")} placeholder="Source" />
            </p>
            <p>
                <input
                    {...register("pubyear")}
                    placeholder="Publication Year"
                />
            </p>
            <p>
                <input {...register("doi")} placeholder="DOI" />
            </p>
            <p>
                <input {...register("claim")} placeholder="Claim" />
            </p>
            <p>
                <input {...register("evidence")} placeholder="Evidence" />
            </p>

            <select {...register("sepractice")}>
                <option value="">Select SE practice...</option>
                <option value="TDD">TDD</option>
                <option value="Mob Programming">Mob Programmin</option>
            </select>
            <input type="submit" />
        </form>
    );
};
export default SubmissionForm;
