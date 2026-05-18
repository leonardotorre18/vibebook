import { cookies } from "next/headers";
import LoginView from "./_components/LoginView";
import DashboardView from "./_components/DashboardView";

export default async () => {
  const cookieStore = await cookies()
  const token = cookieStore.get('accessToken')?.value

  if (!token) return <LoginView />

  const res = 
    await fetch('http://localhost:3000/auth/profile', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  
  if (res.status != 200) return <LoginView />

  const { user } = await res.json()
  
  return <DashboardView user={user} />
}
