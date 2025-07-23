type LoginResponse = {
    data: {
        allow_password_change: boolean;
        email: string;
        id: number;
        image: string | null;
        name: string | null;
        nickname: string | null;
        provider: string;
        uid: string;
    };
};
export type {LoginResponse};
