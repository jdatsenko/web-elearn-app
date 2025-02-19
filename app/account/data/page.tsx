"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";

const ProfilePage = () => {
  const { data: session } = useSession();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [keepCurrentName, setKeepCurrentName] = useState(true);
  const [keepCurrentEmail, setKeepCurrentEmail] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!session?.user) return;

        const res = await axios.get("/api/user/getUserData");
        setUser(res.data.user);
      } catch (error) {
        console.error("Chyba pri načítaní údajov používateľa:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [session]);

  const handleUpdate = async () => {
    try {
      const res = await axios.put("/api/user/updateUserData", {
        name: keepCurrentName ? user?.name : newName,
        email: keepCurrentEmail ? user?.email : newEmail,
      });

      if (res.status === 200) {
        setMessage("Údaje boli úspešne aktualizované.");
        setUser({ 
          name: keepCurrentName ? user!.name : newName, 
          email: keepCurrentEmail ? user!.email : newEmail 
        });
        setEditing(false);
      }
    } catch (error) {
      console.error("Chyba pri aktualizácii údajov:", error);
      setMessage("Chyba pri aktualizácii.");
    }
  };

  if (loading) return <p>Načítava sa...</p>;
  if (!session) return <p>Musíte byť prihlásený na zobrazenie profilu.</p>;

  return (
    <div className="mx-auto p-4">
      <p className="text-3xl text-center font-bold mb-4">Vaše údaje</p>
      {user ? (
        <div className="mx-5 md:mx-60">
          {!editing ? (
            <>
              <p>
                <strong>Meno:</strong> {user.name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <Button
                className="mt-2"
                onClick={() => setEditing(true)}
              >
                Upraviť profil
              </Button>
            </>
          ) : (
            <>
              <Label className="block">
                <span className="text-gray-700">Nové meno</span>
                <Input
                  type="text"
                  placeholder={user.name}
                  value={keepCurrentName ? user.name : newName}
                  disabled={keepCurrentName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="mt-1 block w-full border-gray-500 rounded-md p-2"
                />
                <Label className="flex items-center mt-2">
                  <input
                    type="checkbox"
                    checked={keepCurrentName}
                    onChange={() => setKeepCurrentName(!keepCurrentName)}
                    className="mr-2"
                  />
                  Použiť aktuálne meno
                </Label>
              </Label>

              <Label className="block mt-3">
                <span className="text-gray-700">Nový email</span>
                <Input
                  type="email"
                  placeholder={user.email}
                  value={keepCurrentEmail ? user.email : newEmail}
                  disabled={keepCurrentEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="mt-1 block w-full border-gray-500 rounded-md p-2"
                />
                <Label className="flex items-center mt-2">
                  <input
                    type="checkbox"
                    checked={keepCurrentEmail}
                    onChange={() => setKeepCurrentEmail(!keepCurrentEmail)}
                    className="mr-2"
                  />
                  Použiť aktuálny email
                </Label>
              </Label>

              <Button
                className="mt-3"
                onClick={handleUpdate}
              >
                Uložiť zmeny
              </Button>
              <Button
                className="mt-3 mx-2"
                variant={"secondary"}
                onClick={() => setEditing(false)}
              >
                Zrušiť
              </Button>
            </>
          )}
        </div>
      ) : (
        <p>Údaje sa nenašli.</p>
      )}
      {message && <p className="mt-3 text-green-600">{message}</p>}
    </div>
  );
};

export default ProfilePage;
