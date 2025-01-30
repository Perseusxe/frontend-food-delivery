"use client";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import { Inter } from "next/font/google";
import { useSearchParams } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });
import Link from "next/link";
type FoodCategory = {
  _id: string;
  categoryName: string;
};
type Category = {
  _id: string;
  categoryName: string;
};
type Props = {
  category: Category;
};
export const HomePageCategory = ({ category }: Props) => {
  const searchParams = useSearchParams();
  const search = searchParams.get("categoryId");

  return (
    <div>
      <div className="">
        <Link href={`/foods?categoryId=${category._id}`}>
          <Badge
            key={category._id}
            variant="outline"
            className={`font-normal text-[#18181B] text-lg rounded-full border-none px-5 text-nowrap ${
              category._id == search ? "bg-[#EF4444] text-white" : "bg-white"
            }`}
          >
            {category.categoryName}
          </Badge>
        </Link>
      </div>
    </div>
  );
};