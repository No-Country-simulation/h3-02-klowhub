import { AccountEntity } from "src/entities/accounts.entity";
import { UserRole } from "src/entities/UserRole";

export interface ProfileSuccess {
    userId: string,
    firstname: string,
    lastname: string,
    email: string,
    title: string,
    biography: string,
    image: string,
    reviws: number,
    whyLearn: string,
    rating: number,
    role: [UserRole],
    AccountEntity: [AccountEntity],
    createdAt: Date,

}