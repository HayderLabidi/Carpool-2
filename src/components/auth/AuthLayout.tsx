import React from "react";
import { cn } from "../lib/utils";
import { Car } from "lucide-react";

interface AuthLayoutProps {
  children?: React.ReactNode;
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
}

const AuthLayout = ({
  children,
  title = "Welcome to RideShare",
  subtitle = "Connect with drivers and passengers for convenient ride sharing",
  backgroundImage = "https://images.unsplash.com/photo-1556122071-e404cb6f31c0?w=1200&q=80",
}: AuthLayoutProps) => {
  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Left side - Auth form */}
      <div className="flex w-full flex-col justify-center space-y-6 px-4 sm:w-1/2 sm:px-8 md:px-12 lg:px-16 xl:px-24">
        <div className="flex items-center gap-2">
          <div className="rounded bg-primary p-2 text-primary-foreground">
            <Car size={24} />
          </div>
          <span className="text-xl font-bold">RideShare</span>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          <p className="text-muted-foreground">{subtitle}</p>
        </div>

        <div className="flex-1">{children}</div>

        <div className="text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} RideShare. All rights reserved.</p>
        </div>
      </div>

      {/* Right side - Background image */}
      <div
        className="hidden sm:block sm:w-1/2 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="h-full w-full bg-black/40 p-8 flex flex-col justify-end">
          <div className="max-w-md text-white">
            <h2 className="text-2xl font-bold mb-2">
              Share rides, save money, reduce emissions
            </h2>
            <p className="text-white/80">
              Join our community of drivers and passengers to make travel more
              affordable, efficient, and environmentally friendly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
