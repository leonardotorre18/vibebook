import { cookies } from "next/headers";
import CreatePostForm from "./CreatePostForm";
import { Post, User } from '@repo/types'
import PostCard from "@/src/components/PostCard";
import Navbar from "@/src/components/Navbar";
import DefaultProfile from "@/src/components/DefaultProfile";

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
      <main className="px-4 py-6 flex gap-4">
        <div>
          <div className="flex gap-2">
            <div className="w-12 h-12">
              <DefaultProfile />
            </div>
            <div>
              <p className="text-sm font-semibold">{user.name} {user.lastname}</p>
              <a href="/profile" className="text-xs">Editar Perfil</a>
            </div>
          </div>
        </div>
        <div className="flex-1 max-w-2xl">
          <div>
            <CreatePostForm />
          </div>

          <div className="flex flex-col gap-2 py-4">
            { posts.map(post => <PostCard key={post.id} post={post} />) }
          </div>
        </div>
        <div></div>
      </main>
    </>
  );
}
