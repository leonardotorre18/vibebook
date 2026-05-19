import { Post } from "@repo/types"
import { Icon } from '@iconify/react'
import DefaultProfile from "./DefaultProfile"

interface PropTypes {
  post: Post
}

export default ({ post }: PropTypes) => {
  return (
    <>
      <div className="flex gap-2 py-2">
        {/* Left */}
        <div>
          <div className=" h-12 w-12">
            <DefaultProfile />
          </div>

        </div>
        {/* Right */}
        <div className="flex-1">
          <div className="mb-3">
            <div>
              <p className="flex gap-1 items-center">
                <a href={'/profile/' + post.user.id} className="text-sky-700 font-bold">{post.user.name}</a>
                <span className="text-sm text-gray-400">publicado hace un momento</span>
              </p>
            </div>
            <div>
              <p>{post.body}</p>
            </div>
          </div>

          <div className="flex gap-2 text-sm py-1">
            <button className="text-sky-800 hover:text-sky-600 cursor-pointer">Me Gusta</button>
            <button className="text-sky-800 hover:text-sky-600 cursor-pointer">Comentar</button>
            <button className="text-sky-800 hover:text-sky-600 cursor-pointer">Compartir</button>
          </div>
          
          <div className="flex gap-2 text-sm items-center py-1 bg-gray-100 px-1">
            <div>
              <Icon
                icon={'streamline-cyber-color:facebook-like'}
                width={16}
                height={16}
              />
            </div>
            <p>{6} personas les gustó esto</p>
          </div>
        </div>
      </div>
    </>
  )
}