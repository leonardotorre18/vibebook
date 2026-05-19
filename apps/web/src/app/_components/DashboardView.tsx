import { cookies } from "next/headers";
import CreatePostForm from "./CreatePostForm";
import { Post, User } from '@repo/types'
import PostCard from "@/src/components/PostCard";
import Navbar from "@/src/components/Navbar";

interface PropTypes {
  user: User
}

export default async ({ user }: PropTypes) => {
  const cookieStore = await cookies()
  const token = cookieStore.get('accessToken')?.value

  const posts: Post[] = 
    await fetch('http://localhost:3000/posts', {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      cache: 'no-store',
    }).then(res => res.json()).then(({posts}) => posts)
  
  return (
    <>
      <Navbar user={user} />
      <main className="px-4 py-6">
        <div>
          <CreatePostForm />
        </div>

        <div className="flex flex-col gap-2 py-4">
          { posts.map(post => <PostCard key={post.id} post={post} />) }
        </div>
      </main>
    </>
  );
}
