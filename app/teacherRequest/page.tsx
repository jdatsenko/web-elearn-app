"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Info } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";

const TeacherRequestForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    qualification: "",
    experience: "",
  });

  const router = useRouter();
  const { toast } = useToast();
  const [requestStatus, setRequestStatus] = useState<
    null | "approved" | "rejected" | "pending"
  >(null);
  const [requestExists, setRequestExists] = useState(false);
  const { data: session } = useSession() as { data: any;};
  const canSubmitForm = !requestExists || session?.user?.role === "USER";

  useEffect(() => {
    axios
      .get("/api/user/getUserRequestOfRoleTeacher")
      .then((res) => {
        setRequestExists(true);
        setRequestStatus(res.data.status);
      })
      .catch((err) => {
        if (err.response?.status === 404) {
          setRequestExists(false);
        }
      });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      formData.name.trim() === "" ||
      formData.surname.trim() === "" ||
      formData.qualification.trim() === "" ||
      formData.experience.trim() === ""
    ) {
      toast({
        title: "Chyba",
        description: "Vyplňte všetky polia.",
        variant: "destructive",
      });
      return;
    }

    if (!canSubmitForm) {
      toast({
        title: "Žiadosť už bola odoslaná",
        description: "Počkajte na rozhodnutie administrátora.",
        variant: "default",
      });
      return;
    }

    axios
      .post("/api/user/teacherRequest", formData)
      .then(() => {
        toast({
          title: "Žiadosť bola úspešne odoslaná!",
          description: "Počkajte na schválenie.",
          variant: "default",
        });
        setFormData({
          name: "",
          surname: "",
          qualification: "",
          experience: "",
        });
        setTimeout(() => {
          router.push("/");
        }, 1000);
      })
      .catch((error: any) => {
        toast({
          title: "Chyba pri odosielaní žiadosti",
          description:
            error.response?.data?.message || "Skúste to znova neskôr.",
          variant: "destructive",
        });
      });
  };

  return (
    <div className="max-w-md mx-auto">
      <p className="text-2xl font-bold text-center my-4 flex items-center justify-center">
        Žiadosť o funkciu učiteľa
        <span className="ml-2">
          <Dialog>
            <DialogTrigger asChild>
              <Info className="w-6 h-6 text-blue-500 cursor-pointer" />
            </DialogTrigger>
            <DialogContent>
              <p className="text-lg text-center mt-2 font-semibold">
                Čo môže učiteľ urobiť?
              </p>
              <p>
                Učiteľ môže pridať, upraviť alebo vymazať témy a testy. Aby ste
                sa stali učiteľom, vyplňte žiadosť s vašimi kvalifikáciami a
                skúsenosťami.
              </p>
              <DialogFooter className="flex justify-center gap-2 mt-4">
                <DialogClose className="flex">
                  <Button className="px-4 py-2 rounded-lg" variant="secondary">
                    Zavrieť
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </span>
      </p>
      {requestExists && requestStatus === "pending" ? (
        <div className="text-center my-4">
          <p className="text-yellow-600 font-semibold">
            Vaša žiadosť bola odoslaná a čaká na schválenie.
          </p>
        </div>
      ) : (
        <>
          {requestExists && requestStatus === "rejected" && (
            <div className="text-center my-4">
              <p className="text-red-600 font-semibold">
                Vaša žiadosť bola zamietnutá. Môžete skúsiť podať novú žiadosť.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="mb-4 mx-7">
              <Label htmlFor="name">Meno</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4 mx-7">
              <Label htmlFor="surname">Priezvisko</Label>
              <Input
                type="text"
                id="surname"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4 mx-7">
              <Label htmlFor="qualification">Kvalifikácie / Vzdelávanie</Label>
              <Textarea
                id="qualification"
                name="qualification"
                value={formData.qualification}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4 mx-7">
              <Label htmlFor="experience">Skúsenosti</Label>
              <Textarea
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-center">
              <Button type="submit">Odoslať</Button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default TeacherRequestForm;
