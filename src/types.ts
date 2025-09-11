export interface ParamsType {
    [key: string]: string;
}

export interface BaseProperty {
    main_image: string;
    description: string;
    state: string;
    lga: string;
    price: string;
    offer: string;
    tags: { [key: string]: string };
    id: number;
}

export interface Property extends BaseProperty {
    address: string;
    benefits: string[];
    type: string;
    extra_media: string[];
}

export interface PaginatedBasePropertyResponse {
    count: number;
    next: string;
    prev: string;
    results: BaseProperty[];
}

export interface AuthStateType {
    authToken: string | undefined;
    error: string | undefined;
    fetchType: undefined | "login" | "initial";
    isAuthenticated: boolean;
}

export interface TagType {
    type: string;
    text: string;
}

export type AdminContext = {
    authToken: string;
};
