import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { Button } from "@/components/ui/button";
  import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
  import { Plus } from "lucide-react";
  import { Minus } from "lucide-react";
  import { useState } from "react";
  import { useAuth } from "@clerk/nextjs";
  import type { OrderItem } from "./Header";
  export type Foods = {
    _id: string;
    foodName: string;
    price: number;
    image: string;
    ingredients: string;
    category: string;
  };
  type Props = {
    food: Foods;
  };
  
  export const FoodCard = ({ food }: Props) => {
    const { getToken } = useAuth();
    const [foodCount, setFoodCount] = useState(1);
    let totalPrice = foodCount * food.price;
    const onPost = async (postPath: string, body: any) => {
      console.log({ body });
      const token = await getToken();
      console.log(token);
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${postPath}`, {
        method: "POST",
        headers: {
          authentication: token ?? "",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
    };
    const addFoodOrder = (food: Foods) => {
      const oldValues = localStorage.getItem("orderItems");
      const oldOrderItems = oldValues ? JSON.parse(oldValues) : [];
      const oldFood = oldOrderItems.find(
        (item: OrderItem) => item.food._id === food._id
      );
      if (oldFood) {
        oldFood.quantity += foodCount;
      } else {
        oldOrderItems.push({
          food,
          quantity: foodCount,
        });
      }
      localStorage.setItem("orderItems", JSON.stringify(oldOrderItems));
    };
  
    // onClick={}
    // onPost("food-order", {
    //   totalPrice: totalPrice,
    //   FoodOrderItems: {
    //     food: food._id,
    //     quantity: foodCount,
    //   },
    // })
  
    return (
      <div>
        <Dialog>
          <DialogTrigger className="text-left">
            <Card className="relative">
              <CardHeader>
                <div
                  className="w-[377px] h-[210px] rounded-xl bg-center bg-cover bg-no-repeat"
                  style={{ backgroundImage: `url(${food.image}) ` }}
                ></div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between">
                  <h1 className="font-medium text-2xl text-[#FD543F]">
                    {food.foodName}
                  </h1>
                  <span className="text-lg font-semibold text-[#09090B]">
                    ${food.price}
                  </span>
                </div>
                <p className="text-sm font-normal text-[#09090B] w-[377px] mt-2 ">
                  {food.ingredients}
                </p>
                <div className="size-[44px] bg-white rounded-full absolute flex justify-center items-center right-12 top-[50%]">
                  <Plus className="text-[#EF4444]" />
                </div>
              </CardContent>
            </Card>
          </DialogTrigger>
          <DialogContent className="max-w-[826px] flex gap-6">
            <DialogTitle>
              <div
                className="w-[377px] h-[364px] rounded-xl bg-center bg-cover bg-no-repeat"
                style={{ backgroundImage: `url(${food.image}) ` }}
              ></div>
            </DialogTitle>
            <DialogHeader>
              <div className="pt-9 w-[377px] h-[364px] relative flex flex-col justify-between">
                <div>
                  <h1 className="font-medium text-3xl text-[#FD543F] mb-3">
                    {food.foodName}
                  </h1>
                  <p className="text-base">{food.ingredients}</p>
                </div>
                <div>
                  <div className="flex justify-between mb-6">
                    <div>
                      <h1 className="font-normal text-base">Total price</h1>
                      <h1 className="text-2xl font-semibold">${totalPrice}</h1>
                    </div>
                    <div className="flex items-center gap-3">
                      <div
                        onClick={() => setFoodCount(Math.max(1, foodCount - 1))}
                        className="size-[44px] bg-white rounded-full border-[1px] border-[#E4E4E7] focus:border-black flex justify-center items-center"
                      >
                        <Minus />
                      </div>
                      <div>
                        <h1 className="font-semibold font text-lg">
                          {foodCount}
                        </h1>
                      </div>
                      <div
                        onClick={() => setFoodCount(foodCount + 1)}
                        className="size-[44px] bg-white rounded-full border-[1px] border-[#E4E4E7] focus:border-black flex justify-center items-center"
                      >
                        <Plus />
                      </div>
                    </div>
                  </div>
                  <DialogClose asChild>
                    <Button
                      onClick={() => addFoodOrder(food)}
                      className="py-3 w-full flex justify-center font-medium rounded-full"
                    >
                      Add to cart
                    </Button>
                  </DialogClose>
                </div>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    );
  };