import React from "react";
import { MapPin, Calendar, Clock, Users, Star } from "lucide-react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface RideCardProps {
  driverName?: string;
  driverRating?: number;
  driverAvatar?: string;
  origin?: string;
  destination?: string;
  departureDate?: string;
  departureTime?: string;
  availableSeats?: number;
  price?: number;
  onRequestRide?: () => void;
}

const RideCard = ({
  driverName = "Sarah Johnson",
  driverRating = 4.8,
  driverAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  origin = "San Francisco, CA",
  destination = "Los Angeles, CA",
  departureDate = "June 15, 2023",
  departureTime = "9:00 AM",
  availableSeats = 3,
  price = 45,
  onRequestRide = () => console.log("Ride requested"),
}: RideCardProps) => {
  return (
    <Card className="w-[350px] h-[200px] bg-white overflow-hidden flex flex-col">
      <CardHeader className="p-4 pb-2 flex flex-row items-center space-y-0 gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={driverAvatar} alt={driverName} />
          <AvatarFallback>
            {driverName
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-sm">{driverName}</h3>
            <div className="flex items-center">
              <Star className="h-3.5 w-3.5 text-yellow-500 mr-1 fill-yellow-500" />
              <span className="text-xs font-medium">{driverRating}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0 pb-2 flex-1">
        <div className="flex flex-col space-y-2">
          <div className="flex items-start">
            <MapPin className="h-4 w-4 text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
            <div className="flex flex-col">
              <span className="text-xs font-medium">
                From: <span className="text-gray-700">{origin}</span>
              </span>
              <span className="text-xs font-medium">
                To: <span className="text-gray-700">{destination}</span>
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Calendar className="h-3.5 w-3.5 text-gray-500 mr-1" />
              <span className="text-xs">{departureDate}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-3.5 w-3.5 text-gray-500 mr-1" />
              <span className="text-xs">{departureTime}</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Users className="h-3.5 w-3.5 text-gray-500 mr-1" />
              <span className="text-xs">{availableSeats} seats available</span>
            </div>
            <Badge variant="secondary" className="text-xs">
              ${price}
            </Badge>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-2">
        <Button
          onClick={onRequestRide}
          className="w-full text-xs h-8"
          size="sm"
        >
          Request Ride
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RideCard;
