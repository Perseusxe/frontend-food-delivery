"use client";
import { Plus } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
type Foods = {
  _id: number;
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
  category: number;
};
type Category = {
  _id: string;
  foodName: string;
};
type Props = {
  foodCategory: Category[];
};
export const EachCategory = ({ foodCategory }: Props) => {
  const params = useParams();
  const [foods, setFoods] = useState<Foods[]>([]);
  useEffect(() => {
    const fetchFoods = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/food/${params.id}`
      );
      const data = await response.json();
      console.log(data);
      setFoods(data);
    };
    fetchFoods();
  }, [params.id]);
  const filteredFoodCategory = foodCategory?.find(
    (category) => category._id == params.id
  );
  console.log(filteredFoodCategory);

  return (
    <div className={`bg-white mt-6 rounded-xl p-5 ${inter.className}`}>
      <h1 className="mb-4 text-xl font-semibold">
        {filteredFoodCategory?.categoryName}
      </h1>
      <div className="flex gap-4">
        <div className="w-[270px] h-[241px] rounded-xl border-dashed border-[#EF4444] border-[1px] flex flex-col justify-center items-center gap-6">
          <div className="size-[40px] rounded-full bg-[#EF4444] flex justify-center items-center ">
            <Plus className="text-white" />
          </div>
          <div className="w-[120px]">
            <h1 className="text-[14px] text-center">
              {`Add new Dish to ${filteredFoodCategory?.categoryName}`}
            </h1>
          </div>
        </div>
        {foods?.map((food) => {
          return (
            <div
              key={food._id}
              className="w-[270px] h-[241px] border-[1px] border-[#E4E4E7] rounded-xl p-4"
            >
              <img
                className="w-[238.75px] h-[129px] rounded-xl mb-5"
                src={food?.image}
                alt=""
              />
              <div className="flex items-center justify-between mb-2">
                <h1 className="font-medium text-sm text-[#EF4444]">
                  {food.foodName}
                </h1>
                <span className="text-xs font-normal text-[#09090B]">
                  ${food.price}
                </span>
              </div>

              <p className="text-xs font-normal text-[#09090B]">
                {food.ingredients}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
