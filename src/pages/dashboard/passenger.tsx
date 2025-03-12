import React from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import AvailableRidesList from "../../components/rides/AvailableRidesList";
import RideHistory from "../../components/rides/RideHistory";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { Car, Clock, MapPin } from "lucide-react";

const PassengerDashboard = () => {
  // Mock data for the passenger
  const passengerData = {
    name: "Alex Johnson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    role: "passenger",
  };

  // Mock function for requesting a ride
  const handleRequestRide = (rideId: string) => {
    console.log(`Requesting ride with ID: ${rideId}`);
    // In a real app, this would send a request to the backend
  };

  // Mock function for rating a ride
  const handleRateRide = (rideId: string, rating: "positive" | "negative") => {
    console.log(`Rating ride ${rideId} as ${rating}`);
    // In a real app, this would send the rating to the backend
  };

  // Mock function for contacting a driver
  const handleContactDriver = (driverId: string) => {
    console.log(`Contacting driver with ID: ${driverId}`);
    // In a real app, this would open a messaging interface
  };

  return (
    <DashboardLayout
      userRole="passenger"
      userName={passengerData.name}
      userAvatar={passengerData.avatar}
    >
      <div className="space-y-6 bg-background">
        <Tabs defaultValue="available" className="w-full">
          <div className="flex items-center mb-4">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger
                value="available"
                className="flex items-center gap-2"
              >
                <MapPin className="h-4 w-4" />
                Available Rides
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Ride History
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="available" className="mt-0">
            <AvailableRidesList onRequestRide={handleRequestRide} />
          </TabsContent>

          <TabsContent value="history" className="mt-0">
            <RideHistory
              onRateRide={handleRateRide}
              onContactDriver={handleContactDriver}
            />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default PassengerDashboard;
