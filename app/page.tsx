import { redirect } from 'next/navigation';

export default function RootPage() {
  // Redirecionamento forçado do lado do servidor (Server-Side Redirect)
  // Atua como um fallback absoluto caso o middleware sofra timeout
  redirect('/pt');
}