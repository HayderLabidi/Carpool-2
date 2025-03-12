import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Car, Upload, Info, AlertCircle } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface VehicleRegistrationFormProps {
  onSubmit?: (data: VehicleFormData) => void;
  onBack?: () => void;
  onNext?: () => void;
}

interface VehicleFormData {
  make: string;
  model: string;
  year: string;
  color: string;
  licensePlate: string;
  vehiclePhotos: FileList | null;
}

const VehicleRegistrationForm = ({
  onSubmit = () => {},
  onBack = () => {},
  onNext = () => {},
}: VehicleRegistrationFormProps) => {
  const [vehicleImages, setVehicleImages] = useState<string[]>([
    "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=500&q=80",
  ]);

  const form = useForm<VehicleFormData>({
    defaultValues: {
      make: "",
      model: "",
      year: "",
      color: "",
      licensePlate: "",
      vehiclePhotos: null,
    },
  });

  const handleSubmit = (data: VehicleFormData) => {
    console.log("Vehicle data submitted:", data);
    onSubmit(data);
    onNext();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // In a real app, you would upload these to a server
      // Here we're just creating local URLs for preview
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file),
      );
      setVehicleImages([...vehicleImages, ...newImages]);
    }
  };

  const carYears = Array.from({ length: 30 }, (_, i) => {
    const year = new Date().getFullYear() - i;
    return year.toString();
  });

  const carColors = [
    "Black",
    "White",
    "Silver",
    "Gray",
    "Red",
    "Blue",
    "Green",
    "Yellow",
    "Orange",
    "Brown",
    "Purple",
    "Gold",
    "Other",
  ];

  return (
    <div className="w-full max-w-3xl mx-auto bg-background p-6 rounded-lg">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 bg-primary/10 rounded-full">
              <Car className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">Vehicle Registration</CardTitle>
          </div>
          <CardDescription>
            Please provide details about the vehicle you'll be using for rides.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="make"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vehicle Make</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Toyota, Honda, Ford, etc."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="model"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vehicle Model</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Camry, Civic, F-150, etc."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Year</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select year" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {carYears.map((year) => (
                            <SelectItem key={year} value={year}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="color"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Color</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select color" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {carColors.map((color) => (
                            <SelectItem key={color} value={color.toLowerCase()}>
                              {color}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="licensePlate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>License Plate Number</FormLabel>
                      <FormControl>
                        <Input placeholder="ABC123" {...field} />
                      </FormControl>
                      <FormDescription>
                        Enter your vehicle's license plate number
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4">
                <div>
                  <FormLabel className="block mb-2">Vehicle Photos</FormLabel>
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Please upload at least one clear photo of your vehicle
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                    {vehicleImages.map((image, index) => (
                      <div
                        key={index}
                        className="relative aspect-video rounded-md overflow-hidden border"
                      >
                        <img
                          src={image}
                          alt={`Vehicle ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                    <label className="flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-md aspect-video cursor-pointer hover:bg-accent/50 transition-colors">
                      <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                      <span className="text-sm text-muted-foreground">
                        Add Photo
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </label>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Upload photos of the front, back, and sides of your vehicle.
                    Photos should clearly show the vehicle's color and
                    condition.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                <Info className="h-4 w-4" />
                <p>
                  Your vehicle information will be shown to passengers to help
                  them identify your car.
                </p>
              </div>

              <CardFooter className="px-0 pt-6 flex justify-between">
                <Button type="button" variant="outline" onClick={onBack}>
                  Back
                </Button>
                <Button type="submit">Continue</Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default VehicleRegistrationForm;
