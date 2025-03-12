import React, { useState } from "react";
import {
  Search,
  MapPin,
  Calendar,
  Filter,
  SlidersHorizontal,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import RideCard from "./RideCard";

interface AvailableRidesListProps {
  rides?: Array<{
    id: string;
    driverName: string;
    driverRating: number;
    driverAvatar: string;
    origin: string;
    destination: string;
    departureDate: string;
    departureTime: string;
    availableSeats: number;
    price: number;
  }>;
  onRequestRide?: (rideId: string) => void;
}

const AvailableRidesList = ({
  rides = [
    {
      id: "1",
      driverName: "Sarah Johnson",
      driverRating: 4.8,
      driverAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      origin: "San Francisco, CA",
      destination: "Los Angeles, CA",
      departureDate: "June 15, 2023",
      departureTime: "9:00 AM",
      availableSeats: 3,
      price: 45,
    },
    {
      id: "2",
      driverName: "Michael Chen",
      driverRating: 4.9,
      driverAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      origin: "New York, NY",
      destination: "Boston, MA",
      departureDate: "June 18, 2023",
      departureTime: "10:30 AM",
      availableSeats: 2,
      price: 35,
    },
    {
      id: "3",
      driverName: "Jessica Williams",
      driverRating: 4.7,
      driverAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica",
      origin: "Chicago, IL",
      destination: "Detroit, MI",
      departureDate: "June 20, 2023",
      departureTime: "8:15 AM",
      availableSeats: 4,
      price: 30,
    },
    {
      id: "4",
      driverName: "David Rodriguez",
      driverRating: 4.6,
      driverAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
      origin: "Seattle, WA",
      destination: "Portland, OR",
      departureDate: "June 22, 2023",
      departureTime: "7:45 AM",
      availableSeats: 1,
      price: 25,
    },
    {
      id: "5",
      driverName: "Emily Thompson",
      driverRating: 5.0,
      driverAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
      origin: "Austin, TX",
      destination: "Houston, TX",
      departureDate: "June 25, 2023",
      departureTime: "11:00 AM",
      availableSeats: 3,
      price: 28,
    },
    {
      id: "6",
      driverName: "James Wilson",
      driverRating: 4.5,
      driverAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
      origin: "Denver, CO",
      destination: "Salt Lake City, UT",
      departureDate: "June 28, 2023",
      departureTime: "6:30 AM",
      availableSeats: 2,
      price: 40,
    },
  ],
  onRequestRide = (rideId) => console.log(`Requesting ride ${rideId}`),
}: AvailableRidesListProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // Filter rides based on search query and other filters
  const filteredRides = rides.filter((ride) => {
    const matchesSearch =
      searchQuery === "" ||
      ride.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ride.destination.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTab =
      selectedTab === "all" ||
      (selectedTab === "today" &&
        ride.departureDate ===
          new Date().toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })) ||
      (selectedTab === "tomorrow" &&
        ride.departureDate ===
          new Date(Date.now() + 86400000).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          }));

    const matchesPrice =
      ride.price >= priceRange[0] && ride.price <= priceRange[1];

    const matchesDate =
      !selectedDate || ride.departureDate.includes(selectedDate);

    return matchesSearch && matchesTab && matchesPrice && matchesDate;
  });

  return (
    <div className="w-full max-w-5xl mx-auto p-6 bg-background">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Find Available Rides</h1>
        <p className="text-muted-foreground">
          Search for rides to your destination from our trusted drivers
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search by origin or destination"
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="flex gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{selectedDate || "Select Date"}</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Select Date</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        "June 15",
                        "June 16",
                        "June 17",
                        "June 18",
                        "June 19",
                        "June 20",
                      ].map((date) => (
                        <Button
                          key={date}
                          variant={
                            selectedDate === date ? "default" : "outline"
                          }
                          className="text-xs"
                          onClick={() =>
                            setSelectedDate(selectedDate === date ? null : date)
                          }
                        >
                          {date}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  <SlidersHorizontal className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Price Range</h4>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">${priceRange[0]}</span>
                      <span className="text-sm">${priceRange[1]}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant={
                          priceRange[0] === 0 && priceRange[1] === 100
                            ? "default"
                            : "outline"
                        }
                        className="text-xs"
                        onClick={() => setPriceRange([0, 100])}
                      >
                        All Prices
                      </Button>
                      <Button
                        variant={
                          priceRange[0] === 0 && priceRange[1] === 30
                            ? "default"
                            : "outline"
                        }
                        className="text-xs"
                        onClick={() => setPriceRange([0, 30])}
                      >
                        Under $30
                      </Button>
                      <Button
                        variant={
                          priceRange[0] === 30 && priceRange[1] === 50
                            ? "default"
                            : "outline"
                        }
                        className="text-xs"
                        onClick={() => setPriceRange([30, 50])}
                      >
                        $30 - $50
                      </Button>
                      <Button
                        variant={
                          priceRange[0] === 50 && priceRange[1] === 100
                            ? "default"
                            : "outline"
                        }
                        className="text-xs"
                        onClick={() => setPriceRange([50, 100])}
                      >
                        $50+
                      </Button>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <h4 className="font-medium">Sort By</h4>
                    <Select defaultValue="departure">
                      <SelectTrigger>
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="departure">
                          Departure Time
                        </SelectItem>
                        <SelectItem value="price-low">
                          Price: Low to High
                        </SelectItem>
                        <SelectItem value="price-high">
                          Price: High to Low
                        </SelectItem>
                        <SelectItem value="rating">Driver Rating</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <Tabs
          defaultValue="all"
          className="w-full"
          onValueChange={setSelectedTab}
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All Rides</TabsTrigger>
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="tomorrow">Tomorrow</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Results Section */}
      <div className="space-y-4">
        {filteredRides.length > 0 ? (
          <>
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">
                {filteredRides.length} rides available
              </p>
              <Badge variant="outline" className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {searchQuery || "All locations"}
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredRides.map((ride) => (
                <RideCard
                  key={ride.id}
                  driverName={ride.driverName}
                  driverRating={ride.driverRating}
                  driverAvatar={ride.driverAvatar}
                  origin={ride.origin}
                  destination={ride.destination}
                  departureDate={ride.departureDate}
                  departureTime={ride.departureTime}
                  availableSeats={ride.availableSeats}
                  price={ride.price}
                  onRequestRide={() => onRequestRide(ride.id)}
                />
              ))}
            </div>
          </>
        ) : (
          <Card className="w-full">
            <CardContent className="flex flex-col items-center justify-center py-10">
              <div className="rounded-full bg-muted p-3 mb-4">
                <Search className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">No rides found</h3>
              <p className="text-muted-foreground text-center max-w-md">
                We couldn't find any rides matching your search criteria. Try
                adjusting your filters or search for a different location.
              </p>
              <Button
                className="mt-4"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedTab("all");
                  setPriceRange([0, 100]);
                  setSelectedDate(null);
                }}
              >
                Clear All Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AvailableRidesList;
