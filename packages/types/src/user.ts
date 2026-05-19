export interface User {
  id: string
  email: string
  name: string
  lastname: string
  username: string
}

export interface CreateUser {
  email: string
  name: string
  lastname: string,
  password: string,
}
