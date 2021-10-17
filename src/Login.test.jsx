import React from "react";
import { LoginWithAuth } from "./Login";
import { render } from "@testing-library/react";

describe("Login", () => {
  describe("when logged out", () => {
    it("renders form", () => {
      const { getByLabelText } = render(<LoginWithAuth />);
      expect(getByLabelText("Email")).toHaveAttribute("name", "email");
      expect(getByLabelText("Пароль")).toHaveAttribute("name", "password");
    });

  })
});
