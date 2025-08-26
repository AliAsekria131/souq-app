// src/app/page.tsx
"use client";

import { supabase } from "../../lib/supabaseClient";
import Link from 'next/link';

// في App Router، يمكن جلب البيانات مباشرة هكذا في Server Components
async function getAds() {
  const { data } = await supabase
    .from('ads')
    .select('*')
    .eq('status', 'active')
    .order('created_at', { ascending: false })
    .limit(10);
  return data || [];
}

export default async function Home() {
  const ads = await getAds();

  return (
    <div>
      <nav>
        <Link href="/login">تسجيل الدخول</Link> | <Link href="/signup">إنشاء حساب</Link>
      </nav>
      <h1>أحدث الإعلانات</h1>
      <div>
        {ads.map((ad) => (
          <div key={ad.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            <h2>{ad.title}</h2>
            <p>السعر: {ad.price} {ad.currency}</p>
            <Link href={`/ad/${ad.id}`}>عرض التفاصيل</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
