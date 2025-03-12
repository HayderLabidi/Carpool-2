import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ProfileSettings from "@/components/settings/ProfileSettings";
import PaymentMethods from "@/components/settings/PaymentMethods";
import NotificationSettings from "@/components/settings/NotificationSettings";
import PrivacySettings from "@/components/settings/PrivacySettings";
import { User, CreditCard, Bell, Shield, LogOut } from "lucide-react";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <DashboardLayout>
      <div className="w-full max-w-6xl mx-auto bg-background">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Account Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <Card className="md:w-64 h-fit sticky top-20">
            <CardContent className="p-4">
              <Tabs
                defaultValue="profile"
                orientation="vertical"
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="flex flex-col h-auto bg-transparent space-y-1">
                  <TabsTrigger
                    value="profile"
                    className="justify-start w-full px-3 py-2 h-auto data-[state=active]:bg-muted"
                  >
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </TabsTrigger>
                  <TabsTrigger
                    value="payment"
                    className="justify-start w-full px-3 py-2 h-auto data-[state=active]:bg-muted"
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    Payment Methods
                  </TabsTrigger>
                  <TabsTrigger
                    value="notifications"
                    className="justify-start w-full px-3 py-2 h-auto data-[state=active]:bg-muted"
                  >
                    <Bell className="mr-2 h-4 w-4" />
                    Notifications
                  </TabsTrigger>
                  <TabsTrigger
                    value="privacy"
                    className="justify-start w-full px-3 py-2 h-auto data-[state=active]:bg-muted"
                  >
                    <Shield className="mr-2 h-4 w-4" />
                    Privacy
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <Separator className="my-4" />

              <Button
                variant="ghost"
                className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Log Out
              </Button>
            </CardContent>
          </Card>

          <div className="flex-1">
            <Tabs value={activeTab} defaultValue="profile">
              <TabsContent value="profile" className="mt-0">
                <ProfileSettings />
              </TabsContent>
              <TabsContent value="payment" className="mt-0">
                <PaymentMethods />
              </TabsContent>
              <TabsContent value="notifications" className="mt-0">
                <NotificationSettings />
              </TabsContent>
              <TabsContent value="privacy" className="mt-0">
                <PrivacySettings />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
