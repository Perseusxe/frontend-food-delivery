"use client";
import { Header } from "../components/Header";
import { HeroSection } from "../components/Hero";
import { HomePageCategory } from "../components/HomePageCategory";
import { HomeCategory } from "../components/HomeCategory";
import { useSearchParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { useAuthFetch } from "../components/useFetchData";
import Link from "next/link";
import { Footer } from "../components/Footer";
type Categories = {
  _id: string;
  categoryName: string;
};
export default function FoodsPage() {
  const { isLoading, data } = useAuthFetch("food-category");
  const categories: Categories[] = data;
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId");

  if (isLoading) return <div>Loading...</div>;

  const SelectedCategory = categories.find(
    (category) => category._id == categoryId
  );
  return (
    <div className="">
      <Header />
      <HeroSection />
      <div className="w-[1440px] mx-auto">
        <h1 className="text-3xl font-semibold text-white mt-8 mb-9">
          Categories
        </h1>
        <div className="flex gap-2 overflow-scroll no-scrollbar">
          <Link href={`/foods`}>
            <Badge
              variant="outline"
              className={`${
                categoryId === null ? "bg-[#EF4444] text-white" : "bg-white"
              } text-lg rounded-full font-normal border-none px-5 text-nowrap`}
            >
              All Dishes
            </Badge>
          </Link>
          {categories?.map((category) => (
            <HomePageCategory category={category} key={category._id} />
          ))}
        </div>
        {categoryId === null
          ? categories.map((category) => (
              <HomeCategory key={category._id} category={category} />
            ))
          : SelectedCategory && (
              <HomeCategory
                key={SelectedCategory._id}
                category={SelectedCategory}
              />
            )}
      </div>
      <Footer categories={categories} />
    </div>
  );
}