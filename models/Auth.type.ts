export interface LoginRequestBody {
    email: string;
    password: string;
}

export interface LoginResponseBody {
    token: string;
    email: string;
    role: string;
    username: string;
}