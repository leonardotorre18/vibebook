import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

export default async () => {

  const cookieStore = await cookies()

  const token = cookieStore.get('accessToken')?.value

  const handlerSubmit = async (formData: FormData) => {
    'use server'
    const body = formData.get('body')

    await fetch('http://localhost:3000/posts', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        body
      })
    })
    revalidatePath('')

  }
  return (
    <>
      <div>
        <form action={handlerSubmit}>
          <div className="border-gray-300 border-2 flex flex-col bg-gray-100">
            <textarea
              name="body"
              id="body"
              className="bg-white p-1"
              placeholder="¿Qué tienes en mente?"
            />
            <div className="p-1 flex justify-end">
              <button type="submit" className="bg-sky-700 text-white px-2.5 py-0.5 font-semibold">Postear</button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}