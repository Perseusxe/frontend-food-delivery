"use client";

import { use, useEffect, useState } from "react";
import { ChevronRight, Divide } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Minus } from "lucide-react";
import { Plus } from "lucide-react";
import type { Foods } from "./EachCategory";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
export type OrderItem = {
  food: Foods;
  quantity: number;
};
export const Header = () => {
  const [isCart, setIsCart] = useState(true);
  const [isOpen, setIsopen] = useState(false);
  const [foodOrderItems, setFoodOrderItems] = useState<OrderItem[]>();
  const deleteOrder = (id: string) => {
    const updatedOrder = foodOrderItems?.filter(
      (orderItem) => orderItem.food._id !== id
    );
    setFoodOrderItems(updatedOrder);
    localStorage.setItem("orderItems", JSON.stringify(updatedOrder));
  };
  const onMinusOrderItem = (idx: Number) => {
    console.log({ foodOrderItems, idx });
    const newOrderItems = foodOrderItems?.map((orderItem, index) => {
      if (idx === index && orderItem?.quantity > 1) {
        console.log(orderItem);
        return {
          ...orderItem,
          quantity: orderItem?.quantity - 1,
        };
      } else {
        return orderItem;
      }
    });
    setFoodOrderItems(newOrderItems as OrderItem[]);
    localStorage.setItem("orderItems", JSON.stringify(newOrderItems));
  };
  const onPlusOrderItem = (idx: Number) => {
    const newOrderItems = foodOrderItems?.map((orderItem, index) => {
      if (idx === index) {
        return {
          ...orderItem,
          quantity: orderItem?.quantity + 1,
        };
      } else {
        return orderItem;
      }
    });
    setFoodOrderItems(newOrderItems as OrderItem[]);
    localStorage.setItem("orderItems", JSON.stringify(newOrderItems));
  };
  const calculateTotalPrice = (
    foodOrderItems: OrderItem[] | undefined
  ): number => {
    if (!foodOrderItems || foodOrderItems.length === 0) return 0;

    return foodOrderItems.reduce((total, orderItem) => {
      return total + orderItem.food.price * orderItem.quantity;
    }, 0);
  };
  const totalPrice = calculateTotalPrice(foodOrderItems);

  useEffect(() => {
    if (isOpen) {
      const existingOrderString = localStorage.getItem("orderItems");
      const existingOrder = JSON.parse(existingOrderString || "[]") || [];
      setFoodOrderItems(existingOrder);
    }
  }, [isOpen]);
  return (
    <div className="bg-[#18181B] h-[68px] py-3 px-20 flex justify-between">
      <div className="flex items-center gap-3">
        <svg
          width="46"
          height="38"
          viewBox="0 0 46 38"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M21.4661 0.596777C21.2291 0.833763 21.2203 0.885153 21.2426 1.9211C21.2552 2.5138 21.225 3.03926 21.1755 3.0886C21.1259 3.13793 20.6008 3.24894 20.0086 3.33508C17.4119 3.71312 15.2288 4.47478 12.9118 5.81124C11.2389 6.77621 10.332 7.45516 8.96201 8.76841C7.54568 10.1261 6.61075 11.3101 5.40645 13.2712C5.06061 13.8346 4.39556 15.1528 4.39556 15.2753C4.39556 15.3004 4.28711 15.5582 4.15457 15.848C3.40896 17.4781 2.74567 20.4878 2.72169 22.3496C2.70515 23.6372 2.75654 23.5819 1.46795 23.6997C0.491915 23.7889 0.337253 23.8283 0.174956 24.0287C-0.0801388 24.3437 -0.0554713 24.6869 0.243672 24.986C0.494558 25.2369 0.506402 25.2385 1.58962 25.175C2.19075 25.1398 4.00401 25.0461 5.61916 24.9668C7.2343 24.8875 9.32664 24.779 10.2688 24.7255C12.9744 24.5722 13.6591 24.5369 15.0163 24.4812C16.351 24.4264 18.8048 24.2963 21.5258 24.1361C22.4142 24.0838 23.7827 24.0179 24.567 23.9896C25.3513 23.9613 26.3424 23.9185 26.7695 23.8946C27.1966 23.8708 28.6031 23.8046 29.8952 23.7476C31.1873 23.6907 32.9493 23.6025 33.8107 23.5515C34.6721 23.5005 35.8835 23.4335 36.5026 23.4026C37.1217 23.3716 37.8926 23.3274 38.2156 23.3043C38.5387 23.2812 39.3536 23.2367 40.0266 23.2054C44.4149 23.0016 45.5977 22.9022 45.7989 22.7201C46.0619 22.482 46.0683 21.8817 45.8102 21.6481C45.6521 21.505 45.4529 21.4824 44.5388 21.5035C43.9425 21.5173 43.4225 21.4963 43.3831 21.457C43.3438 21.4175 43.2376 20.8922 43.1471 20.2894C42.9636 19.0657 42.9276 18.8926 42.7262 18.2635C42.6486 18.0212 42.5337 17.6248 42.471 17.3825C42.4082 17.1402 42.317 16.8656 42.2685 16.7721C42.2198 16.6786 42.1801 16.5522 42.1801 16.4914C42.1801 16.262 41.2488 14.1865 40.7617 13.3303C40.1169 12.1969 39.5495 11.3243 39.2569 11.0164C39.1309 10.8837 38.9115 10.6209 38.7694 10.4325C38.1678 9.63452 36.9438 8.41152 35.9437 7.60894C35.1665 6.9852 33.0212 5.57268 32.3913 5.27002C29.6127 3.93483 27.0152 3.25001 24.2341 3.11963C23.3564 3.07842 22.9368 3.01959 22.8415 2.92434C22.7592 2.84212 22.7019 2.56637 22.6969 2.22973C22.6781 0.962387 22.6502 0.760641 22.4651 0.556154C22.2086 0.27277 21.7723 0.290488 21.4661 0.596777ZM13.6928 7.61824C13.6916 7.68558 13.5044 8.03318 13.2768 8.39086C12.6521 9.37218 11.4437 11.6414 11.4436 11.8337C11.4435 11.8775 11.3333 12.1541 11.1987 12.4484C11.0641 12.7426 10.954 13.0393 10.954 13.1078C10.954 13.1761 10.9131 13.274 10.8631 13.3251C10.7311 13.46 10.1131 15.9035 9.93589 16.9909C9.78377 17.9238 9.72827 18.4794 9.63283 20.0255C9.54806 21.3972 9.29718 21.5872 7.53589 21.6141C6.16967 21.6349 5.92045 21.5301 5.67329 20.8306C5.48975 20.3112 5.61651 19.6267 6.25728 17.6762C6.78284 16.0766 6.8957 15.7947 7.45219 14.6906C8.33719 12.9348 9.10825 11.7598 10.2787 10.3836C11.8626 8.52105 13.7028 7.03052 13.6928 7.61824ZM27.2523 27.2415C25.6318 27.2807 21.3166 27.478 19.1276 27.6131C17.3433 27.7232 16.5484 27.7676 13.8906 27.9056C12.3563 27.9852 10.5723 28.0932 9.9262 28.1457C9.28014 28.1982 7.49615 28.2897 5.96176 28.3491C4.42738 28.4086 3.11118 28.477 3.03699 28.5012C2.89818 28.5465 2.90826 28.7062 3.11402 29.7163C3.26604 30.4631 3.6989 31.8914 3.90799 32.3363C4.01733 32.5688 4.17747 32.9444 4.26381 33.171C4.70479 34.3275 5.64842 35.9636 6.49838 37.0454C6.75749 37.3753 6.97676 37.6452 6.98566 37.6452C6.99457 37.6452 7.21932 37.5405 7.48518 37.4127C8.8421 36.7601 9.48022 36.4756 9.90966 36.3319C11.2996 35.8672 13.6228 35.5663 15.2076 35.6461C16.6816 35.7202 24.4092 35.718 25.4903 35.643C26.6211 35.5647 27.2861 35.4309 27.9375 35.1508C28.1528 35.0582 28.8136 34.7845 29.4058 34.5427C29.998 34.301 30.5266 34.0682 30.5804 34.0254C30.6343 33.9826 31.1938 33.7241 31.8238 33.4509C32.4537 33.1777 33.0484 32.9107 33.1453 32.8575C33.3558 32.7418 34.1206 32.3949 35.9642 31.5788C36.718 31.2451 37.5549 30.8682 37.8241 30.7413C38.0933 30.6142 38.5778 30.393 38.9009 30.2496C39.5464 29.963 40.3375 29.597 41.5624 29.0183C42.0034 28.81 42.3916 28.6395 42.4252 28.6395C42.5646 28.6395 43.5374 28.1526 43.5998 28.0516C43.6371 27.9913 43.5861 27.8506 43.4867 27.7389C43.0455 27.2435 42.1856 27.1433 41.0477 27.4549C40.0669 27.7235 38.7366 28.1347 38.5093 28.2397C38.4016 28.2893 37.9611 28.4431 37.5304 28.5812C36.3337 28.9651 33.7049 29.8845 33.3465 30.0445C33.1711 30.1228 32.8074 30.2612 32.5382 30.3522C32.269 30.443 31.6082 30.6707 31.0699 30.8582C29.9959 31.2321 26.6929 31.9388 25.5799 32.033C24.7195 32.1057 24.4144 32.0368 24.2092 31.7237C23.8544 31.1822 24.1202 30.4338 24.7541 30.1893C25.0942 30.058 26.4941 29.8182 26.9324 29.816C27.2964 29.8142 29.5315 29.4573 30.92 29.1791C31.9009 28.9827 32.6325 28.6052 32.8271 28.1951C33.0174 27.7942 33.0165 27.7115 32.8183 27.4091L32.6581 27.1645L30.3956 27.1923C29.1514 27.2076 27.7368 27.2298 27.2523 27.2415Z"
            fill="#EF4444"
          />
        </svg>
        <div>
          <div className="flex font-semibold">
            <h1 className="text-[#F4F4F5]">Nom</h1>
            <h1 className="text-[#EF4444]">Nom</h1>
          </div>
          <h1 className="text-[#F4F4F5]">Swift delivery</h1>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex py-2 px-3 bg-white rounded-full gap-2 items-center text-xs ">
          <svg
            width="16"
            height="20"
            viewBox="0 0 16 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.0399 8.33335C15.0399 13.3334 8.37321 18.3334 8.37321 18.3334C8.37321 18.3334 1.70654 13.3334 1.70654 8.33335C1.70654 6.56524 2.40892 4.86955 3.65916 3.61931C4.90941 2.36907 6.6051 1.66669 8.37321 1.66669C10.1413 1.66669 11.837 2.36907 13.0873 3.61931C14.3375 4.86955 15.0399 6.56524 15.0399 8.33335Z"
              stroke="#EF4444"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8.37321 10.8334C9.75392 10.8334 10.8732 9.71407 10.8732 8.33335C10.8732 6.95264 9.75392 5.83335 8.37321 5.83335C6.9925 5.83335 5.87321 6.95264 5.87321 8.33335C5.87321 9.71407 6.9925 10.8334 8.37321 10.8334Z"
              stroke="#EF4444"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <h1 className="text-[#EF4444]">Delivery address</h1>
          <input
            className="outline-none bg-transparent w-[70px]"
            type="text"
            name=""
            id=""
            placeholder="Add Location"
          />
          <ChevronRight className="opacity-50" />
        </div>
        <Sheet open={isOpen} onOpenChange={setIsopen}>
          <div
            onClick={() => setIsopen(true)}
            className="rounded-full bg-white size-[36px] flex items-center justify-center"
          >
            <ShoppingCart className="size-[13.36px]" />
          </div>

          <SheetContent className="bg-[#404040] border-none min-w-[500px]">
            <SheetHeader>
              <SheetTitle>
                <div className="flex text-white gap-3 mb-6">
                  <ShoppingCart />
                  <h1 className="font-semibold text-xl">Order Detail</h1>
                </div>
              </SheetTitle>
            </SheetHeader>

            <div className="flex bg-white rounded-full">
              <Button
                onClick={() => setIsCart(true)}
                className={`rounded-full w-full justify-center border-white border-[3px] ${
                  isCart ? "bg-[#EF4444] text-white" : "bg-white"
                }`}
                variant="outline"
              >
                Cart
              </Button>
              <Button
                onClick={() => setIsCart(false)}
                className="rounded-full w-full justify-center border-white border-[3px]  focus:bg-[#EF4444] focus:text-white"
                variant="outline"
              >
                Order
              </Button>
            </div>
            {isCart && (
              <div className="mt-6 bg-white rounded-[20px] p-4">
                <h1 className="text-black mb-5 font-semibold text-xl">
                  My Cart
                </h1>
                {foodOrderItems?.map((orderItem: any, idx: Number) => (
                  <div
                    className="pb-5 mb-5 flex gap-[10px] border-b-[1px] border-dashed"
                    key={orderItem?.food?._id}
                  >
                    <div
                      className="w-[124px] h-[120px] bg-center bg-no-repeat bg-cover rounded-xl"
                      style={{
                        backgroundImage: `url(${orderItem?.food.image}) `,
                      }}
                    ></div>

                    <div className="flex-1">
                      <div>
                        <div className="flex justify-between items-center">
                          <h1 className="text-base font-bold text-[#EF4444]">
                            {orderItem?.food?.foodName}
                          </h1>
                          <div
                            onClick={() => deleteOrder(orderItem?.food?._id)}
                            className=" bg-white rounded-full size-[36px] flex border-[1px] justify-center items-center"
                          >
                            <X className="size-[8px]" />
                          </div>
                        </div>
                        <p className="text-xs w-[259px]">
                          {orderItem?.food?.ingredients}
                        </p>
                      </div>

                      <div className="flex justify-between mt-6 items-center">
                        <div className="flex gap-2 items-center">
                          <Button
                            onClick={() => onMinusOrderItem(idx)}
                            variant="outline"
                            className="flex justify-center items-center border-none ring-offset-0 size-[36px]"
                          >
                            <Minus />
                          </Button>
                          <h1 className="font-semibold">
                            {orderItem?.quantity}
                          </h1>
                          <Button
                            onClick={() => onPlusOrderItem(idx)}
                            variant="outline"
                            className="flex justify-center items-center border-none ring-offset-0 size-[36px]"
                          >
                            <Plus />
                          </Button>
                        </div>
                        <span className="font-bold">
                          ${orderItem?.food?.price * orderItem?.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                <SheetClose className="w-full">
                  <div className="border-[1px] py-2 w-full flex justify-center rounded-full text-[#EF4444] font-medium">
                    Add Food
                  </div>
                </SheetClose>
              </div>
            )}
            <div className="bg-white p-4 rounded-[20px] mt-6">
              <h1>Payment info</h1>
              <div>
                <h2>Items</h2>
                <h2>{totalPrice}</h2>
              </div>
              <div>
                <h2>Items</h2>
                <h2></h2>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <div className="rounded-full border-[#EF4444] border-[1px] size-[36px] flex items-center justify-center">
          <UserButton />
        </div>
      </div>
    </div>
  );
};