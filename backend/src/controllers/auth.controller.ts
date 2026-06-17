

import { Request, Response } from "express";
import * as usersService from "../services/auth.service";
import ApiResponse from "../utils/ApiResponse";
import ApiError from "../utils/ApiError";




export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;

        const user = await usersService.createUser(name, email, password);

        res.status(201).json(
            new ApiResponse(
                true,
                "User created successfully",
                user
            )
        )
    } catch (error) {
        res.status(400).json(error)
    }
};


export const getAllUsers = async (req: Request, res: Response) => {
    const users = await usersService.getAllUsers();
    res.status(201).json(
        new ApiResponse(
            true,
            "User fetched successfully",
            users
        )
    );
};


export const getUserById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const user = await usersService.getUserById(id);


    if (!user) {
        throw new ApiError(
            404,
            "user not found"
        )
    };

    return res.status(201).json(
        new ApiResponse(
            true,
            "user fetched successfully",
            user
        )
    );

};


export const getUserByEmail = async (req: Request, res: Response) => {
    // const email = String(req.params.email);
    const { email } = req.body;


    const user = await usersService.getUserByEmail(email);

    if (!user) {
        throw new ApiError(
            404,
            "user not found"
        )
    };

    return res.status(201).json(
        new ApiResponse(
            true,
            "user fetched successfully",
            user
        )
    );
};



export const login = async (
    req: Request,
    res: Response
) => {
    const { email, password } = req.body;

    const user = await usersService.login(email, password);

    return res.status(200).json(
        new ApiResponse(
            true,
            "Login successfull",
            user
        )
    )
};