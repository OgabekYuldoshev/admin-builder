import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import z from "zod";
import { App, type AppConfig } from "./core";

const loginResponseValidationSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});

const appConfig: AppConfig = {
  api: {
    baseUrl: "https://dummyjson.com",
    headers: {
      "Content-Type": "application/json",
    },
  },
  auth: {
    login: {
      url: "/auth/login",
      response: {
        validationSchema: loginResponseValidationSchema,
      },
    },
  },
  entities: {},
};

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <App config={appConfig} />
  </StrictMode>
);
