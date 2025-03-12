import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  CreditCard,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  AlertCircle,
  Info,
} from "lucide-react";

interface PaymentMethod {
  id: string;
  type: "credit" | "debit";
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  isDefault: boolean;
}

interface PaymentMethodsProps {
  paymentMethods?: PaymentMethod[];
  onAddPaymentMethod?: (method: Omit<PaymentMethod, "id">) => void;
  onEditPaymentMethod?: (id: string, method: Partial<PaymentMethod>) => void;
  onDeletePaymentMethod?: (id: string) => void;
  onSetDefaultPaymentMethod?: (id: string) => void;
}

const PaymentMethods = ({
  paymentMethods = [
    {
      id: "1",
      type: "credit",
      cardNumber: "**** **** **** 4567",
      cardHolder: "John Doe",
      expiryDate: "12/25",
      isDefault: true,
    },
    {
      id: "2",
      type: "debit",
      cardNumber: "**** **** **** 8901",
      cardHolder: "John Doe",
      expiryDate: "06/24",
      isDefault: false,
    },
  ],
  onAddPaymentMethod = () => {},
  onEditPaymentMethod = () => {},
  onDeletePaymentMethod = () => {},
  onSetDefaultPaymentMethod = () => {},
}: PaymentMethodsProps) => {
  const [newPaymentMethod, setNewPaymentMethod] = useState({
    type: "credit" as const,
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    isDefault: false,
  });
  const [editingPaymentMethod, setEditingPaymentMethod] =
    useState<PaymentMethod | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleAddPaymentMethod = () => {
    onAddPaymentMethod(newPaymentMethod);
    setNewPaymentMethod({
      type: "credit",
      cardNumber: "",
      cardHolder: "",
      expiryDate: "",
      isDefault: false,
    });
    setIsAddDialogOpen(false);
  };

  const handleEditPaymentMethod = () => {
    if (editingPaymentMethod) {
      onEditPaymentMethod(editingPaymentMethod.id, editingPaymentMethod);
      setEditingPaymentMethod(null);
      setIsEditDialogOpen(false);
    }
  };

  const handleDeletePaymentMethod = () => {
    if (deleteId) {
      onDeletePaymentMethod(deleteId);
      setDeleteId(null);
    }
  };

  const startEdit = (method: PaymentMethod) => {
    setEditingPaymentMethod(method);
    setIsEditDialogOpen(true);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-background">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Payment Methods</h2>
          <p className="text-muted-foreground">
            Manage your payment methods for ride payments
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus size={16} />
              Add Payment Method
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Payment Method</DialogTitle>
              <DialogDescription>
                Add a new payment method to your account.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="card-type" className="text-sm font-medium">
                    Card Type
                  </label>
                  <select
                    id="card-type"
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                    value={newPaymentMethod.type}
                    onChange={(e) =>
                      setNewPaymentMethod({
                        ...newPaymentMethod,
                        type: e.target.value as "credit" | "debit",
                      })
                    }
                  >
                    <option value="credit">Credit Card</option>
                    <option value="debit">Debit Card</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="expiry-date" className="text-sm font-medium">
                    Expiry Date
                  </label>
                  <Input
                    id="expiry-date"
                    placeholder="MM/YY"
                    value={newPaymentMethod.expiryDate}
                    onChange={(e) =>
                      setNewPaymentMethod({
                        ...newPaymentMethod,
                        expiryDate: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div>
                <label htmlFor="card-number" className="text-sm font-medium">
                  Card Number
                </label>
                <Input
                  id="card-number"
                  placeholder="**** **** **** ****"
                  value={newPaymentMethod.cardNumber}
                  onChange={(e) =>
                    setNewPaymentMethod({
                      ...newPaymentMethod,
                      cardNumber: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label htmlFor="card-holder" className="text-sm font-medium">
                  Card Holder Name
                </label>
                <Input
                  id="card-holder"
                  placeholder="Name on card"
                  value={newPaymentMethod.cardHolder}
                  onChange={(e) =>
                    setNewPaymentMethod({
                      ...newPaymentMethod,
                      cardHolder: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="default-payment"
                  className="rounded border-gray-300"
                  checked={newPaymentMethod.isDefault}
                  onChange={(e) =>
                    setNewPaymentMethod({
                      ...newPaymentMethod,
                      isDefault: e.target.checked,
                    })
                  }
                />
                <label
                  htmlFor="default-payment"
                  className="text-sm text-muted-foreground"
                >
                  Set as default payment method
                </label>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAddDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleAddPaymentMethod}>
                Add Payment Method
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {paymentMethods.map((method) => (
          <Card key={method.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">
                    {method.type === "credit" ? "Credit Card" : "Debit Card"}
                  </CardTitle>
                </div>
                {method.isDefault && (
                  <Badge variant="secondary" className="text-xs">
                    Default
                  </Badge>
                )}
              </div>
              <CardDescription>{method.cardNumber}</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex flex-col space-y-1">
                <div className="text-sm">
                  <span className="text-muted-foreground">Card Holder: </span>
                  <span>{method.cardHolder}</span>
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">Expires: </span>
                  <span>{method.expiryDate}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between pt-2">
              <div className="flex space-x-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => startEdit(method)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Edit payment method</TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => setDeleteId(method.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Delete Payment Method
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this payment
                              method? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel
                              onClick={() => setDeleteId(null)}
                            >
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={handleDeletePaymentMethod}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TooltipTrigger>
                    <TooltipContent>Delete payment method</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              {!method.isDefault && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onSetDefaultPaymentMethod(method.id)}
                >
                  Set as Default
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Edit Payment Method Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Payment Method</DialogTitle>
            <DialogDescription>
              Update your payment method details.
            </DialogDescription>
          </DialogHeader>
          {editingPaymentMethod && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="edit-card-type"
                    className="text-sm font-medium"
                  >
                    Card Type
                  </label>
                  <select
                    id="edit-card-type"
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                    value={editingPaymentMethod.type}
                    onChange={(e) =>
                      setEditingPaymentMethod({
                        ...editingPaymentMethod,
                        type: e.target.value as "credit" | "debit",
                      })
                    }
                  >
                    <option value="credit">Credit Card</option>
                    <option value="debit">Debit Card</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="edit-expiry-date"
                    className="text-sm font-medium"
                  >
                    Expiry Date
                  </label>
                  <Input
                    id="edit-expiry-date"
                    placeholder="MM/YY"
                    value={editingPaymentMethod.expiryDate}
                    onChange={(e) =>
                      setEditingPaymentMethod({
                        ...editingPaymentMethod,
                        expiryDate: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="edit-card-number"
                  className="text-sm font-medium"
                >
                  Card Number
                </label>
                <Input
                  id="edit-card-number"
                  placeholder="**** **** **** ****"
                  value={editingPaymentMethod.cardNumber}
                  onChange={(e) =>
                    setEditingPaymentMethod({
                      ...editingPaymentMethod,
                      cardNumber: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label
                  htmlFor="edit-card-holder"
                  className="text-sm font-medium"
                >
                  Card Holder Name
                </label>
                <Input
                  id="edit-card-holder"
                  placeholder="Name on card"
                  value={editingPaymentMethod.cardHolder}
                  onChange={(e) =>
                    setEditingPaymentMethod({
                      ...editingPaymentMethod,
                      cardHolder: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="edit-default-payment"
                  className="rounded border-gray-300"
                  checked={editingPaymentMethod.isDefault}
                  onChange={(e) =>
                    setEditingPaymentMethod({
                      ...editingPaymentMethod,
                      isDefault: e.target.checked,
                    })
                  }
                />
                <label
                  htmlFor="edit-default-payment"
                  className="text-sm text-muted-foreground"
                >
                  Set as default payment method
                </label>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleEditPaymentMethod}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Info section */}
      <div className="mt-8 p-4 border rounded-lg bg-muted/30">
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 text-blue-500 mt-0.5" />
          <div>
            <h3 className="font-medium mb-1">Payment Information</h3>
            <p className="text-sm text-muted-foreground">
              Your payment information is securely stored and processed. We
              never store your complete card details on our servers. For
              security reasons, you can only see the last four digits of your
              card number.
            </p>
            <div className="mt-3 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Your payment data is encrypted and secure</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>We comply with PCI DSS standards</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <AlertCircle className="h-4 w-4 text-amber-500" />
                <span>
                  Never share your card details with drivers or other users
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethods;
