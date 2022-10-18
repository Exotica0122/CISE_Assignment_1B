import ReactDOM from "react-dom";
import { render, screen } from "@testing-library/react";
import App from "./App";
import LoginForm from "./pages/LoginForm";

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

it("renders App without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.createPortal(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
});
