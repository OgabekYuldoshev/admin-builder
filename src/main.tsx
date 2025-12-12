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
      responseTransform: (data) => {
        return loginResponseValidationSchema.parse(data);
      },
    },
    user: {
      url: "/auth/me",
    },
  },
  entities: {
    posts: {
      label: "Posts",
      api: {
        list: {
          url: "/posts",
        },
        create: {
          url: "/posts",
        },
        update: {
          url: "/posts/:id",
        },
        delete: {
          url: "/posts/:id",
        },
        single: {
          url: "/posts/:id",
        },
      },
      list: {},
      fields: {},
    },
  },
};

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <App config={appConfig} />
  </StrictMode>
);
