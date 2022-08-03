import axios from "axios";

export function getTodos(userToken: string) {
  return axios.get("http://localhost:8080/todos", {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
}

export function getTodoById(id: string, userToken: string) {
  return axios.get(`http://localhost:8080/todos/${id}`, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
}

export function createTodo(title: string, content: string, userToken: string) {
  return axios.post(
    "http://localhost:8080/todos",
    {
      title: title,
      content: content,
    },
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }
  );
}

export function updateTodo(
  newTitle: string,
  newContent: string,
  id: string,
  userToken: string
) {
  return axios.put(
    `http://localhost:8080/todos/${id}`,
    {
      title: newTitle,
      content: newContent,
    },
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }
  );
}

export function deleteTodo(id: string, userToken: string) {
  return axios.delete(`http://localhost:8080/todos/${id}`, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
}

export function signUp(email: string, pwd: string) {
  axios.post("http://localhost:8080/users/create", {
    email: email,
    password: pwd,
  });
}

export function login(email: string, pwd: string) {
  return axios.post("http://localhost:8080/users/login", {
    email: email,
    password: pwd,
  });
}
