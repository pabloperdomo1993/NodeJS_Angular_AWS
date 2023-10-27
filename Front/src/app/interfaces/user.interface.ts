export interface CreateUser {
    fullName: string;
    email: string;
    password: string;
}

export interface Auth {
    email: string;
    password: string;
}

export interface Posts {
    user: number;
    title: string;
    message: string;
    createAt: Date;
}

export interface GetMyPost {
    email: string | null;
}