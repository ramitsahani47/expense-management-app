

import * as usersRepository from "../repositories/auth.repository";
import ApiError from "../utils/ApiError";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const createUser = async (
    name: string,
    email: string,
    password: string
) => {

    const hashedPassword = await bcrypt.hash(password, 10)

    return usersRepository.createUser(
        name,
        email,
        hashedPassword
    )
};


export const getAllUsers = async () => {
    return usersRepository.getAllUsers();
};


export const getUserById = async (id: number) => {
    return usersRepository.getUserById(id);
};

export const getUserByEmail = async (email: string) => {
    return usersRepository.getUserByEmail(email);
};


export const login = async(
    email: string,
    password : string
) => {
    const user = await usersRepository.getUserByEmail(email);
    if (!user) {
        throw new ApiError(
            401,
            "Invalid email or password"
        );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw new ApiError(
            401,
            "Invalid email or password"
        )
    };

    const token = jwt.sign(
        {
            id: user.id,
            email:user.email
        }
        ,
        process.env.JWT_SECRET as string,
        {
            expiresIn:"1d"
        }
    )

    const { password: _, ...userWithoutPassword } = user;


    return {
        user: userWithoutPassword,
        token
    };
}