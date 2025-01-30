"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  SignedIn,
  SignedOut,
  SignIn,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
export default function LoginPage() {
  // const { user } = useUser();
  // if (!user) {
  //   return <SignIn />;
  // }
  return (
    <div className="w-screen bg-white h-screen flex justify-center items-center gap-12">
      <div>
        <SignedOut>
          <SignIn />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>

        {/* <Card className="w-[416px] outline-none">
          <CardHeader>
            <CardTitle>Create your account</CardTitle>
            <CardDescription>
              Sign up to explore your favorite dishes.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <Input placeholder="Enter your email address" />
            <Button variant="outline" className="flex justify-center">
              <h1 className="">Lets Go</h1>
            </Button>
          </CardContent>
          <CardFooter className="flex justify-center gap-2 items-center">
            <p className="text-[#71717A] font-normal">
              Already have an account?
            </p>
            <span className="text-[#2563EB]">Log in</span>
          </CardFooter>
        </Card> */}
      </div>
      <div className="w-[856px] h-[904px] bg-[url(/login-bg.png)] bg-cover bg-no-repeat bg-center rounded-lg"></div>
    </div>
  );
}