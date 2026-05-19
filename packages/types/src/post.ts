import { User } from "./user"

export interface Post {
  id: string
  body: string
  user: User
}

export interface CreatePost {
  body: string
}
