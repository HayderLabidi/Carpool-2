import React, { useState } from "react";
import {
  MapPin,
  Calendar,
  Clock,
  Users,
  Star,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

interface RideHistoryProps {
  rides?: RideHistoryItem[];
  onRateRide?: (rideId: string, rating: "positive" | "negative") => void;
  onContactDriver?: (driverId: string) => void;
}

interface RideHistoryItem {
  id: string;
  driverId: string;
  driverName: string;
  driverRating: number;
  driverAvatar: string;
  origin: string;
  destination: string;
  departureDate: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  status: "completed" | "cancelled" | "upcoming";
  rated?: boolean;
}

const RideHistory = ({
  rides = [
    {
      id: "ride-1",
      driverId: "driver-1",
      driverName: "Michael Chen",
      driverRating: 4.9,
      driverAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      origin: "San Francisco, CA",
      destination: "Palo Alto, CA",
      departureDate: "May 10, 2023",
      departureTime: "8:30 AM",
      arrivalTime: "9:15 AM",
      price: 25,
      status: "completed",
      rated: true,
    },
    {
      id: "ride-2",
      driverId: "driver-2",
      driverName: "Jessica Williams",
      driverRating: 4.7,
      driverAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica",
      origin: "Oakland, CA",
      destination: "San Jose, CA",
      departureDate: "May 15, 2023",
      departureTime: "2:00 PM",
      arrivalTime: "3:30 PM",
      price: 35,
      status: "completed",
      rated: false,
    },
    {
      id: "ride-3",
      driverId: "driver-3",
      driverName: "David Rodriguez",
      driverRating: 4.8,
      driverAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
      origin: "Berkeley, CA",
      destination: "San Francisco, CA",
      departureDate: "May 20, 2023",
      departureTime: "7:45 AM",
      arrivalTime: "8:30 AM",
      price: 22,
      status: "cancelled",
    },
    {
      id: "ride-4",
      driverId: "driver-4",
      driverName: "Sarah Johnson",
      driverRating: 4.9,
      driverAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      origin: "San Francisco, CA",
      destination: "Mountain View, CA",
      departureDate: "June 5, 2023",
      departureTime: "9:00 AM",
      arrivalTime: "9:45 AM",
      price: 28,
      status: "upcoming",
    },
  ],
  onRateRide = (rideId, rating) =>
    console.log(`Rated ride ${rideId} as ${rating}`),
  onContactDriver = (driverId) => console.log(`Contacting driver ${driverId}`),
}: RideHistoryProps) => {
  const [activeTab, setActiveTab] = useState<string>("all");

  const filteredRides = rides.filter((ride) => {
    if (activeTab === "all") return true;
    if (activeTab === "completed") return ride.status === "completed";
    if (activeTab === "cancelled") return ride.status === "cancelled";
    if (activeTab === "upcoming") return ride.status === "upcoming";
    return true;
  });

  return (
    <div className="w-full max-w-4xl mx-auto bg-background p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Ride History</h2>
        <p className="text-muted-foreground">
          View and manage your past and upcoming rides
        </p>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="all">All Rides</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {filteredRides.length > 0 ? (
            filteredRides.map((ride) => (
              <RideHistoryCard
                key={ride.id}
                ride={ride}
                onRateRide={onRateRide}
                onContactDriver={onContactDriver}
              />
            ))
          ) : (
            <EmptyState message="No rides found" />
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {filteredRides.length > 0 ? (
            filteredRides.map((ride) => (
              <RideHistoryCard
                key={ride.id}
                ride={ride}
                onRateRide={onRateRide}
                onContactDriver={onContactDriver}
              />
            ))
          ) : (
            <EmptyState message="No completed rides found" />
          )}
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-4">
          {filteredRides.length > 0 ? (
            filteredRides.map((ride) => (
              <RideHistoryCard
                key={ride.id}
                ride={ride}
                onRateRide={onRateRide}
                onContactDriver={onContactDriver}
              />
            ))
          ) : (
            <EmptyState message="No upcoming rides found" />
          )}
        </TabsContent>

        <TabsContent value="cancelled" className="space-y-4">
          {filteredRides.length > 0 ? (
            filteredRides.map((ride) => (
              <RideHistoryCard
                key={ride.id}
                ride={ride}
                onRateRide={onRateRide}
                onContactDriver={onContactDriver}
              />
            ))
          ) : (
            <EmptyState message="No cancelled rides found" />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface RideHistoryCardProps {
  ride: RideHistoryItem;
  onRateRide: (rideId: string, rating: "positive" | "negative") => void;
  onContactDriver: (driverId: string) => void;
}

const RideHistoryCard = ({
  ride,
  onRateRide,
  onContactDriver,
}: RideHistoryCardProps) => {
  const [isRated, setIsRated] = useState<boolean>(ride.rated || false);

  const handleRateRide = (rating: "positive" | "negative") => {
    onRateRide(ride.id, rating);
    setIsRated(true);
  };

  const getStatusBadge = () => {
    switch (ride.status) {
      case "completed":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            Completed
          </Badge>
        );
      case "cancelled":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            Cancelled
          </Badge>
        );
      case "upcoming":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            Upcoming
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="w-full bg-white overflow-hidden">
      <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={ride.driverAvatar} alt={ride.driverName} />
            <AvatarFallback>
              {ride.driverName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-medium text-sm">{ride.driverName}</h3>
              <div className="flex items-center">
                <Star className="h-3.5 w-3.5 text-yellow-500 mr-1 fill-yellow-500" />
                <span className="text-xs font-medium">{ride.driverRating}</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              {ride.departureDate}
            </p>
          </div>
        </div>
        {getStatusBadge()}
      </CardHeader>

      <CardContent className="p-4 pt-2 pb-3">
        <div className="flex flex-col space-y-3">
          <div className="flex items-start">
            <MapPin className="h-4 w-4 text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
            <div className="flex flex-col">
              <span className="text-xs font-medium">
                From: <span className="text-gray-700">{ride.origin}</span>
              </span>
              <span className="text-xs font-medium">
                To: <span className="text-gray-700">{ride.destination}</span>
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Clock className="h-3.5 w-3.5 text-gray-500 mr-1" />
                <span className="text-xs">
                  {ride.departureTime} - {ride.arrivalTime}
                </span>
              </div>
            </div>
            <Badge variant="secondary" className="text-xs">
              ${ride.price}
            </Badge>
          </div>
        </div>
      </CardContent>

      <Separator />

      <CardFooter className="p-4 flex justify-between">
        {ride.status === "completed" && !isRated ? (
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">
              Rate this ride:
            </span>
            <Button
              variant="outline"
              size="sm"
              className="h-8 text-xs gap-1"
              onClick={() => handleRateRide("positive")}
            >
              <ThumbsUp className="h-3.5 w-3.5" /> Good
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 text-xs gap-1"
              onClick={() => handleRateRide("negative")}
            >
              <ThumbsDown className="h-3.5 w-3.5" /> Bad
            </Button>
          </div>
        ) : ride.status === "completed" && isRated ? (
          <span className="text-xs text-muted-foreground">
            Thank you for rating this ride
          </span>
        ) : (
          <div></div>
        )}

        <Button
          variant="ghost"
          size="sm"
          className="h-8 text-xs"
          onClick={() => onContactDriver(ride.driverId)}
        >
          Contact Driver
        </Button>
      </CardFooter>
    </Card>
  );
};

interface EmptyStateProps {
  message: string;
}

const EmptyState = ({ message = "No data available" }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 border rounded-lg bg-gray-50">
      <Clock className="h-12 w-12 text-gray-300 mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-1">{message}</h3>
      <p className="text-sm text-gray-500">
        Your ride history will appear here
      </p>
    </div>
  );
};

export default RideHistory;
