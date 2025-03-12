import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
import PersonalInfoForm from "./PersonalInfoForm";
import VehicleRegistrationForm from "./VehicleRegistrationForm";
import LicenseVerificationForm from "./LicenseVerificationForm";

interface DriverOnboardingProps {
  onComplete?: () => void;
  initialStep?: number;
}

const DriverOnboarding = ({
  onComplete = () => {},
  initialStep = 1,
}: DriverOnboardingProps) => {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [formData, setFormData] = useState({
    personalInfo: {},
    vehicleInfo: {},
    licenseInfo: {},
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const steps = [
    { id: 1, title: "Personal Information" },
    { id: 2, title: "Vehicle Registration" },
    { id: 3, title: "License Verification" },
  ];

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePersonalInfoSubmit = (data: any) => {
    setFormData({ ...formData, personalInfo: data });
    handleNext();
  };

  const handleVehicleInfoSubmit = (data: any) => {
    setFormData({ ...formData, vehicleInfo: data });
    handleNext();
  };

  const handleLicenseInfoSubmit = (data: any) => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setFormData({ ...formData, licenseInfo: data });
      setIsSubmitting(false);
      onComplete();
    }, 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-background">
      <Card className="w-full">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-bold text-center">
            Driver Onboarding
          </CardTitle>
          <div className="flex justify-center mt-6">
            <div className="flex items-center">
              {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full ${currentStep >= step.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"} transition-colors`}
                  >
                    {currentStep > step.id ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <span>{step.id}</span>
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`h-1 w-16 sm:w-24 md:w-32 ${currentStep > step.id ? "bg-primary" : "bg-muted"}`}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="flex justify-center mt-2">
            <p className="text-sm font-medium">
              Step {currentStep}: {steps[currentStep - 1].title}
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={currentStep.toString()} className="mt-4">
            <TabsContent value="1" className="mt-0">
              <PersonalInfoForm onSubmit={handlePersonalInfoSubmit} />
            </TabsContent>
            <TabsContent value="2" className="mt-0">
              <VehicleRegistrationForm
                onSubmit={handleVehicleInfoSubmit}
                onBack={handleBack}
                onNext={handleNext}
              />
            </TabsContent>
            <TabsContent value="3" className="mt-0">
              <LicenseVerificationForm
                onSubmit={handleLicenseInfoSubmit}
                onBack={handleBack}
                isLoading={isSubmitting}
              />
            </TabsContent>
          </Tabs>

          <div className="flex justify-between mt-8">
            {currentStep > 1 && currentStep < 3 && (
              <Button
                variant="outline"
                onClick={handleBack}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                Back
              </Button>
            )}
            {currentStep < 2 && (
              <Button
                onClick={handleNext}
                className="flex items-center gap-2 ml-auto"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DriverOnboarding;
