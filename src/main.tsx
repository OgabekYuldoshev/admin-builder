import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import z from "zod";
import { App, type AppConfig } from "./core2";

const loginResponseValidationSchema = z.object({
	accessToken: z.string(),
	refreshToken: z.string(),
});

const appConfig: AppConfig = {
	http: {
		baseURL: "https://dummyjson.com",
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
			endpoints: {
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
					url: "/posts/add",
				},
				update: {
					url: "/posts/:id",
				},
				delete: {
					url: "/posts/:id",
				},
				single: {
					url: "/posts/:id",
					responseTransform: (data) => {
						return {
							item: data,
						};
					},
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
			form: {
				fields: {
					title: {
						label: "Sarlavha",
						type: "text",
						validationSchema: z.string().min(1),
					},
					userId: {
						label: "Foydalanuvchi ID",
						type: "number",
						validationSchema: z.number().min(1),
					},
				},
			},
		},
		comments: {
			label: "Comments",
			endpoints: {
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
					url: "/comments/add",
				},
				update: {
					url: "/comments/:id",
				},
				delete: {
					url: "/comments/:id",
				},
				single: {
					url: "/comments/:id",
					responseTransform: (data) => {
						return {
							item: data,
						};
					},
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
			form: {
				fields: {
					body: {
						label: "Matn",
						type: "textarea",
						validationSchema: z.string().min(1),
					},
					postId: {
						label: "Post ID",
						type: "number",
						validationSchema: z.number().min(1),
					},
					userId: {
						label: "Foydalanuvchi ID",
						type: "number",
						validationSchema: z.number().min(1),
					},
				},
			},
		},
	},
};

createRoot(document.getElementById("root") as HTMLElement).render(
	<StrictMode>
		<App config={appConfig} />
	</StrictMode>,
);
