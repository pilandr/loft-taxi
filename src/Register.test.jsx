import React from "react";
import Register from "./Register";
import { render } from "@testing-library/react";

describe("Register", () => {
    it("renders form", () => {
      const { getByLabelText } = render(<Register />);
      expect(getByLabelText("Email*")).toHaveAttribute("name", "email");
      expect(getByLabelText("Как вас зовут?*")).toHaveAttribute("name", "username");
      expect(getByLabelText("Придумайте пароль*")).toHaveAttribute("name", "password");
    });
});
