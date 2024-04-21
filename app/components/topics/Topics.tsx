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

const Topics = () => {
  const topics = [
    {
      id: 1,
      title: "1. LPWAN: technológie a aplikácie",
      description:
        "V tejto téme sa budeme venovať technológii LPWAN, jej histórii, typom a aplikáciám. Dozviete sa, čo je LoRa Alliance a od čoho závisí výber typu technológie LPWAN. Takisto sa oboznámime so štandardmi projektu 3GPP, ktoré fungujú v licencovanom spektre. ",
    },
    {
      id: 2,
      title: "2. LoRaWAN: Lora Alliance, obmedzenia a výhody",
      description:
        "V tejto téme opíšeme špeciálny protokol pripojenia LPWAN vyvinutý spoločnosťou Semtech — LoRaWAN. Hlbšie sa zoznámime so spoločnosťou Lora Alliance a jej členmi. Okrem toho dozviete sa o obmedzeniach a výhodách LoRaWAN. ",
    },
    {
      id: 3,
      title: "3. Architektúra LoRaWAN",
      description:
        "V tejto téme sa budeme venovať architektúre LoRaWAN. Dozviete sa, aké sú základné komponenty LoRaWAN siete a ako fungujú. Preskúmame dôležité prvky, ako sú brány a ich typy, koncové zariadenia a ich úlohy v sieti, ako táto architektúra umožňuje efektívne prenosy údajov. ",
    },
    {
      id: 4,
      title: "4. NB-IoT: špecifikácie a výhody",
      description:
        "V tejto téme sa budeme zaoberať štandardom NB-IoT, jeho špecifikáciami a výhodami.  Zistíme, aké sú hlavné vlastnosti a špecifikácie tohto štandardu, ako napríklad jeho schopnosť prenášať údaje cez úzky pás, nízku spotrebu energie a vysokú priepustnosť signálu.",
    },
    {
      id: 5,
      title: "5. NB-IoT: aplikácie",
      description:
        "V tejto téme sa budeme zaoberať aplikáciami NB-IoT v kontexte smart city, smart meters a smart building. Detailne preskúmame, ako NB-IoT technológia prispieva k rozvoju inteligentných miest, zariadení pre meranie spotreby energie a inteligentných budov.",
    },
    {
      id: 6,
      title: "6. Porovnanie technológií LPWAN",
      description:
        "V tejto téme sa zameriame na porovnanie technológií LPWAN, konkrétne Sigfox, NB-IoT a LoRaWAN. Preskúmame jedinečné vlastnosti, výhody a obmedzenia každej z týchto technológií a analyzujeme ich vhodnosť pre rôzne aplikácie a scenáre použitia.",
    },
  ];

  const { data: session, status } = useSession();
  return (
    <>
      <section className="px-16 flex flex-col gap-4">
        <h1 className="text-4xl font-bold text-center mt-[40px]">
          Webová e-learningová aplikácia pre LPWAN
        </h1>
        <h1 className="text-4xl font-bold text-center m-[20px]">Témy</h1>
        <div className="flex flex-row flex-wrap gap-10 mx-auto justify-center">
          {topics.map((topic) => (
            <Card key={topic.id} className="w-[25rem]">
              <CardHeader>
              <CardTitle style={{ lineHeight: '1.5' }}>{topic.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{topic.description}</CardDescription>
              </CardContent>
              <CardFooter className="flex justify-center">
                  <Link
                    className={buttonVariants({ variant: "default" })}
                    href={`/topics/${topic.id}`}
                  >
                    Pozrieť
                  </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <Separator className="my-[40px]" />

        <h1 className="text-4xl font-bold text-center my-[20px]">
          Prečo by sme mali vedieť, čo je LPWAN?
        </h1>

        <Accordion type="single" collapsible className="mx-[100px] mb-[30px]">
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

        <p className="mx-[100px] pb-[50px]">
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
