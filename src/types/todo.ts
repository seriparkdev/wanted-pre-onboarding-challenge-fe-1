export interface Todo {
  content: string;
  createdAt: string;
  id: string;
  title: string;
  updatedAt: string;
}

export interface NewTodo {
  title: string;
  content: string;
}

export interface TodoId {
  id: string;
}
