export interface ParamsType {
    [key: string]: string;
}

export interface BaseProperty {
    imgUrl: string;
    title: string;
    state: string;
    lga: string;
    price: number;
    id: number;
}

export interface AuthStateType {
    authToken: string | undefined;
    error: string | undefined;
    fetchType: undefined | "login" | "initial";
    isAuthenticated: boolean;
}
