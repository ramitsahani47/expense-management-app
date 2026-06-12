

import * as usersRepository from "../repositories/auth.repository";


export const createUser = async (
    name: string,
    email: string,
    password: string
) => {
    return usersRepository.createUser(
        name,
        email,
        password
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
}