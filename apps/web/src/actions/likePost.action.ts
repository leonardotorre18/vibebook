'use server'
import { cookies } from 'next/headers';

export default async function(postId: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;

  const response = await fetch(`http://localhost:3000/posts/${postId}/like`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, 
    },
  });


  return response.json();
}