export interface User {
    id: number,
    email: string,
    created: string,
    token: string
}

export interface UserRequestById {
    id: string
}

export interface UserLoginRequest {
    email: string,
    password: string
}

export interface UserResponse {
    token: string
}

export interface RegisterUserRequest {
    email: string,
    password: string,
    confirmPassword: string
}