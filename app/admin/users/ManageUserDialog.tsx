"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

type ManageUserDialogProps = {
  userId: string;
  currentRole: string;
  onSuccess?: () => void;
};

const roleOptions = ["ADMIN", "TEACHER", "USER"];

export const ManageUserDialog: React.FC<ManageUserDialogProps> = ({
  userId,
  currentRole,
  onSuccess,
}) => {
  const [selectedRole, setSelectedRole] = useState(currentRole);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [open, setOpen] = useState(false);
  const handleRoleChange = async () => {
    try {
      setIsSubmitting(true);
      await axios.put("/api/admin/changeUserRole", {
        userId,
        newRole: selectedRole,
      });
      toast({
        title: "Rola používateľa bola úspešne zmenená",
        description: "Zmeny sú uložené.",
        variant: "default",
      });
      setOpen(false);
      setTimeout(() => onSuccess?.(), 0);
    } catch (err: any) {
      toast({
        title: "Chyba pri zmene roly",
        description: err.response?.data?.message || "Skúste to znova neskôr.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmDelete = async () => {
    try {
      setIsSubmitting(true);
      await axios.delete("/api/admin/deleteUser", {
        data: { userId },
      });

      toast({
        title: "Používateľ bol úspešne vymazaný",
        description: "Používateľ bol odstránený z databázy.",
        variant: "default",
      });
      setOpen(false);
      setTimeout(() => onSuccess?.(), 0);
    } catch (err: any) {
      toast({
        title: "Chyba pri vymazávaní používateľa",
        description: err.response?.data?.message || "Skúste to znova neskôr.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" size="sm">
          Spravovať
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Správa používateľa</DialogTitle>
          <DialogDescription>
            ID používateľa: <strong>{userId}</strong>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium mb-1">Zmeniť rolu</p>
            <Select
              defaultValue={currentRole}
              onValueChange={(value) => setSelectedRole(value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Vyberte rolu" />
              </SelectTrigger>
              <SelectContent>
                {roleOptions.map((role) => (
                  <SelectItem key={role} value={role}>
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {showDeleteAlert && (
            <Alert variant="destructive" className="space-y-4">
              <div className="flex items-start gap-4">
                <Terminal className="h-5 w-5 mt-1" />
                <div>
                  <AlertTitle>Ste si istý?</AlertTitle>
                  <AlertDescription>
                    Tento krok nenávratne odstráni používateľa.
                  </AlertDescription>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button
                  variant="outline"
                  onClick={() => setShowDeleteAlert(false)}
                  disabled={isSubmitting}
                >
                  Zrušiť
                </Button>
                <Button
                  variant="destructive"
                  onClick={confirmDelete}
                  disabled={isSubmitting}
                >
                  Vymazať používateľa
                </Button>
              </div>
            </Alert>
          )}

          {!showDeleteAlert && (
            <div className="flex justify-between items-center pt-4">
              <Button
                variant="destructive"
                onClick={() => setShowDeleteAlert(true)}
                disabled={isSubmitting}
              >
                Vymazať používateľa
              </Button>
              <Button
                onClick={handleRoleChange}
                disabled={isSubmitting || selectedRole === currentRole}
              >
                Uložiť zmeny
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ManageUserDialog;
