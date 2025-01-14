"use client";
import { useState, useEffect } from "react";

import Image from "next/image";

type FoodCategory = {
  _id: number;
  categoryName: string;
};
export default function Home() {
  const [foodCategory, setFoodCategory] = useState<FoodCategory[]>([]);

  useEffect(() => {
    const FetchFoodCategory = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/food-category`
      );
      const data = await response.json();
      console.log(data);
      setFoodCategory(data);
    };
    FetchFoodCategory();
  }, []);

  return (
    <div>
      {foodCategory?.map((category) => {
        return (
          <div className="text-black" key={category._id}>
            {category.categoryName}
          </div>
        );
      })}
    </div>
  );
}
