import { User } from "./user"

export interface Post {
  id: string
  body: string
  user: User
  likes: PostLike[]
}

export interface PostLike {
  user: Pick<User, 'username'|'lastname'|'name'>
}

export interface CreatePost {
  body: string
}
