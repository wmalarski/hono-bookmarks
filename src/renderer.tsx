import { jsxRenderer } from "hono/jsx-renderer";

export const renderer = jsxRenderer(({ children }) => {
	return (
		<html lang="en">
			<head>
				<title>Hono Bookmarks</title>
				{import.meta.env.PROD ? (
					<script type="module" src="/static/client.js" />
				) : (
					<script type="module" src="/src/client.tsx" />
				)}
			</head>
			<body>{children}</body>
		</html>
	);
});
