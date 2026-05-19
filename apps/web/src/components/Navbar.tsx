import { User } from "@repo/types"

interface PropTypes {
  user: User
}

export default ({ user }: PropTypes) => {
  return (
    <>
    <div>
      <header className="bg-sky-700 text-white px-4 py-1.5">
        <nav className="flex items-center justify-between">
          <div>
            <p className="text-lg font-bold">VibeBook</p>
          </div>

          <div>
            <div>
              <div>
                {/* <img src="" alt="" /> */}
              </div>
              <p className="text-sm font-bold">{user.name} {user.lastname}</p>
            </div>
          </div>
        </nav>
      </header>
    </div>
    </>
  )
}