import React from "react";
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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Car, User } from "lucide-react";

interface RoleSelectionProps {
  onRoleSelect?: (role: "driver" | "passenger") => void;
  selectedRole?: "driver" | "passenger" | null;
}

const RoleSelection = ({
  onRoleSelect = () => {},
  selectedRole = null,
}: RoleSelectionProps) => {
  return (
    <div className="w-full max-w-md mx-auto bg-background p-4">
      <h2 className="text-xl font-semibold text-center mb-4">
        Choose your role
      </h2>
      <p className="text-muted-foreground text-center mb-6">
        Select how you want to use our ride sharing platform
      </p>

      <div className="flex flex-col sm:flex-row gap-4 w-full">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Card
                className={`w-full cursor-pointer transition-all hover:border-primary ${selectedRole === "driver" ? "border-2 border-primary" : ""}`}
                onClick={() => onRoleSelect("driver")}
              >
                <CardHeader className="text-center">
                  <div className="mx-auto bg-primary/10 p-3 rounded-full w-16 h-16 flex items-center justify-center">
                    <Car className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="mt-2">Driver</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    Offer rides and earn money by driving passengers to their
                    destinations
                  </CardDescription>
                </CardContent>
                <CardFooter className="flex justify-center pb-4">
                  <Button
                    variant={selectedRole === "driver" ? "default" : "outline"}
                    className="w-full"
                    onClick={() => onRoleSelect("driver")}
                  >
                    Select Driver
                  </Button>
                </CardFooter>
              </Card>
            </TooltipTrigger>
            <TooltipContent>
              <p>Drive and earn money</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Card
                className={`w-full cursor-pointer transition-all hover:border-primary ${selectedRole === "passenger" ? "border-2 border-primary" : ""}`}
                onClick={() => onRoleSelect("passenger")}
              >
                <CardHeader className="text-center">
                  <div className="mx-auto bg-primary/10 p-3 rounded-full w-16 h-16 flex items-center justify-center">
                    <User className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="mt-2">Passenger</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    Find rides to your destination with our network of trusted
                    drivers
                  </CardDescription>
                </CardContent>
                <CardFooter className="flex justify-center pb-4">
                  <Button
                    variant={
                      selectedRole === "passenger" ? "default" : "outline"
                    }
                    className="w-full"
                    onClick={() => onRoleSelect("passenger")}
                  >
                    Select Passenger
                  </Button>
                </CardFooter>
              </Card>
            </TooltipTrigger>
            <TooltipContent>
              <p>Find rides to your destination</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default RoleSelection;
