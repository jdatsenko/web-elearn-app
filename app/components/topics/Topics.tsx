"use client";
import "./topics.css";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
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

interface Topic {
  topicNumber: number;
  title: string;
  description: string;
}

const Topics = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const HomePageSkeleton = dynamic(() => import("../skeletons/HomePageSkeleton"), { ssr: false });

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
  }, []);

  if (loading) {
    return <HomePageSkeleton />;
  }
  
  return (
    <>
      <section className="px-4 sm:px-16 flex flex-col gap-4">
        <h1 className="text-4xl font-bold text-center mt-8 sm:mt-[40px]">
          Webová e-learningová aplikácia pre LPWAN
        </h1>
        <h1 className="text-4xl font-bold text-center mt-8 sm:mt-[20px]">Témy</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mx-auto">
          {topics.map((topic, index) => (
            <Card key={index} className="w-full max-w-[25rem] mx-auto">
              <CardHeader>
                <CardTitle style={{ lineHeight: '1.5' }}>{topic.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{topic.description}</CardDescription>
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
  
        <Separator className="my-8 sm:my-[40px]" />
  
        <h1 className="text-4xl font-bold text-center mt-8 sm:mt-[20px]">
          Prečo by sme mali vedieť, čo je LPWAN?
        </h1>

        <Accordion type="single" collapsible className="mx-auto sm:mx-[100px] mb-8 sm:mb-[30px]">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-base hover:no-underline text-red-600">
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
            <AccordionTrigger className="text-base hover:no-underline text-red-600">
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
            <AccordionTrigger className="text-base hover:no-underline text-red-600">
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
            <AccordionTrigger className="text-base hover:no-underline text-red-600">
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

        <p className="mx-auto max-w-lg pb-8 sm:pb-[50px]">
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
      </section>
    </>
  );
};

export default Topics;

