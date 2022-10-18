import ReactDOM from "react-dom";
import { render, screen, getByTestId, getByText } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoginForm from "./LoginForm";

it("renders LoginForm without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.createPortal(
        <LoginForm currentUser={{ name: "", type: "" }} />,
        div
    );
    ReactDOM.unmountComponentAtNode(div);
});

it("renders LoginForm with the content", () => {
    const { getByTestId } = render(
        <LoginForm currentUser={{ name: "", type: "" }} />
    );
    expect(getByTestId("title")).toHaveTextContent("Login");
});
