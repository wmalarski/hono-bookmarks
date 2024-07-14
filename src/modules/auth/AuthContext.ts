import { HTTPException } from "hono/http-exception";
import { createContext, useContext } from "hono/jsx";
import type { Session, User } from "lucia";

type AuthContextValue = {
	session: Session;
	user: User;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

export const useAuthContext = () => {
	const value = useContext(AuthContext);

	if (!value) {
		throw new HTTPException(500);
	}

	return value;
};
