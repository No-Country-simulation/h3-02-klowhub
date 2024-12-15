import { UserRole } from "src/entities/UserRole";

export interface LoginSuccess {
    token: string,
    data: {
        userId : string,
        firstname: string,
        lastname: string,
        email: string,
        image: string,
        role: [UserRole],
    }
}