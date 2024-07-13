import { jsxRenderer } from "hono/jsx-renderer";

export const renderer = jsxRenderer(({ children }) => {
	return (
		<html lang="en">
			<head>
				<link href="/static/style.css" rel="stylesheet" />
				<title>Hono Bookmarks</title>
			</head>
			<body>{children}</body>
		</html>
	);
});
