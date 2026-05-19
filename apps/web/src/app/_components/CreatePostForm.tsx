import { cookies } from "next/headers"

export default async () => {

  const cookieStore = await cookies()

  const token = cookieStore.get('accessToken')?.value

  const handlerSubmit = async (formData: FormData) => {
    'use server'
    const body = formData.get('body')

    fetch('http://localhost:3000/posts', {
      method: 'post',
      headers: {
        'Content-Type':'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        body
      })
    })
  }
  return (
    <> 

      <form action={handlerSubmit}>
        <textarea name="body" id="body">

        </textarea>
        <button type="submit">Enviar</button>
      </form>
    </>
  )
}