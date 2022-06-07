/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-wait-for-side-effects */
import { ApolloProvider } from "@apollo/client";
import { createMockClient } from "mock-apollo-client";
import { cleanup, render, RenderResult, screen, waitFor } from "@testing-library/react";
import React from "react";
import { Login } from "../login";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe("<Login />", () => {
  let renderResult: RenderResult;
  beforeEach(() => {
    const mockedClient = createMockClient();
    renderResult = render(
      <ApolloProvider client={mockedClient}>
        <HelmetProvider>
          <Router>
            <Login />
          </Router>
        </HelmetProvider>
      </ApolloProvider>
    );
  })

  it("should render OK", async () => {
    await waitFor(() => {
      expect(document.title).toBe("Login | Nuber Eats");
    });
  });

  it("displays email validation errors", async () => {
    const { debug } = renderResult
    const email = screen.getByPlaceholderText(/email/i);
    await waitFor(() => { userEvent.type(email, "this@wont") })
    debug()
    // const errorMessage = screen.getByRole("alert");
    // expect(errorMessage).toHaveTextContent(/please enter a valid email/i);
    // await waitFor(() => {
    //   userEvent.clear(email);
    // });
    cleanup()
  });
});