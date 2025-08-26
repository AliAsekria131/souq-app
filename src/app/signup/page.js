"use client"; // <-- مهم جداً للصفحات التفاعلية
import { useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (error) alert(error.message);
    else alert('تم إرسال رابط التأكيد إلى بريدك الإلكتروني!');
  };

  return (
    <form onSubmit={handleSignUp}>
      <h2>إنشاء حساب جديد</h2>
      <input type="email" placeholder="البريد الإلكتروني" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="كلمة المرور" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">تسجيل</button>
    </form>
  );
}
