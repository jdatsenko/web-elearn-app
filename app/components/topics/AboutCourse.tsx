"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const AboutCourse = () => {
  return (
    <>
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-4xl font-bold text-center mb-4">O kurze</h2>
        <p className="text-cenPter text-muted-foreground mb-12">
          Zoznámte sa so základmi LPWAN a ich praktickým využitím – najmä s
          technológiami LoRaWAN a NB-IoT.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Vstúpte do sveta LPWAN</CardTitle>
              <CardDescription>Praktický sprievodca základmi</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Objavte, ako fungujú nízkoenergetické širokopásmové siete
                (LPWAN) a kde nachádzajú využitie. Kurz je ideálny pre
                začiatočníkov, ktorí chcú porozumieť základom a možnostiam
                týchto technológií.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Obsah kurzu</CardTitle>
              <CardDescription>Získajte praktické vedomosti</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Počas kurzu sa oboznámite so základnými princípmi LPWAN
                technológií vrátane NB-IoT a LoRaWAN. Získate prehľad o ich
                architektúre, bezpečnostných otázkach a praktických aplikáciách.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ako kurz funguje</CardTitle>
              <CardDescription>Teória + prax</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Kurz spája teóriu s interaktívnymi cvičeniami. Vyskúšajte si
                získané vedomosti v testoch, sledujte svoj pokrok a objavte, ako
                LPWAN využiť vo vlastných projektoch.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
};

export default AboutCourse;
