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

type SignUpResponse = {
    data: {
        allow_password_change: boolean;
        created_at: Date;
        email: string;
        id: number;
        image: string | null;
        name: string | null;
        nickname: string | null;
        provider: string;
        uid: string;
        updated_at: Date;
    };
    status: string;
};
export type {LoginResponse, SignUpResponse};
