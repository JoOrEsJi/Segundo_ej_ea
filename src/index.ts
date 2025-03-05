import { startConnection } from './database.js';
import { createUser, listAllUsers } from './services/SUser.js';
import { createTodo, findTodoByCode, findTodoWithUser, getTodoStatistics } from './services/STodo.js';

async function main() {
    await startConnection();

    // Crear un usuario
    const user = await createUser({
        name: "John Doe",
        username: "johndoe",
        email: "john@example.com",
        phone: "123456789",
        company: { name: "Tech Corp" }
    });

    if (user) {
        console.log("🟢 Usuario creado:", user);

        // Crear un Todo para el usuario
        const todo = await createTodo({ code: 101, description: "Aprender TypeScript", completed: false }, user.email);
        if (todo) console.log("🟢 Todo creado:", todo);
    }

    // Buscar todos los usuarios
    const users = await listAllUsers();
    console.log("👥 Usuarios en la base de datos:", users);

    // Buscar un Todo por código
    const todoFound = await findTodoByCode(101);
    console.log("📌 Todo encontrado:", todoFound);

    // Buscar un Todo con detalles de usuario
    const todoWithUser = await findTodoWithUser(101);
    console.log("📌 Todo con usuario:", todoWithUser);

    // Obtener estadísticas de Todos con Aggregation Pipeline
    const stats = await getTodoStatistics();
    console.log("📊 Estadísticas de Todos:", stats);
}

main();