"use client"; // <-- مهم جداً للصفحات التفاعلية
import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [ads, setAds] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login'); // إذا لم يكن هناك مستخدم، اذهب لصفحة الدخول
      } else {
        setUser(session.user);
        // جلب الإعلانات الخاصة بهذا المستخدم فقط
        const { data: userAds, error } = await supabase
          .from('ads')
          .select('*')
          .eq('user_id', session.user.id);
        
        if (userAds) setAds(userAds);
      }
    };
    checkUser();
  }, []);

  const handleDelete = async (adId) => {
    // منطق حذف الإعلان
    const { error } = await supabase.from('ads').delete().eq('id', adId);
    if (error) alert('حدث خطأ');
    else {
        // إعادة تحميل الإعلانات بعد الحذف
        setAds(ads.filter(ad => ad.id !== adId));
    }
  }

  if (!user) return <div>جاري التحميل...</div>;

  return (
    <div>
      <h1>لوحة التحكم</h1>
      <p>أهلاً بك، {user.email}</p>
      <hr />
      <h2>إعلاناتي</h2>
      {ads.map(ad => (
        <div key={ad.id}>
          <h3>{ad.title}</h3>
          <button>تعديل</button>
          <button onClick={() => handleDelete(ad.id)}>حذف</button>
        </div>
      ))}
    </div>
  );
}
