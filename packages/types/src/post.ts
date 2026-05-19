import { User } from "./user"

export interface Post {
  id: string
  body: string
  user: Omit<User, 'id'>
}

export interface CreatePost {
  body: string
}
