import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Bell,
  MessageSquare,
  Mail,
  Calendar,
  AlertTriangle,
  Smartphone,
  Globe,
  Info,
  Car,
} from "lucide-react";

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  enabled: boolean;
}

interface NotificationCategory {
  id: string;
  title: string;
  description: string;
  settings: NotificationSetting[];
}

interface NotificationSettingsProps {
  onSave?: (settings: NotificationCategory[]) => void;
}

const NotificationSettings = ({
  onSave = () => {},
}: NotificationSettingsProps) => {
  const [categories, setCategories] = useState<NotificationCategory[]>([
    {
      id: "app",
      title: "App Notifications",
      description: "Control how you receive notifications within the app",
      settings: [
        {
          id: "ride_updates",
          title: "Ride Updates",
          description: "Notifications about changes to your scheduled rides",
          icon: <Car size={18} />,
          enabled: true,
        },
        {
          id: "messages",
          title: "New Messages",
          description: "Notifications when you receive new messages",
          icon: <MessageSquare size={18} />,
          enabled: true,
        },
        {
          id: "ride_requests",
          title: "Ride Requests",
          description: "Notifications when someone requests to join your ride",
          icon: <Bell size={18} />,
          enabled: true,
        },
      ],
    },
    {
      id: "email",
      title: "Email Notifications",
      description: "Control which emails you receive from us",
      settings: [
        {
          id: "email_summary",
          title: "Weekly Summary",
          description: "Receive a weekly summary of your ride activity",
          icon: <Mail size={18} />,
          enabled: false,
        },
        {
          id: "email_promotions",
          title: "Promotions & Offers",
          description: "Receive emails about special offers and promotions",
          icon: <Info size={18} />,
          enabled: false,
        },
        {
          id: "email_reminders",
          title: "Ride Reminders",
          description: "Receive email reminders about upcoming rides",
          icon: <Calendar size={18} />,
          enabled: true,
        },
      ],
    },
    {
      id: "mobile",
      title: "Mobile Notifications",
      description: "Control push notifications on your mobile device",
      settings: [
        {
          id: "push_critical",
          title: "Critical Alerts",
          description: "Important notifications about your account or rides",
          icon: <AlertTriangle size={18} />,
          enabled: true,
        },
        {
          id: "push_nearby",
          title: "Nearby Rides",
          description: "Notifications about available rides in your area",
          icon: <Globe size={18} />,
          enabled: true,
        },
        {
          id: "push_marketing",
          title: "Marketing Notifications",
          description: "Notifications about new features and promotions",
          icon: <Smartphone size={18} />,
          enabled: false,
        },
      ],
    },
  ]);

  const handleToggle = (categoryId: string, settingId: string) => {
    setCategories(
      categories.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            settings: category.settings.map((setting) => {
              if (setting.id === settingId) {
                return { ...setting, enabled: !setting.enabled };
              }
              return setting;
            }),
          };
        }
        return category;
      }),
    );
  };

  const handleSaveSettings = () => {
    onSave(categories);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-background">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Notification Settings</h1>
        <p className="text-muted-foreground">
          Manage how you receive notifications from our ride sharing platform
        </p>
      </div>

      <div className="space-y-6">
        {categories.map((category) => (
          <Card key={category.id} className="w-full">
            <CardHeader>
              <CardTitle>{category.title}</CardTitle>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {category.settings.map((setting) => (
                <div
                  key={setting.id}
                  className="flex items-center justify-between py-2"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 p-1.5 rounded-md bg-primary/10 text-primary">
                      {setting.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">{setting.title}</h4>
                      <p className="text-xs text-muted-foreground">
                        {setting.description}
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={setting.enabled}
                    onCheckedChange={() =>
                      handleToggle(category.id, setting.id)
                    }
                    aria-label={`Toggle ${setting.title}`}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 flex justify-end">
        <Button onClick={handleSaveSettings}>Save Changes</Button>
      </div>
    </div>
  );
};

export default NotificationSettings;
