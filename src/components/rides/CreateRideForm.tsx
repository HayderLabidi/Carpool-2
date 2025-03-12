import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { MapPin, Calendar, Clock, Users, Car, Info } from "lucide-react";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const formSchema = z.object({
  origin: z.string().min(3, { message: "Origin is required" }),
  destination: z.string().min(3, { message: "Destination is required" }),
  departureDate: z.string().min(1, { message: "Departure date is required" }),
  departureTime: z.string().min(1, { message: "Departure time is required" }),
  availableSeats: z.string().min(1, { message: "Available seats is required" }),
  price: z.string().min(1, { message: "Price is required" }),
  vehicleType: z.string().min(1, { message: "Vehicle type is required" }),
  additionalInfo: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface CreateRideFormProps {
  onSubmit?: (values: FormValues) => void;
  isLoading?: boolean;
}

const CreateRideForm = ({
  onSubmit = () => {},
  isLoading = false,
}: CreateRideFormProps) => {
  const [step, setStep] = useState<number>(1);
  const totalSteps = 3;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      origin: "",
      destination: "",
      departureDate: "",
      departureTime: "",
      availableSeats: "1",
      price: "",
      vehicleType: "",
      additionalInfo: "",
    },
  });

  const handleNext = async () => {
    const fieldsToValidate = {
      1: ["origin", "destination"],
      2: ["departureDate", "departureTime", "availableSeats", "price"],
      3: ["vehicleType"],
    }[step];

    const isValid = await form.trigger(fieldsToValidate as any);
    if (isValid) {
      if (step < totalSteps) {
        setStep(step + 1);
      } else {
        form.handleSubmit((data) => onSubmit(data))();
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <Card className="w-full max-w-[700px] mx-auto bg-white">
      <CardHeader>
        <CardTitle>Create a New Ride</CardTitle>
        <CardDescription>
          Share your journey with others by posting your available ride
        </CardDescription>
        <div className="flex justify-between mt-4">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div key={index} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${step > index ? "bg-primary text-primary-foreground" : step === index + 1 ? "bg-primary/80 text-primary-foreground" : "bg-muted text-muted-foreground"}`}
              >
                {index + 1}
              </div>
              {index < totalSteps - 1 && (
                <div
                  className={`h-1 w-16 sm:w-24 md:w-32 ${step > index + 1 ? "bg-primary" : "bg-muted"}`}
                />
              )}
            </div>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-6">
            {step === 1 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-primary">
                  <MapPin size={18} />
                  <h3 className="font-medium">Route Details</h3>
                </div>
                <FormField
                  control={form.control}
                  name="origin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Origin</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. San Francisco, CA"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Enter the starting point of your journey
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="destination"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Destination</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Los Angeles, CA" {...field} />
                      </FormControl>
                      <FormDescription>
                        Enter the end point of your journey
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-primary">
                  <Clock size={18} />
                  <h3 className="font-medium">Schedule & Capacity</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="departureDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Departure Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="departureTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Departure Time</FormLabel>
                        <FormControl>
                          <Input type="time" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="availableSeats"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Available Seats</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select available seats" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                              <SelectItem key={num} value={num.toString()}>
                                {num} {num === 1 ? "seat" : "seats"}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          How many passengers can you take?
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price per Seat ($)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="25"
                            min="0"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Set a fair price for each passenger
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-primary">
                  <Car size={18} />
                  <h3 className="font-medium">Vehicle & Additional Info</h3>
                </div>
                <FormField
                  control={form.control}
                  name="vehicleType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vehicle Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select vehicle type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="sedan">Sedan</SelectItem>
                          <SelectItem value="suv">SUV</SelectItem>
                          <SelectItem value="van">Van</SelectItem>
                          <SelectItem value="truck">Truck</SelectItem>
                          <SelectItem value="coupe">Coupe</SelectItem>
                          <SelectItem value="hatchback">Hatchback</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        What type of vehicle will you be driving?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="additionalInfo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Information</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Any additional details about your ride (e.g. luggage space, pets allowed, etc.)"
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Optional: Add any other relevant information about your
                        ride
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={step === 1 || isLoading}
        >
          Back
        </Button>
        <Button onClick={handleNext} disabled={isLoading}>
          {step === totalSteps ? "Create Ride" : "Next"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CreateRideForm;
