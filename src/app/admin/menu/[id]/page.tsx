import { SideBar } from "@/app/(components)/Sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CategoryModal } from "@/app/(components)/Category";
import { EachCategory } from "@/app/(components)/EachCategory";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
export default function Home() {
  return (
    <div className={`w-[1440px] mx-auto ${inter.className}`}>
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
          {/* <EachCategory  /> */}
        </div>
      </div>
    </div>
  );
}
