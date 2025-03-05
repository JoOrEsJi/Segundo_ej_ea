import { IUser, UserModel } from '../models/MUser.js';
import { Types } from 'mongoose';

// Crear usuario
export async function createUser(user: Partial<IUser>): Promise<IUser | null> {
    return await new UserModel(user).save();
}

// Buscar usuario por ID
export async function findUserById(id: string): Promise<IUser | null> {
    return await UserModel.findById(id);
}

// Buscar usuario por email
export async function findUserByEmail(email: string): Promise<IUser | null> {
    return await UserModel.findOne({ email });
}

// Eliminar usuario por ID
export async function deleteUserById(id: string): Promise<IUser | null> {
    return await UserModel.findByIdAndDelete(id);
}

// Agregar un Todo a un usuario
export async function addTodoToUser(userId: Types.ObjectId, todoId: Types.ObjectId): Promise<void | null> {
    return await UserModel.findByIdAndUpdate(userId, { $push: { todos: todoId } });
}

// Listar todos los usuarios
export async function listAllUsers(): Promise<IUser[]> {
    return await UserModel.find();
}