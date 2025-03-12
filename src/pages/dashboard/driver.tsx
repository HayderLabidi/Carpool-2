import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, BarChart3, Calendar, Users, Car } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import CreateRideForm from "@/components/rides/CreateRideForm";
import RideRequestsList from "@/components/rides/RideRequestsList";

interface DriverDashboardProps {
  userName?: string;
  userAvatar?: string;
  stats?: {
    totalRides: number;
    activeRides: number;
    totalEarnings: number;
    totalPassengers: number;
  };
}

const DriverDashboard = ({
  userName = "John Doe",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  stats = {
    totalRides: 24,
    activeRides: 2,
    totalEarnings: 560,
    totalPassengers: 38,
  },
}: DriverDashboardProps) => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <DashboardLayout
      userRole="driver"
      userName={userName}
      userAvatar={userAvatar}
    >
      <div className="space-y-6 bg-background">
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Driver Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage your rides and view passenger requests.
            </p>
          </div>
          <Button
            className="flex items-center gap-2"
            onClick={() => setActiveTab("create-ride")}
          >
            <PlusCircle size={16} />
            Create New Ride
          </Button>
        </div>

        {/* Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 md:grid-cols-4 w-full">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="create-ride">Create Ride</TabsTrigger>
            <TabsTrigger value="requests">Ride Requests</TabsTrigger>
            <TabsTrigger value="history" className="hidden md:block">
              Ride History
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab Content */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatsCard
                title="Total Rides"
                value={stats.totalRides}
                description="Rides completed"
                icon={<Car className="h-5 w-5 text-primary" />}
              />
              <StatsCard
                title="Active Rides"
                value={stats.activeRides}
                description="Currently scheduled"
                icon={<Calendar className="h-5 w-5 text-primary" />}
              />
              <StatsCard
                title="Total Earnings"
                value={`$${stats.totalEarnings}`}
                description="Lifetime earnings"
                icon={<BarChart3 className="h-5 w-5 text-primary" />}
              />
              <StatsCard
                title="Total Passengers"
                value={stats.totalPassengers}
                description="Passengers transported"
                icon={<Users className="h-5 w-5 text-primary" />}
              />
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Your latest ride activity and updates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-4 border-green-500 pl-4 py-2">
                    <p className="text-sm font-medium">
                      New ride request from Emma Wilson
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Today at 10:30 AM
                    </p>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-4 py-2">
                    <p className="text-sm font-medium">
                      Ride completed with Michael Chen
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Yesterday at 3:45 PM
                    </p>
                  </div>
                  <div className="border-l-4 border-amber-500 pl-4 py-2">
                    <p className="text-sm font-medium">
                      Payment received: $35.00
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Yesterday at 3:50 PM
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Rides */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Rides</CardTitle>
                <CardDescription>
                  Your scheduled rides for the next few days
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start justify-between p-4 border rounded-lg">
                    <div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">
                          June 18, 2023 • 8:30 AM
                        </span>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm">
                          San Francisco, CA → SFO Airport
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          2 passengers • $45
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                  <div className="flex items-start justify-between p-4 border rounded-lg">
                    <div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">
                          June 20, 2023 • 9:45 AM
                        </span>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm">Palo Alto → Mountain View</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          1 passenger • $22
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Create Ride Tab Content */}
          <TabsContent value="create-ride">
            <CreateRideForm
              onSubmit={(data) => {
                console.log("Ride created:", data);
                setActiveTab("overview");
              }}
            />
          </TabsContent>

          {/* Ride Requests Tab Content */}
          <TabsContent value="requests">
            <RideRequestsList />
          </TabsContent>

          {/* Ride History Tab Content */}
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Ride History</CardTitle>
                <CardDescription>View all your past rides</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground py-8">
                  Your ride history will be displayed here. This feature is
                  coming soon.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

interface StatsCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
}

const StatsCard = ({ title, value, description, icon }: StatsCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="p-2 bg-primary/10 rounded-full">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

export default DriverDashboard;
