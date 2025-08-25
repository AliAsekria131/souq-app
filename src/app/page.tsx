// pages/index.js
'use client'

import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient'; // استيراد أداة الربط التي أنشأناها

export default function Home() {
  // حالة لتخزين الفئات التي سنجلبها من قاعدة البيانات
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // دالة لجلب البيانات
    async function fetchCategories() {
      try {
        setLoading(true);
        // هذا هو السطر المسؤول عن جلب البيانات من جدول 'categories'
        const { data, error } = await supabase.from('categories').select('*');

        if (error) {
          throw error; // إظهار الخطأ في الكونسول إذا حدث
        }

        if (data) {
          setCategories(data); // تحديث الحالة بالبيانات الجديدة
        }
      } catch (error) {
        console.error('Error fetching categories:', error.message);
      } finally {
        setLoading(false); // إيقاف مؤشر التحميل
      }
    }

    fetchCategories(); // استدعاء الدالة عند تحميل الصفحة
  }, []); // القوسان الفارغان [] يعنيان أن هذا التأثير سيعمل مرة واحدة فقط

  return (
    <div style={{ padding: '50px' }}>
      <h1>مشروع سوق الإعلانات</h1>

      <h2>اختبار الاتصال بقاعدة البيانات:</h2>
      {loading ? (
        <p>جاري التحميل...</p>
      ) : (
        <div>
          <h3>الفئات الموجودة:</h3>
          <ul>
            {categories.map((category) => (
              <li key={category.id}>{category.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
