"use client"; // <-- مهم جداً للصفحات التفاعلية

import { useState } from 'react';
import { supabase } from '../../../lib/supabaseClient'; // تأكد من صحة المسار
import { useRouter } from 'next/navigation'; // <-- استيراد من 'navigation'

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      alert(error.message);
    } else {
      router.push('/dashboard'); // توجيه المستخدم
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>تسجيل الدخول</h2>
      <input type="email" placeholder="البريد الإلكتروني" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="كلمة المرور" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">دخول</button>
    </form>
  );
}
