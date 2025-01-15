"use client";
import { useState, useEffect } from "react";

type FoodCategory = {
  _id: number;
  categoryName: string;
};
export default function Home() {
  const [foodCategory, setFoodCategory] = useState<FoodCategory[]>([]);

  useEffect(() => {
    const fetchFoodCategory = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/food-category`
      );
      const data = await response.json();
      console.log(data);
      setFoodCategory(data);
    };
    fetchFoodCategory();
  }, []);
  const addCategory = async () => {
    const categoryName = prompt("Add category");
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/food-category`,
      {
        method: "POST",
        body: JSON.stringify({ categoryName: categoryName }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();
    setFoodCategory([...foodCategory, data]);
  };

  return (
    <div className="m-10">
      {foodCategory?.map((category) => {
        return (
          <div className="text-black" key={category._id}>
            {category.categoryName}
          </div>
        );
      })}
      <div className="text-black">
        <button
          onClick={addCategory}
          className="bg-slate-400 rounded-lg p-2 mt-10"
        >
          Add Category
        </button>
      </div>
    </div>
  );
}
