import { SideBar } from "../(components)/Sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CategoryModal } from "../(components)/Category";
export default function Home() {
  return (
    <div className="w-[1440px] mx-auto">
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
        </div>
      </div>
    </div>
  );
}
