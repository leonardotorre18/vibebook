import { cookies } from "next/headers";
import CreatePostForm from "./CreatePostForm";
import { Post } from '@repo/types'

interface PropTypes {
  user: any
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
      <main>
        <div>
          <CreatePostForm />
        </div>

        <div>
          { posts.map(post => (
            <><div>{post.body}</div></>
          )) }
        </div>
      </main>
    </>
  );
}
