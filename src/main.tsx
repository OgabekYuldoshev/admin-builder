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
  resources: {
    posts: {
      label: "Posts",
      api: {
        list: {
          url: "/posts",
          responseTransform: (data) => {
            return {
              items: data.posts,
              total: data.total,
              limit: data.limit,
            };
          },
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
      list: {
        columns: [
          {
            id: "id",
            header: "ID",
            accessorKey: "id",
          },
          {
            id: "title",
            header: "Sarlavha",
            accessorKey: "title",
          },
          {
            id: "views",
            header: "Ko'rishlar soni",
            accessorKey: "views",
          },
          {
            id: "tags",
            header: "Teglar",
            accessorFn: ({ tags }) => tags.join(", "),
          },
        ],
      },
      fields: {},
    },
    comments: {
      label: "Comments",
      api: {
        list: {
          url: "/comments",
          responseTransform: (data) => {
            return {
              items: data.comments,
              total: data.total,
              limit: data.limit,
            };
          },
        },
        create: {
          url: "/comments",
        },
        update: {
          url: "/comments/:id",
        },
        delete: {
          url: "/comments/:id",
        },
        single: {
          url: "/comments/:id",
        },
      },
      list: {
        columns: [
          {
            id: "id",
            header: "ID",
            accessorKey: "id",
          },
          {
            id: "user",
            header: "Foydalanuvchi",
            accessorKey: "user.fullName",
          },
          {
            id: "body",
            header: "Matn",
            accessorKey: "body",
          },
          {
            id: "likes",
            header: "Like",
            accessorKey: "likes",
          },
        ],
      },
      fields: {},
    },
  },
};

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <App config={appConfig} />
  </StrictMode>
);
