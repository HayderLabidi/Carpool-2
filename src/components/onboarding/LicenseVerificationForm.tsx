import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Upload, FileText, AlertCircle, CheckCircle } from "lucide-react";

interface LicenseVerificationFormProps {
  onSubmit?: (data: LicenseFormData) => void;
  onBack?: () => void;
  isLoading?: boolean;
}

interface LicenseFormData {
  licenseNumber: string;
  expirationDate: string;
  frontImage: File | null;
  backImage: File | null;
}

const LicenseVerificationForm = ({
  onSubmit = () => {},
  onBack = () => {},
  isLoading = false,
}: LicenseVerificationFormProps) => {
  const [frontImagePreview, setFrontImagePreview] = useState<string | null>(
    null,
  );
  const [backImagePreview, setBackImagePreview] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<{
    front: "idle" | "uploading" | "success" | "error";
    back: "idle" | "uploading" | "success" | "error";
  }>({
    front: "idle",
    back: "idle",
  });

  const form = useForm<LicenseFormData>({
    defaultValues: {
      licenseNumber: "",
      expirationDate: "",
      frontImage: null,
      backImage: null,
    },
  });

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    side: "front" | "back",
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Simulate upload process
    setUploadStatus((prev) => ({ ...prev, [side]: "uploading" }));

    // Create a preview URL
    const reader = new FileReader();
    reader.onload = () => {
      if (side === "front") {
        setFrontImagePreview(reader.result as string);
        form.setValue("frontImage", file);
      } else {
        setBackImagePreview(reader.result as string);
        form.setValue("backImage", file);
      }

      // Simulate successful upload after 1 second
      setTimeout(() => {
        setUploadStatus((prev) => ({ ...prev, [side]: "success" }));
      }, 1000);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = form.handleSubmit((data) => {
    onSubmit(data);
  });

  return (
    <div className="w-full max-w-3xl mx-auto bg-background p-6 rounded-lg">
      <Card>
        <CardHeader>
          <CardTitle>License Verification</CardTitle>
          <CardDescription>
            Please provide your driver's license information for verification
            purposes. This information will be securely stored and used only for
            verification.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="licenseNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>License Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your license number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="expirationDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expiration Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="space-y-4">
                  <FormLabel>Front of License</FormLabel>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50 h-48 relative overflow-hidden">
                    {frontImagePreview ? (
                      <div className="relative w-full h-full">
                        <img
                          src={frontImagePreview}
                          alt="License front"
                          className="w-full h-full object-contain"
                        />
                        {uploadStatus.front === "uploading" && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <div className="text-white">Uploading...</div>
                          </div>
                        )}
                        {uploadStatus.front === "success" && (
                          <div className="absolute top-2 right-2 bg-green-500 text-white p-1 rounded-full">
                            <CheckCircle size={16} />
                          </div>
                        )}
                      </div>
                    ) : (
                      <>
                        <Upload className="h-10 w-10 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500">
                          Click to upload front of license
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          PNG, JPG up to 5MB
                        </p>
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={(e) => handleFileChange(e, "front")}
                    />
                  </div>
                  {uploadStatus.front === "error" && (
                    <div className="flex items-center text-red-500 text-sm">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      Upload failed. Please try again.
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <FormLabel>Back of License</FormLabel>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50 h-48 relative overflow-hidden">
                    {backImagePreview ? (
                      <div className="relative w-full h-full">
                        <img
                          src={backImagePreview}
                          alt="License back"
                          className="w-full h-full object-contain"
                        />
                        {uploadStatus.back === "uploading" && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <div className="text-white">Uploading...</div>
                          </div>
                        )}
                        {uploadStatus.back === "success" && (
                          <div className="absolute top-2 right-2 bg-green-500 text-white p-1 rounded-full">
                            <CheckCircle size={16} />
                          </div>
                        )}
                      </div>
                    ) : (
                      <>
                        <Upload className="h-10 w-10 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500">
                          Click to upload back of license
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          PNG, JPG up to 5MB
                        </p>
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={(e) => handleFileChange(e, "back")}
                    />
                  </div>
                  {uploadStatus.back === "error" && (
                    <div className="flex items-center text-red-500 text-sm">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      Upload failed. Please try again.
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <FormDescription>
                  <div className="flex items-start">
                    <FileText className="h-5 w-5 text-muted-foreground mr-2 mt-0.5" />
                    <span>
                      Your license information is securely stored and will only
                      be used for verification purposes. We comply with all data
                      protection regulations.
                    </span>
                  </div>
                </FormDescription>
              </div>

              <CardFooter className="flex justify-between px-0 pt-6">
                <Button type="button" variant="outline" onClick={onBack}>
                  Back
                </Button>
                <Button
                  type="submit"
                  disabled={
                    isLoading ||
                    !form.formState.isValid ||
                    uploadStatus.front !== "success" ||
                    uploadStatus.back !== "success"
                  }
                >
                  {isLoading ? "Verifying..." : "Submit for Verification"}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LicenseVerificationForm;
