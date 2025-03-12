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
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Shield, Eye, Users, Globe, Lock, Info } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";

interface PrivacySettingsProps {
  initialSettings?: {
    profileVisibility: "public" | "connections" | "private";
    locationSharing: boolean;
    rideHistoryVisibility: boolean;
    dataCollection: boolean;
    marketingCommunications: boolean;
    thirdPartySharing: boolean;
  };
  onSave?: (settings: any) => void;
}

const PrivacySettings = ({
  initialSettings = {
    profileVisibility: "public",
    locationSharing: true,
    rideHistoryVisibility: true,
    dataCollection: true,
    marketingCommunications: false,
    thirdPartySharing: false,
  },
  onSave = () => {},
}: PrivacySettingsProps) => {
  const [settings, setSettings] = useState(initialSettings);
  const [hasChanges, setHasChanges] = useState(false);

  const form = useForm({
    defaultValues: initialSettings,
  });

  const handleToggle = (key: string, value: boolean) => {
    setSettings((prev) => {
      const newSettings = { ...prev, [key]: value };
      setHasChanges(true);
      return newSettings;
    });
  };

  const handleVisibilityChange = (
    value: "public" | "connections" | "private",
  ) => {
    setSettings((prev) => {
      const newSettings = { ...prev, profileVisibility: value };
      setHasChanges(true);
      return newSettings;
    });
  };

  const handleSave = () => {
    onSave(settings);
    setHasChanges(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-background">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Privacy Settings</h1>
        <p className="text-muted-foreground">
          Manage how your information is displayed and shared
        </p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-primary" />
              <CardTitle>Profile Visibility</CardTitle>
            </div>
            <CardDescription>
              Control who can see your profile information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Public</p>
                    <p className="text-sm text-muted-foreground">
                      Anyone can view your profile
                    </p>
                  </div>
                </div>
                <div>
                  <input
                    type="radio"
                    id="public"
                    name="visibility"
                    className="rounded-full"
                    checked={settings.profileVisibility === "public"}
                    onChange={() => handleVisibilityChange("public")}
                  />
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Connections Only</p>
                    <p className="text-sm text-muted-foreground">
                      Only people you've connected with can view your profile
                    </p>
                  </div>
                </div>
                <div>
                  <input
                    type="radio"
                    id="connections"
                    name="visibility"
                    className="rounded-full"
                    checked={settings.profileVisibility === "connections"}
                    onChange={() => handleVisibilityChange("connections")}
                  />
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Private</p>
                    <p className="text-sm text-muted-foreground">
                      Your profile is hidden from everyone
                    </p>
                  </div>
                </div>
                <div>
                  <input
                    type="radio"
                    id="private"
                    name="visibility"
                    className="rounded-full"
                    checked={settings.profileVisibility === "private"}
                    onChange={() => handleVisibilityChange("private")}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <CardTitle>Data & Privacy</CardTitle>
            </div>
            <CardDescription>
              Manage how your data is used and shared
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Location Sharing</p>
                  <p className="text-sm text-muted-foreground">
                    Allow the app to access your location while using the
                    service
                  </p>
                </div>
                <Switch
                  checked={settings.locationSharing}
                  onCheckedChange={(checked) =>
                    handleToggle("locationSharing", checked)
                  }
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Ride History Visibility</p>
                  <p className="text-sm text-muted-foreground">
                    Allow others to see your past rides
                  </p>
                </div>
                <Switch
                  checked={settings.rideHistoryVisibility}
                  onCheckedChange={(checked) =>
                    handleToggle("rideHistoryVisibility", checked)
                  }
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Data Collection</p>
                  <p className="text-sm text-muted-foreground">
                    Allow us to collect usage data to improve our services
                  </p>
                </div>
                <Switch
                  checked={settings.dataCollection}
                  onCheckedChange={(checked) =>
                    handleToggle("dataCollection", checked)
                  }
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Marketing Communications</p>
                  <p className="text-sm text-muted-foreground">
                    Receive emails about promotions and new features
                  </p>
                </div>
                <Switch
                  checked={settings.marketingCommunications}
                  onCheckedChange={(checked) =>
                    handleToggle("marketingCommunications", checked)
                  }
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Third-Party Data Sharing</p>
                  <p className="text-sm text-muted-foreground">
                    Allow sharing your data with trusted partners
                  </p>
                </div>
                <Switch
                  checked={settings.thirdPartySharing}
                  onCheckedChange={(checked) =>
                    handleToggle("thirdPartySharing", checked)
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Info className="h-5 w-5 text-primary" />
              <CardTitle>Privacy Policy</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Our privacy policy explains how we handle your personal data and
              protect your privacy when you use our services.
            </p>
            <Button variant="outline" size="sm">
              View Privacy Policy
            </Button>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button
            variant="outline"
            onClick={() => setSettings(initialSettings)}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!hasChanges}
            className={!hasChanges ? "opacity-50 cursor-not-allowed" : ""}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PrivacySettings;
