"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Session } from "next-auth";

interface AboutRolesProps {
  session: Session | null;
  isTeacher: boolean;
}

const AboutRoles = ({ session, isTeacher }: AboutRolesProps) => {
  return (
    <>
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-4xl font-bold text-center mb-4">
          Role používateľov
        </h2>
        <p className="text-center text-muted-foreground mb-12">
          V závislosti od typu používateľa máte prístup k rôznym funkciám
          kurzu. Zistite, čo vám prináša registrácia alebo aké možnosti máte
          ako učiteľ.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>👤 Hosť</CardTitle>
              <CardDescription>
                Základný prístup bez registrácie
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Ako hosť si môžete prečítať všetky dostupné témy kurzu. Nemáte
                však možnosť absolvovať testy, ukladať si pokrok alebo získať
                výsledky štúdia.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                {session ? (
                  <p>👥 Registrovaný</p>
                ) : (
                  <Link
                    href="/auth/registration"
                    className="text-blue-400 hover:text-blue-600 transition-colors"
                  >
                    👥 Registrovaný
                  </Link>
                )}
              </CardTitle>
              <CardDescription>
                Interaktívne učenie s pokrokom
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Registrovaní používatelia môžu absolvovať testy, sledovať svoj
                pokrok a získať personalizovanú spätnú väzbu. Účet vám
                umožňuje pokračovať v učení tam, kde ste skončili.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                {isTeacher || !session ? (
                  <p>👨‍🏫 Učiteľ</p>
                ) : (
                  <Link
                    href="/teacherRequestForm"
                    className="text-blue-400 hover:text-blue-600 transition-colors"
                  >
                    👨‍🏫 Učiteľ
                  </Link>
                )}
              </CardTitle>
              <CardDescription>Správa obsahu a testov</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Môžete spravovať obsah kurzu, sledovať štatistiky pre každú
                tému, ako napríklad popularitu jednotlivých tém na základe
                počtu študentov, ktorí absolvovali test k danej téme.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
};

export default AboutRoles;
