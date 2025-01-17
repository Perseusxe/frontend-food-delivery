"use client";
import { Plus } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Image } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CategoryModal } from "./Category";

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
  categoryName: string;
};
type Props = {
  category: Category;
};
export const FetchEachCategory = ({ category }: Props) => {
  const [foods, setFoods] = useState<Foods[]>([]);
  const [foodValue, setFoodValue] = useState<string>();
  const [priceValue, setPriceValue] = useState<number>();
  const [ingredientsValue, setIngredientsValue] = useState<string>();
  const [createDialog, setCreateDialog] = useState(false);
  const [imageValue, setImageValue] = useState<string>();

  const filteredFoodCategory = category;

  useEffect(() => {
    const fetchFoods = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/food/${filteredFoodCategory._id}`
      );
      const data = await response.json();
      console.log(data);
      setFoods(data);
    };
    fetchFoods();
  }, []);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "food-delivery");
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/db8gb9fvf/upload`,
        {
          method: "POST",
          body: data,
        }
      );
      const dataJson = await response.json();
      console.log(dataJson);
      setImageValue(dataJson.secure_url);
    }
  };
  const src = imageValue;
  const addFoodDetails = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/food`, {
      method: "POST",
      body: JSON.stringify({
        foodName: foodValue,
        price: priceValue,
        ingredients: ingredientsValue,
        image: imageValue,
        category: foodCategory._id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setFoods([...foods, data]);
    setCreateDialog(!createDialog);
  };

  return (
    <div className={`bg-white mt-6 rounded-xl p-5 ${inter.className}`}>
      <h1 className="mb-4 text-xl font-semibold">
        {filteredFoodCategory?.categoryName}
      </h1>
      <div className="flex gap-4 flex-wrap">
        <div className="w-[270px] h-[241px] rounded-xl border-dashed border-[#EF4444] border-[1px] flex flex-col justify-center items-center gap-6">
          <Dialog open={createDialog} onOpenChange={setCreateDialog}>
            <DialogTrigger>
              <div className="size-[40px] rounded-full bg-[#EF4444] flex justify-center items-center ">
                <Plus className="text-white" />
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader className="mb-6">
                <DialogTitle>{`Add new Dish to ${filteredFoodCategory?.categoryName} `}</DialogTitle>
              </DialogHeader>
              <div className="flex justify-between mb-2">
                <div>
                  <h1 className="mb-2 font-medium">Food name</h1>
                  <Input
                    placeholder="Type food name"
                    className="pr-12"
                    value={foodValue}
                    onChange={(e) => setFoodValue(e.target.value)}
                  />
                </div>
                <div>
                  <h1 className="mb-2 font-medium">Price</h1>
                  <Input
                    placeholder="Enter price"
                    className="pr-12"
                    value={priceValue}
                    onChange={(e) => setPriceValue(e.target.value)}
                  />
                </div>
              </div>
              <div className="mb-2">
                <h1 className="mb-2 font-medium">Ingredients</h1>
                <Input
                  placeholder="List ingredients..."
                  className="pb-20 pt-4"
                  value={ingredientsValue}
                  onChange={(e) => setIngredientsValue(e.target.value)}
                />
              </div>
              <div>
                <h1 className="mb-2 font-medium">Food Image</h1>
                <div className="h-[138px] w-[100%] bg-[#2563EB0D]">
                  <label className=" size-[100%] border-[1px] border-dashed flex justify-center items-center">
                    <input
                      className="hidden size-[200px]"
                      type="file"
                      onChange={handleUpload}
                    />
                    {src ? (
                      <img className="w-full h-full" src={src} />
                    ) : (
                      <div className="flex flex-col items-center gap-4">
                        <div className="size-[32px] bg-white flex justify-center items-center rounded-full">
                          <Image className="size-[16px]" />
                        </div>
                        <p className="font-medium">
                          Choose a file or drag & drop it here
                        </p>
                      </div>
                    )}
                  </label>
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <Button
                  className="bg-[#18181B] text-white font-medium text-sm"
                  variant="outline"
                  onClick={addFoodDetails}
                >
                  Add Dish
                </Button>
              </div>
            </DialogContent>
          </Dialog>

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
