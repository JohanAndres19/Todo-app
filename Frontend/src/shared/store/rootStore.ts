import { TodoStore } from "../../modules/todo/store/todo.store.ts"
import { UserStore } from "./user.store.ts"

export class RootStore {
  todoStore: TodoStore
  userStore: UserStore

  constructor() {
    this.todoStore = new TodoStore()
    this.userStore = new UserStore()
  }
}


export const rootStore = new RootStore()
