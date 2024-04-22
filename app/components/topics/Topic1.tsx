"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useRef } from "react";
import TestControll from "../controll/page";
import axios from "axios";
import { TestResponse } from "@/lib/types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Topic1 = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const topicStep = +(
    searchParams.get("step") ||
    window.localStorage.getItem("topic1-step") ||
    1
  );
  const [step, setStep] = useState(topicStep);

  function scrollToTop() {
    headerRef.current?.scrollIntoView();
  }
  const topicParts = [
    {
      subtitle: "1.1 Technológia LPWAN",
      content: (
        <span>
          Technológia LPWAN (Low Power Wide Area Network) je jedným z nových
          konceptov, ktoré sa dostali do popredia v roku 2013. Väčšina zariadení
          IoT vybavených v inteligentných mestách nemá žiadne požiadavky na
          konštantnú rýchlosť, ako aj šírku pásma zariadení kupujúcich. Mnohé
          útvary používajú konvenčný bunkový systém LTE, zatiaľ čo technológia
          LPWAN sa v roku 2015 stala významnou technológiou a tiež ideálnou
          voľbou aplikácií internetu vecí.
          <br />
          <br />
          V tom istom roku bezdrôtové združenie GSM vytvorilo súbor
          nízkovýkonných rozsiahlych sietí, ktoré drasticky pomáhajú operátorom
          pri zosúladení konkrétnych nákladov a normy spotreby energie
          požadovanej pre aplikácie internetu vecí. Siete LPWAN môžu prijímať
          pakety s veľkosťou od 10 do 1 000 bajtov pri rýchlosti uplinku do 200
          Kb/s. <br />
          <br />
          Dlhý dosah LPWAN sa pohybuje od 2 km do 1 000 km v závislosti od
          technológie. Vzhľadom na prevádzku siete LPWAN s vyššou energetickou
          účinnosťou a účinnosťou šírky pásma pre rozsiahlu oblasť nie je
          potrebná veľká infraštruktúra a hardvér, ktoré môžu preukázať
          nákladovú efektívnosť technológie LPWAN.
        </span>
      ),
      images: [
        {
          src: "/images/lpwan.jpeg",
          alt: "lpwan",
          width: 720,
          height: 540,
        },
      ],
      step: 1,
    },
    {
      subtitle: "1.2 Typy technológie LPWAN",
      content: (
        <span>
          Väčšina sietí LPWAN má hviezdicovú topológiu, v ktorej sa podobne ako
          v sieti Wi-Fi každý koncový bod pripája priamo k spoločným centrálnym
          prístupovým bodom. Patentovaná nelicencovaná sieť Sigfox je v
          súčasnosti jednou z najrozšírenejších sietí LPWAN.
          <br />
          <br />
          Táto ultra úzkopásmová technológia, ktorá beží cez verejnú sieť v
          pásmach 868 MHz alebo 902 MHz, umožňuje prevádzku len jednému
          operátorovi v každej krajine.
          <br />
          <br />
          LoRa pod vedením spoločnosti Semtech je prostredníctvom LoRa Alliance
          navrhovaná ako otvorený štandard, ale skutočnosť je taká, že zatiaľ
          jediným výrobcom polovodičov pre LoRa je spoločnosť Semtech a všetky
          existujúce moduly a dokonca aj brány sú striktne založené na recepte,
          ktorý Semtech poskytuje vybraným spoločnostiam. Na papieri je teda
          LoRa otvorená, ale ingrediencie potrebné na výrobu riešení LoRa sú k
          dispozícii len od spoločnosti Semtech a receptúru tiež kontroluje
          spoločnosť Semtech.
          <br />
          <br />
          Modulácia LoRa, ktorá je derivátom chirp spread spectrum (CSS),
          umožňuje používateľom definovať veľkosť paketu. LoRaWAN je protokol
          vrstvy riadenia prístupu k médiu (MAC), ktorý riadi komunikáciu medzi
          zariadeniami LPWAN a bránami.
          <br />
          <br />
          Narrowband-IoT a LTE-M sú štandardy projektu 3GPP (3rd Generation
          Partnership Project), ktoré fungujú v licencovanom spektre. Hoci majú
          podobný výkon ako ostatné štandardy, fungujú na existujúcej bunkovej
          infraštruktúre mobilných operátorov, čo umožňuje poskytovateľom
          služieb rýchlo pridať bunkové pripojenie IoT do portfólia svojich
          služieb.
        </span>
      ),
      images: [
        {
          src: "/images/nb-iot_logo.png",
          alt: "nb-iot",
          width: 600,
          height: 300,
        },
        {
          src: "/images/lora_logo.png",
          alt: "lorawan",
          width: 600,
          height: 300,
        },
      ],
      step: 2,
    },
    {
      subtitle: "1.3 Aplikácie technológií LPWAN",
      content: (
        <span>
          LPWAN sa bežne používajú v inteligentnom meraní, inteligentnom
          osvetlení, monitorovaní a sledovaní majetku, inteligentných mestách,
          precíznom poľnohospodárstve, monitorovaní hospodárskych zvierat,
          správe energie, výrobe a priemyselnom nasadení internetu vecí.
          <br />
          <br />
          Výber LPWAN závisí od konkrétnej aplikácie, konkrétne od požadovanej
          rýchlosti, množstva dát a pokrytej oblasti. LPWAN sú najvhodnejšie pre
          aplikácie vyžadujúce zriedkavé doručovanie menších správ uplinkom.
          Väčšina technológií LPWAN má tiež funkcie downlink. S nižšími
          požiadavkami na energiu, dlhším dosahom a nižšími nákladmi ako
          tradičné mobilné siete umožňujú LPWAN množstvo aplikácií M2M a IoT, z
          ktorých mnohé boli predtým obmedzené rozpočtom a problémami s
          napájaním.
        </span>
      ),
      content2: (
        <span>
          Niektoré príklady súčasných aplikácií LPWAN:{" "}
          <b>inteligentné meranie</b> (pripojené elektromery),{" "}
          <b>inteligentné parkovanie</b> (prepojené parkoviská: senzory v
          podzemných a podzemných garážach),{" "}
          <b>inteligentné nakladanie s odpadom</b> (prepojené komunálne
          odpadkové koše), <b>sledovanie majetku</b> (ako je celoštátne
          sledovanie a sledovanie nákladných nosičov, ako sú paletové klietky,
          palety a kontajnery),
          <b> prepojené budovy</b> (senzory v mostoch alebo tuneloch merajú
          teplotu, vlhkosť a koróziu a identifikujú zraniteľné miesta dlho
          predtým, než dôjde k viditeľnému poškodeniu),
          <b> monitorovanie stavu</b> (senzory v stavebných strojoch a vozidlách
          rozpoznávajú poruchy alebo krádež).
        </span>
      ),
      images: [
        {
          src: "/images/lpwan_app2.webp",
          alt: "lpwan",
          width: 300,
          height: 270,
        },
      ],
      step: 3,
    },
  ];

  useEffect(() => {
    console.log("Setting step", step);
    window.localStorage.setItem("topic1-step", step.toString());
  }, [step]);

  useEffect(() => {
    if (searchParams.get("step") && +searchParams.get("step")! !== 0) {
      setStep(+searchParams.get("step")!);
    }
  }, [searchParams.get("step")]);

  const headerRef = useRef<HTMLDivElement>(null);

  const [test, setTest] = useState<TestResponse>();
  useEffect(() => {
    axios
      .get("/api/tests/test", {
        params: {
          id: 1,
        },
      })
      .then((res) => {
        console.log(res.data);
        const resTest = res.data as TestResponse;
        setTest(res.data);
        setAnswers(
          resTest.questions.map((question) => ({
            questionId: question.id,
            answerId: 0,
            answer: 0,
          }))
        );
      });
  }, []);

  const [answers, setAnswers] = useState<
    { questionId: number; answer: number; answerId: number }[]
  >([]);

  return (
    <>
      <ScrollArea className="h-full max-h-screen w-full rounded-md p-4 sm:px-2 md:px-40">
        <div
          ref={headerRef}
          className="title text-4xl font-extrabold tracking-tight lg:text-5xl text-center my-[40px]"
        >
          {" "}
          LPWAN: technológie a aplikácie
        </div>

        {topicParts.map((topic, i) => (
          <section
            key={topic.step}
            className={`${step === topic.step ? "block" : "hidden"}`}
          >
            {topic.step === 1 && <Progress value={0} />}

            {topic.step === 2 && <Progress value={25} />}

            {topic.step === 3 && <Progress value={50} />}

            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mt-[30px]">
              {topic.subtitle}
            </h2>

            <div className="content text-base text-muted-foreground my-[30px] flex items-center flex-col gap-4 ">
              <p>{topic.content}</p>

              {topic.images.length == 1 && (
                <Image
                  src={topic.images[0].src}
                  alt={topic.images[0].alt}
                  className="img my-[30px]"
                  width={700}
                  height={700}
                />
              )}

              {topic.images.length > 1 && (
                <Carousel className="">
                  <CarouselContent className="w-[400px]">
                    {topic.images.map((image, i) => (
                      <CarouselItem key={i} className="item">
                        <div>
                          {i === 0 ? (
                            <Image
                              src={image.src}
                              alt={image.alt}
                              width={image.width}
                              height={image.height}
                              className="mt-[25px]"
                            />
                          ) : (
                            <Image
                              src={image.src}
                              alt={image.alt}
                              className="bg-slate-200 mt-[20px]"
                              width={image.width}
                              height={image.height}
                            />
                          )}
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>

                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              )}

              {topic.content2 && <p>{topic.content2}</p>}
            </div>
            <div className="flex">
              {i !== 0 && (
                <Button
                  variant={"secondary"}
                  onClick={() => {
                    setStep(step - 1);
                    scrollToTop();
                  }}
                  className="mt-4"
                >
                  Späť
                </Button>
              )}

              <Button
                onClick={() => {
                  setStep(step + 1);
                  scrollToTop();
                }}
                className="mt-4 ml-auto"
              >
                Ďalej
              </Button>
            </div>
          </section>
        ))}

        {step === 4 && (
          <>
            {!session ? (
              <div className="text-center">
                <p className="text-red-500 text-3xl font-bold">
                Musíte sa prihlásiť, aby ste mohli začať testovanie.
                </p>
              </div>
            ) : (
              <>
                <Progress className="mb-10" value={75} />
                {test &&
                  test.questions.map((question, i) => (
                    <RadioGroup
                      key={question.id}
                      className="flex flex-col space-y-1 mb-2 border-solid border-2 border-sky-600 m-5 rounded-md p-3"
                    >
                      <h3 className="text-xl font-semibold">{question.text}</h3>
                      {question.answers.map((answer, j) => (
                        <div
                          className="flex gap-2 items-center "
                          key={answer.id}
                        >
                          <RadioGroupItem
                            key={i}
                            value={answer.text}
                            checked={answers[i].answer == j + 1}
                            onClick={(e) => {
                              const newAnswers = [...answers];
                              newAnswers[i] = {
                                questionId: question.id,
                                answerId: answer.id,
                                answer: j + 1,
                              };
                              setAnswers(newAnswers);
                              console.log(newAnswers);
                            }}
                          />
                          <span>{answer.text}</span>
                        </div>
                      ))}
                    </RadioGroup>
                  ))}
                <div className="flex justify-center">
                  {test && <TestControll answers={answers} testId={1} />}
                </div>
              </>
            )}
          </>
        )}
      </ScrollArea>
    </>
  );
};

export default Topic1;
