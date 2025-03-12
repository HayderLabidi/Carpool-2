import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { User, Camera, Upload, Save } from "lucide-react";

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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const formSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  address: z
    .string()
    .min(5, { message: "Address must be at least 5 characters" }),
  bio: z
    .string()
    .max(500, { message: "Bio must not exceed 500 characters" })
    .optional(),
});

interface ProfileSettingsProps {
  userData?: {
    fullName?: string;
    email?: string;
    phone?: string;
    address?: string;
    bio?: string;
    avatarUrl?: string;
  };
  onSave?: (data: z.infer<typeof formSchema>) => void;
}

const ProfileSettings = ({
  userData = {
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "(555) 123-4567",
    address: "123 Main St, San Francisco, CA 94105",
    bio: "Frequent traveler looking for convenient rides around the city. I enjoy meeting new people during shared rides.",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  },
  onSave = (data) => console.log("Profile data saved:", data),
}: ProfileSettingsProps) => {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    userData.avatarUrl || null,
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: userData.fullName || "",
      email: userData.email || "",
      phone: userData.phone || "",
      address: userData.address || "",
      bio: userData.bio || "",
    },
  });

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, you would upload this file to a server
      // For now, we'll just create a local preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    onSave(data);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto bg-background">
      <CardHeader>
        <CardTitle>Profile Settings</CardTitle>
        <CardDescription>
          Update your personal information and profile picture
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Avatar Section */}
          <div className="flex flex-col items-center space-y-4 w-full md:w-1/3">
            <Avatar className="h-32 w-32 border-2 border-muted">
              <AvatarImage src={avatarPreview || ""} alt="Profile picture" />
              <AvatarFallback className="bg-primary/10 text-primary text-4xl">
                <User size={48} />
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-col items-center gap-2 w-full">
              <label htmlFor="avatar-upload" className="cursor-pointer w-full">
                <div className="flex items-center justify-center gap-2 p-2 border border-input rounded-md bg-background hover:bg-accent transition-colors w-full">
                  <Camera size={16} />
                  <span>Change Picture</span>
                </div>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </label>

              <p className="text-xs text-muted-foreground text-center mt-2">
                Upload a square image for best results. Maximum file size: 5MB.
              </p>
            </div>
          </div>

          {/* Form Section */}
          <div className="flex-1">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="your.email@example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="(555) 123-4567" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us a little about yourself"
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        This will be visible to other users on the platform.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline">Cancel</Button>
        <Button onClick={form.handleSubmit(onSubmit)} className="gap-2">
          <Save size={16} />
          Save Changes
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProfileSettings;
