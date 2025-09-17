import { type AuthStateType } from "@/types.ts";

interface ActionType {
    type:
        | "SET_ACCESS_TOKEN"
        | "START_INITIAL_FETCH"
        | "SET_FETCH_ERROR"
        | "START_LOGIN_FETCH";

    [key: string]: string | undefined;
}

const authReducer = (
    state: AuthStateType,
    action: ActionType
): AuthStateType => {
    switch (action.type) {
        case "SET_ACCESS_TOKEN":
            return {
                
                fetchType: undefined,
                isAuthenticated: true,
                error: undefined,
                authToken: action.access
            };

        case "START_INITIAL_FETCH":
            return {
                ...state,
                fetchType: "initial"
            };

        case "START_LOGIN_FETCH":
            return {
                ...state,
                fetchType: "login"
            };

        case "SET_FETCH_ERROR":
            
            return {
                ...state,
                fetchType: undefined,
                error: Number(action.error) || 600
            };
    }
};
export default authReducer;
