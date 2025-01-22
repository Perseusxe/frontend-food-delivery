"use client";
import { useState, useEffect } from "react";
import { Header } from "../(components)/Header";
import { Foods } from "../(components)/Foods";

type FoodCategory = {
  _id: number;
  categoryName: string;
};
type Food = {
  _id: number;
  foodName: string;
}
export default function Home() {
  const [foodCategory, setFoodCategory] = useState<FoodCategory[]>([]);
  const [food, setFood] = useState<Food[]>([]);

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
    const fetchFood = async () => {
      const respoonse = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/food`
      );
      const datas = await respoonse.json();
      console.log(datas);
      setFood(datas);
    }
    fetchFood();
  }, []);


  return (
    <div className="bg-[#404040]">
      <Header />
      <img
        src="https://s3-alpha-sig.figma.com/img/8984/6312/a2a7c22f5fe9122b2bd6276cdd549c3e?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=MB2SBatxyFJ79rTWilSIIpiPQV~ILJe4rHXy8KYJPQveW0i3Wyb1--xxQN61sJR1MhKckQrVeimwHCMMJ~3lWY5MfgKhQqC5pxreoAgrieU3a9fEvKoW5iVK9gdvvJpqoARraK6T~Ic2m~OJUM2RLa8YcUIctGVgUl7mJXPi2zgYTrnQr0Oqou44Y2JK5Wxu-TRgBiNrM0YJY2H-9NYhSSxtVdHnyENpFJTxowJlivVMTS9-~BfveFZU127YORXGdAiGvIdT2XiCfVWWLUa61d6oFG~EIvFiKTRpCfAQiKhkXFsPe9LA7a5C7aAH~wk~vAi6VYr01~Hu85W7akfYMA__"
        className="w-full"
      />
      <div className="m-10 mb-[-10px]">
        <h2 className="text-[#FFFFFF] font-[600] text-[30px] leading-[36px]">
          Categories
        </h2>
        <div className="flex justify-center gap-[10px]">
          {foodCategory?.map((category) => {
            return (
              <div
                className=" bg-[#FFFFFF] rounded-full gap-[10px] flex justify-center items-center p-[10px] font-[400] text-[18px] leading-[28px]"
                key={category._id}
              >
                {category.categoryName}
              </div>
            );
          })}
        </div>

        {foodCategory?.map((category) => {
          return (
            <div key={category._id} >
              <div className="text-[#FFFFFF] font-[600] text-[30px] leading-[36px]">
              {category.categoryName}
              </div>
              <Foods  categoryId={category._id}/>
            </div>
          )
        })}

      </div>
    </div>
  );
}
