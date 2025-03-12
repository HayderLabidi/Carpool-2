import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import {
  Check,
  X,
  MoreVertical,
  MessageSquare,
  Calendar,
  Clock,
  MapPin,
} from "lucide-react";

interface RideRequest {
  id: string;
  passengerName: string;
  passengerAvatar: string;
  passengerRating: number;
  origin: string;
  destination: string;
  requestDate: string;
  requestTime: string;
  status: "pending" | "accepted" | "declined";
  message?: string;
}

interface RideRequestsListProps {
  requests?: RideRequest[];
  onAccept?: (requestId: string) => void;
  onDecline?: (requestId: string) => void;
  onMessage?: (requestId: string) => void;
}

const RideRequestsList = ({
  requests = [
    {
      id: "req-001",
      passengerName: "Emma Wilson",
      passengerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
      passengerRating: 4.7,
      origin: "Downtown San Francisco",
      destination: "SFO Airport",
      requestDate: "June 18, 2023",
      requestTime: "8:30 AM",
      status: "pending",
      message:
        "Hi, I need to catch a flight at 11 AM. Can you confirm if this works?",
    },
    {
      id: "req-002",
      passengerName: "Michael Chen",
      passengerAvatar:
        "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      passengerRating: 4.9,
      origin: "Berkeley",
      destination: "San Jose",
      requestDate: "June 19, 2023",
      requestTime: "2:15 PM",
      status: "pending",
    },
    {
      id: "req-003",
      passengerName: "Sophia Rodriguez",
      passengerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia",
      passengerRating: 4.5,
      origin: "Palo Alto",
      destination: "Mountain View",
      requestDate: "June 20, 2023",
      requestTime: "9:45 AM",
      status: "pending",
      message: "I can meet you at the Caltrain station if that's easier.",
    },
  ],
  onAccept = (id) => console.log(`Accepted request ${id}`),
  onDecline = (id) => console.log(`Declined request ${id}`),
  onMessage = (id) => console.log(`Messaging passenger ${id}`),
}: RideRequestsListProps) => {
  const [selectedRequest, setSelectedRequest] = useState<RideRequest | null>(
    null,
  );
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);
  const [isDeclineDialogOpen, setIsDeclineDialogOpen] = useState(false);

  const handleAccept = (request: RideRequest) => {
    onAccept(request.id);
  };

  const handleDecline = (request: RideRequest) => {
    setSelectedRequest(request);
    setIsDeclineDialogOpen(true);
  };

  const confirmDecline = () => {
    if (selectedRequest) {
      onDecline(selectedRequest.id);
      setIsDeclineDialogOpen(false);
    }
  };

  const handleMessage = (request: RideRequest) => {
    setSelectedRequest(request);
    setIsMessageDialogOpen(true);
  };

  const pendingRequests = requests.filter((req) => req.status === "pending");

  return (
    <div className="w-full max-w-4xl mx-auto bg-background p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Ride Requests</h2>
        <Badge variant="secondary" className="text-sm">
          {pendingRequests.length} Pending
        </Badge>
      </div>

      {pendingRequests.length === 0 ? (
        <Card className="w-full p-8 text-center">
          <CardDescription>
            No pending ride requests at the moment.
          </CardDescription>
        </Card>
      ) : (
        <div className="space-y-4">
          {pendingRequests.map((request) => (
            <Card key={request.id} className="w-full overflow-hidden">
              <CardHeader className="p-4 pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage
                        src={request.passengerAvatar}
                        alt={request.passengerName}
                      />
                      <AvatarFallback>
                        {request.passengerName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">
                        {request.passengerName}
                      </CardTitle>
                      <div className="flex items-center mt-1">
                        <span className="text-xs text-yellow-500 mr-1">★</span>
                        <span className="text-xs text-muted-foreground">
                          {request.passengerRating}
                        </span>
                      </div>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleMessage(request)}>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        View Message
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleAccept(request)}>
                        <Check className="mr-2 h-4 w-4 text-green-500" />
                        Accept Request
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDecline(request)}>
                        <X className="mr-2 h-4 w-4 text-red-500" />
                        Decline Request
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-2">
                <div className="space-y-2">
                  <div className="flex items-start">
                    <MapPin className="h-4 w-4 text-muted-foreground mr-2 mt-0.5 flex-shrink-0" />
                    <div className="flex flex-col">
                      <span className="text-xs font-medium">
                        From:{" "}
                        <span className="text-muted-foreground">
                          {request.origin}
                        </span>
                      </span>
                      <span className="text-xs font-medium">
                        To:{" "}
                        <span className="text-muted-foreground">
                          {request.destination}
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Calendar className="h-3.5 w-3.5 text-muted-foreground mr-1" />
                      <span className="text-xs">{request.requestDate}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-3.5 w-3.5 text-muted-foreground mr-1" />
                      <span className="text-xs">{request.requestTime}</span>
                    </div>
                  </div>
                  {request.message && (
                    <div className="mt-2 p-2 bg-muted rounded-md">
                      <p className="text-xs italic">"{request.message}"</p>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-end space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDecline(request)}
                >
                  Decline
                </Button>
                <Button size="sm" onClick={() => handleAccept(request)}>
                  Accept
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Message Dialog */}
      <Dialog open={isMessageDialogOpen} onOpenChange={setIsMessageDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Message from {selectedRequest?.passengerName}
            </DialogTitle>
            <DialogDescription>
              Review the passenger's message
            </DialogDescription>
          </DialogHeader>
          <div className="p-4 bg-muted rounded-md my-4">
            <p className="text-sm">
              {selectedRequest?.message ||
                "No message provided by the passenger."}
            </p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsMessageDialogOpen(false)}
            >
              Close
            </Button>
            <Button
              onClick={() => {
                onMessage(selectedRequest?.id || "");
                setIsMessageDialogOpen(false);
              }}
            >
              Reply
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Decline Confirmation Dialog */}
      <AlertDialog
        open={isDeclineDialogOpen}
        onOpenChange={setIsDeclineDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Decline Ride Request</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to decline the ride request from{" "}
              {selectedRequest?.passengerName}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDecline}
              className="bg-destructive text-destructive-foreground"
            >
              Decline Request
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default RideRequestsList;
