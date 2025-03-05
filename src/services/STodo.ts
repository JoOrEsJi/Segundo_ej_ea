import { ITodo, TodoModel } from '../models/MTodo.js';
import { IUser, UserModel } from '../models/MUser.js';
import { addTodoToUser } from '../services/SUser.js';

// Crear un Todo para un usuario
export async function createTodo(todo: Partial<ITodo>, userEmail: string): Promise<ITodo | null> {
    const user = await UserModel.findOne({ email: userEmail });

    if (!user) return null;

    todo.user = user._id;
    const newTodo = new TodoModel(todo);
    await newTodo.save();

    await addTodoToUser(user._id, newTodo._id);
    
    return newTodo;
}

// Buscar un Todo por código
export async function findTodoByCode(code: number): Promise<ITodo | null> {
    return await TodoModel.findOne({ code });
}

// Buscar un Todo y poblar su usuario
export async function findTodoWithUser(code: number): Promise<ITodo | null> {
    return await TodoModel.findOne({ code }).populate('user');
}

// Usar Aggregation Pipeline para obtener estadísticas
export async function getTodoStatistics() {
    return await TodoModel.aggregate([
        { $group: { _id: "$completed", count: { $sum: 1 } } }
    ]);
}