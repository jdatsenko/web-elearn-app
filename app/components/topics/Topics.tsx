"use client";
import "./topics.css";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ArrowToTop } from "@/components/ui/arrow-to-top";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Bar, BarChart } from "recharts"



import { CartesianGrid, XAxis, YAxis } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

interface TestStats {
  testId: number;
  users_completed: number;
}

interface Topic {
  topicNumber: number;
  title: string;
  description: string;
}

const Topics = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const HomePageSkeleton = dynamic(
    () => import("../skeletons/HomePageSkeleton"),
    { ssr: false }
  );
  const isTeacher = session?.user?.role === "TEACHER";

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await fetch("/api/topic/card");
        const data = await response.json();
        if (data.data) {
          setTopics(data.data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching topics:", error);
      }
    };

    fetchTopics();

    const fetchTestStats = async () => {
      try {
        const response = await fetch(`/api/topic/getGlobalStats`);
        const data = await response.json();
        if (!data.data) {
          throw new Error("Chyba pri načítaní štatistík.");
        }
        console.log("Fetched test stats:", data.data);
        setTestStats(data.data);
      }
      catch (error) {
        console.error("Error fetching test stats:", error);
      }
    };
    fetchTestStats();
  }, []);

  const [testStats, setTestStats] = useState<TestStats[]>([]);
  const chartData: { topic: string; users: number }[] = [];
  let chartConfig: ChartConfig = {
    "topic": {
      label: 'Štatistika testovania',
      color: `hsl(var(--chart-2))`,
    },
  }

  testStats.forEach((stat) => {
    chartData.push({
      topic: `#${stat.testId}. ${topics[stat.testId - 1]?.title}`,
      users: stat.users_completed,
    });
  });

  if (loading) {
    return <HomePageSkeleton />;
  }

  return (
    <>
      <section className="px-4 sm:px-16 flex flex-col gap-4">
        <h1 className="text-4xl font-bold text-center mt-8 sm:mt-[40px]">
          Webová e-learningová aplikácia pre LPWAN
        </h1>
        <Dialog>
          <DialogTrigger asChild>
          <h1 className="text-4xl font-bold text-center mt-8 sm:mt-[20px]">
          Témy
        </h1>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] shadow-lg rounded-xl p-6">
            <p className="text-lg text-center mt-2 font-semibold">
              Tu môžete vidieť počet používateľov, ktorí úspešne dokončili testovanie tejto témy.
            </p>
            <Card>
              <CardHeader>
                <CardTitle>
                </CardTitle>
                <CardDescription>Výsledky testovania</CardDescription>
              </CardHeader>
              <CardContent>

              <ChartContainer config={chartConfig} className="">
                <BarChart accessibilityLayer data={chartData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="topic"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, value.indexOf('.'))}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={10}
                    tickFormatter={(value) => value.toString()}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="users" fill="var(--color-topic)" radius={4} />
                </BarChart>
              </ChartContainer>
              </CardContent>
            </Card>
          </DialogContent>
        </Dialog>
        <div className="grid grid-cols-1 md:grid-cols-3 mb-5 gap-10 mx-auto">
          {topics.map((topic, index) => (
            <Card
              key={index}
              className="w-full border border-gray-400 bg-background max-w-[25rem] mx-auto"
            >
              <CardHeader>
                <CardTitle
                  style={{
                    lineHeight: "1.5",
                    wordWrap: "break-word",
                    overflowWrap: "break-word",
                  }}
                >
                  {index + 1}. {topic.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="break-words">
                  {topic.description}
                </CardDescription>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Link
                  className={buttonVariants({ variant: "default" })}
                  href={`/topics/${topic.topicNumber}`}
                >
                  Pozrieť
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <Separator className="my-8 sm:my-[10px]" />

        <section className="max-w-6xl mx-auto px-4 py-12">
          <h2 className="text-4xl font-bold text-center mb-4">O kurze</h2>
          <p className="text-center text-muted-foreground mb-12">
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
                  architektúre, bezpečnostných otázkach a praktických
                  aplikáciách.
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
                  získané vedomosti v testoch, sledujte svoj pokrok a objavte,
                  ako LPWAN využiť vo vlastných projektoch.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-2 sm:my-[10px]" />

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
                Môžete spravovať obsah kurzu, sledovať štatistiky pre každú tému, ako napríklad popularitu jednotlivých tém na základe počtu študentov, ktorí absolvovali test k danej téme.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-8 sm:my-[40px]" />

        <h1 className="text-4xl font-bold text-center mt-8 sm:mt-[20px]">
          Prečo by sme mali vedieť, čo je LPWAN?
        </h1>

        <Accordion
          type="single"
          collapsible
          className="mx-auto sm:mx-[100px] mb-8 sm:mb-[30px]"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-base text-start hover:no-underline text-red-600">
              1. Lepšie porozumenie technologickému prostrediu.
            </AccordionTrigger>
            <AccordionContent className="text-base">
              S rastúcim počtom zariadení pripojených k IoT (Internet of Things)
              v bežnom živote, ako sú smart zariadenia v domácnosti, smart
              merače, inteligentné mestské systémy a ďalšie, je užitočné mať
              základné pochopenie technológie, ktorá tieto zariadenia umožňuje
              komunikovať. LPWAN je jednou z kľúčových technológií, ktorá
              umožňuje spoľahlivú a energeticky úspornú komunikáciu pre tieto
              zariadenia.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-base text-start hover:no-underline text-red-600">
              2. Pochopenie výhod pre obyčajného spotrebiteľa.
            </AccordionTrigger>
            <AccordionContent className="text-base">
              LPWAN technológia prináša niekoľko výhod pre bežných
              spotrebiteľov, ako sú dlhá výdrž batérie v zariadeniach, široké
              pokrytie siete, čo umožňuje použitie týchto zariadení aj v
              oblastiach s obmedzeným dosahom signálu, a možnosť efektívneho
              monitorovania a riadenia rôznych aspektov ich každodenného života.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-base text-start hover:no-underline text-red-600">
              3. Zlepšenie kvality života.
            </AccordionTrigger>
            <AccordionContent className="text-base">
              LPWAN technológia umožňuje vytváranie inteligentných riešení,
              ktoré môžu prispieť k zlepšeniu kvality života obyčajných ľudí.
              Medzi príklady patrí sledovanie kvality ovzdušia, inteligentné
              parkovanie, monitorovanie spotreby energie a vody, sledovanie
              zdravia a ďalšie.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="text-base text-start hover:no-underline text-red-600">
              4. Informovanosť a ochrana súkromia.
            </AccordionTrigger>
            <AccordionContent className="text-base">
              Pochopenie technológie ako LPWAN umožňuje obyčajným spotrebiteľom
              byť informovaní o tom, ako ich dáta sú zbierané, spracované a
              použité. To môže pomôcť pri ochrane ich súkromia a pri rozhodovaní
              o tom, ktoré inteligentné zariadenia a služby používať.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <ArrowToTop className="fixed bottom-6 right-6 z-[999]" />
      </section>
      <Separator className="my-8 sm:my-[40px]" />
      <footer className="flex flex-col md:flex-row items-center w-full px-12 rounded-lg shadow-xl pb-8 sm:pb-[40px]">
        <div className="w-full md:w-2/5">
          <p className="text-sm text-gray-700 dark:text-[#696969]">
            Informácie o ochrane osobných údajov a zásadách nájdete{" "}
            <Link
              href={"/policy"}
              className="text-blue-400 underline hover:text-blue-600 transition-colors"
            >
              tu.
            </Link>
          </p>
          <p className="mt-2 text-sm text-gray-700 dark:text-[#696969]">
            Ak nájdete akékoľvek chyby, neváhajte mi napísať na email:{" "}
            <Link
              href="mailto:yu.datsenko@gmail.com"
              className="text-blue-400 underline hover:text-blue-600 transition-colors"
            >
              yu.datsenko@gmail.com
            </Link>
            .
          </p>
        </div>

        <div className="w-full md:w-1/2 mt-8 md:text-justify md:ml-8">
          <p className="text-base dark:text-gray-400">
            Vzhľadom na široké využitie LPWAN v modernom živote a jeho vplyv na
            rôzne aspekty každodenného života, je dôležité, aby obyčajní
            obyvatelia mali základné pochopenie tejto technológie, aby mohli
            efektívne využívať výhody, ktoré prináša, a zároveň chrániť svoje
            súkromie a bezpečnosť.
            <br />
            <br />
            Táto webová e-learningová aplikácia poskytuje tieto dôležité
            informácie a vzdelávanie.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Topics;
