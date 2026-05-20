import Navbar from "@/src/components/Navbar"
import DefaultProfile from "@/src/components/DefaultProfile"
import { Post } from "@repo/types"
import PostCard from "@/src/components/PostCard"

interface PropTypes {
  params: Promise<{
    username: string
  }>
}

export default async ({ params }: PropTypes) => {
  const { username } = await params
  const user = await fetch('http://localhost:3000/users/' + username)
    .then(res => res.json()).then(({ user }) => user)

  const posts: Post[] = await fetch('http://localhost:3000/posts', {
    cache: 'no-store',
  }).then(res => res.json()).then(({ posts }) => posts)

  return (
    <> 
    <div className="bg-gray-100">
      <Navbar user={user} />
  
      {/* User Heading */}
      <div>
        <div className="h-56">
  
        </div>
        <div>
          <div className="bg-white flex ">
            <div className="w-50 relative mr-5">
              <div className="absolute bottom-1/3 left-3 w-46 h-46 border-4 border-white outline-2 outline-gray-400">
                {/* <img src="" alt="" /> */}
                <DefaultProfile />
              </div>
            </div>
            <div className="font-bold text-sky-800 py-2 px-3">Biografía</div>
            <div className="font-bold text-sky-800 py-2 px-3">Fotos</div>
            <div className="font-bold text-sky-800 py-2 px-3">Amigos</div>
  
          </div>
        </div>
      </div>
  
      <div className="flex max-w-5xl">
        <div className="p-4 flex-1">
          <div className="">
            <div className="flex gap-2">
              <p className="font-semibold">Amigos</p><span>63</span>
            </div>
          </div>
          <div>
            {/* Friends Gallery */}
          </div>
        </div>
  
        <div className="p-4 flex-2">
  
          <div className="space-y-2 py-4">
            { posts.map(post => (
              <div className="bg-white px-2 py-1" key={post.id}>
                <PostCard post={post} />
              </div>
            )) }
          </div>
        </div>
      </div>
  
    </div>
    </>
  )
}