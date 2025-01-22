import { useState, useEffect } from "react";

type Food = {
    _id: number;
    foodName: string;
    price: number;
    image: string;
    ingredients: string;
  }


export const Foods = ({ categoryId }: { categoryId: number }) => {
    const [food, setFood] = useState<Food[]>([]);

    
    useEffect(() => {
        const fetchFood = async () => {
            const respoonse = await fetch(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/food?category=${categoryId}`
            );
            const datas = await respoonse.json();
            console.log(datas);
            setFood(datas);
          }
          fetchFood();
      }, []);
      return (
        <div className="flex gap-10">
            {food?.map((food) => {
          return (
            <div
              key={food._id}
              className="w-[270px] p-[10px] rounded-[20px] bg-[#FFFFFF] mb-[30px] mt-[30px]"
            >
              <img
                className="w-[238.75px] h-[129px] rounded-xl mb-5 justify-center ml-[6px]"
                src={food?.image}
              />
              <div className="flex items-center justify-between mb-2">
                <h1 className="font-[600] text-[24px] leading-[32px] text-[#EF4444]">
                  {food.foodName}
                </h1>
                <span className="text-[18px] font-[600] leading-[28px] text-[#09090B]">
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
      )
};
