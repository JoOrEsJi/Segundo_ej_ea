import { Types, Schema, model } from "mongoose";

export interface ITodo {
    code: number;
    user: Types.ObjectId;
    description: string;
    completed: boolean;
}

const TodoSchema = new Schema<ITodo>({
    code: { type: Number, required: true, unique: true },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    description: { type: String, required: true },
    completed: { type: Boolean, default: false }
});

export const TodoModel = model<ITodo>("Todo", TodoSchema);