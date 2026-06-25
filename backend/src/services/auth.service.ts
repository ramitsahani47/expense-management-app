

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


export const login = async (
    email: string,
    password: string
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

    const accessToken = jwt.sign(
        {
            id: user.id,
            email: user.email
        }
        ,
        process.env.JWT_SECRET as string,
        {
            expiresIn: "15min"
        }
    );


    const refreshToken = jwt.sign(
        {
            id: user.id
        },
        process.env.JWT_SECRET as string,
        {
            expiresIn: "7d"
        }
    )

    await usersRepository.saveRefreshToken(user.id, refreshToken)

    const { password: _, refresh_token, ...userWithoutPassword } = user;


    return {
        user: userWithoutPassword,
        accessToken,
        refreshToken
    };
};




export const refreshAccessToken = async (
    refresh_token: string
) => {
    // verify refresh token

    const decoded = jwt.verify(
        refresh_token,
        process.env.JWT_SECRET as string,
    ) as jwt.JwtPayload;


    // check whether token exist in db or not
    const user = await usersRepository.getUserById(decoded.id);

    if (!user) {
        throw new ApiError(
            401,
            "Invalid Refresh Token"
        );
    }


    // generate new access token
    const accessToken = jwt.sign(
        {
            id: user.id,
            email: user.email
        },
        process.env.JWT_SECRET as string,
        {
            expiresIn: "15min"
        }

    );


    return {
        accessToken
    };
};


export const logout = async (
    user_id: number
) => {
    await usersRepository.clearRefreshToken(user_id)
};