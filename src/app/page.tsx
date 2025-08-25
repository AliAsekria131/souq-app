// src/app/page.tsx
"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";

// تعريف النوع الخاص بالفئات
type Category = {
  id: number;
  name: string;
};

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        setLoading(true);

        const { data, error } = await supabase.from("categories").select("*");

        if (error) {
          throw error;
        }

        if (data) {
          setCategories(data as Category[]);
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error fetching categories:", error.message);
        } else {
          console.error("Error fetching categories:", error);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  return (
    <div style={{ padding: "50px" }}>
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
