import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";
import { Todo } from "../models/Todo";

interface TodoState {
  todos: Todo[];
  addTodo: (description: string) => void;
  removeTodo: (id: string) => void;
  toggleCompletedState: (id: string) => void;
}

export const useTodoStore = create<TodoState>()(
  persist(
    (set, get) => ({
      // initial state
      todos: [],
      // methods for manipulating state
      addTodo: (description: string) => {
        set(() => ({
          todos: [
            ...get().todos,
            {
              id: uuidv4(),
              description,
              completed: false,
            } as Todo,
          ],
        }));
      },
      removeTodo: (id) => {
        set(() => ({
          todos: get().todos.filter((todo) => todo.id !== id),
        }));
      },
      toggleCompletedState: (id) => {
        set(() => ({
          todos: get().todos.map((todo) =>
            todo.id === id
              ? ({ ...todo, completed: !todo.completed } as Todo)
              : todo
          ),
        }));
      },
    }),
    {
      name: "todo-storage",
      storage: createJSONStorage(() => sessionStorage),
      onRehydrateStorage: (state) => {
        console.log(state);
        console.log("hydration starts");
        return (state, error) => {
          if (error) {
            console.log("an error happened during hydration", error);
          } else {
            console.log(state);
            console.log("hydration finished");
          }
        };
      },
    }
  )
);
