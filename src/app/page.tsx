"use client";
import { useState, useEffect } from "react";
import { HeroSection } from "./components/Hero";
import { HomePageCategory } from "./components/HomePageCategory";
import { EachCategory } from "./components/EachCategory";
import { HomeCategory } from "./components/HomeCategory";
import { useSearchParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { useAuthFetch } from "./components/useFetchData";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { HeaderLogin } from "./components/Header-login";
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
      <SignedOut>
        <HeaderLogin />
      </SignedOut>
      <SignedIn>
        <Header />
      </SignedIn>
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
              } border-none text-lg rounded-full font-normal text-nowrap no-scrollbar`}
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