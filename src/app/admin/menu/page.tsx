"use client";

import { useState, useEffect } from "react";
import { FetchEachCategory } from "@/app/components/FetchAllCategory";
import { SideBar } from "@/app/components/Sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { CategoryModal } from "@/app/components/Category";
import { EachCategory } from "@/app/components/EachCategory";
type FoodCategory = {
  _id: string;
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
  return (
    <div className="w-[1440px] mx-auto">
      <div className="flex">
        <SideBar />
        <div className="bg-[#f4f4f5] flex-1 min-h-screen pl-6 pr-10 py-6">
          <div className="flex justify-end mb-6">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <CategoryModal />
          {foodCategory?.map((category) => (
            <FetchEachCategory key={category._id} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
}
