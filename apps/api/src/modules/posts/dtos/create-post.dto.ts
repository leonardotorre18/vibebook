import { CreatePost } from "@repo/types";
import { IsNotEmpty, IsString } from "class-validator";

export class CreatePostDTO implements CreatePost {
  @IsString()
  @IsNotEmpty()
  body!: string;
}
