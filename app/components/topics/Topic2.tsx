"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { tests } from "@/mock/tests";
import { useRef } from "react";
import TestControll from "../controll/page";
import axios from "axios";
import { TestResponse } from "@/lib/types";
import { useSession } from "next-auth/react";

const Topic2 = () => {
  const searchParams = useSearchParams();
  const topicStep = +(
    searchParams.get("step") ||
    window.localStorage.getItem("topic2-step") ||
    1
  );
  const [step, setStep] = useState(topicStep);

  function scrollToTop() {
    headerRef.current?.scrollIntoView();
  }

  const topicParts = [
    {
      subtitle: "2.1 LoRa Alliance",
      content: (
        <span>
          LoRaWAN je vlastný protokol pripojenia LPWAN vyvinutý spoločnosťou
          Semtech. Je známy svojou nízkou spotrebou energie a vysokým prenosovým
          dosahom (aj v porovnaní s inými sieťami LPWAN).
          <br />
          <br />
          Má tiež vysokú odolnosť voči rušeniu, keďže jeho bezdrôtová modulácia
          je založená na technológii vyvinutej pre vojenský a vesmírny
          priemysel. V roku 2017 bol paket LoRaWAN prenesený na vzdialenosť 702
          km, čím boli prekonané predchádzajúce rekordy. Tieto jedinečné
          vlastnosti z neho robia ideálny protokol pripojenia pre rôzne prípady
          použitia internetu vecí.
          <br />
          <br />
          Protokol LoRaWAN spravuje LoRa Alliance, otvorené neziskové združenie.
          Jej členmi sú certifikovaní výrobcovia zariadení, poskytovatelia
          služieb a verejné inštitúcie. Napríklad, spoločnosť Google Cloud je
          sponzorským členom LoRa Alliance.
        </span>
      ),
      image: "/images/lora_alliance.png",
      step: 1,
    },
    {
      subtitle: "2.2 Obmedzenia a výhody LoRaWAN",
      content: (
        <span>
          LoRaWAN dosahuje nižší výkon a dlhý dosah čiastočne obetovaním šírky
          pásma. Použitie bezlicenčných frekvenčných pásiem (napríklad 868 MHz v
          Európe) umožňuje posielať správy nahor a nadol len vo vopred
          definovaných intervaloch, a teda neumožňuje nepretržitý tok údajov.
          <br />
          <br />
          Ďalšie obmedzenie siete LoRaWAN môže byť spôsobené proprietárnym
          stavom modulácie LoRa. Výrobcovia, ktorí chcú vyvíjať zariadenia IoT
          založené na vlastnej čipovej súprave, budú musieť najprv získať
          licenciu na IP od spoločnosti Semtech.
        </span>
      ),
      content2: (
        <span>
          LoRaWAN umožňuje spoľahlivú a bezpečnú komunikáciu a do dátových
          paketov pridáva hlavičky. Tu sú výhody, o ktorých treba vedieť.
          <br />
          <br />
          <b>Väčší dosah</b> - komunikačný dosah nízkovýkonných snímačov
          pracujúcich v sieti LoRaWAN sa meria v kilometroch.
          <br />
          <br />
          <b>Nízka spotreba</b> - nízka spotreba zvyšuje výdrž batérie pre
          zariadenia IoT. LoRaWAN zabezpečuje, že batérie senzorov vydržia roky,
          kým sa vybijú. To je najdôležitejšia výhoda siete LoRaWAN.
          <br />
          <br />
          <b>Jednoduchá architektúra</b> - jedno zariadenie brány LoRaWAN je
          navrhnuté tak, aby zvládlo tisíce koncových zariadení alebo uzlov.
          Napriek veľkému počtu sa technológia vďaka jednoduchej architektúre
          ľahko nasadzuje.
          <br />
          <br />
          <b>Rýchle nasadenie</b> - LoRaWAN pracuje s menšou šírkou pásma, preto
          je takou jasnou voľbou pre praktické nasadenie IoT so slabými dátovými
          prenosmi.
        </span>
      ),
      image: "/images/lora_limits.avif",
      step: 2,
    },
  ];

  useEffect(() => {
    console.log("Setting step", step);
    window.localStorage.setItem("topic2-step", step.toString());
  }, [step]);

  useEffect(() => {
    if (searchParams.get("step") && +searchParams.get("step")! !== 0) {
      setStep(+searchParams.get("step")!);
    }
  }, [searchParams.get("step")]);

  const [test, setTest] = useState<TestResponse>();
  useEffect(() => {
    axios
      .get("/api/tests/test", {
        params: {
          id: 2,
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

  const headerRef = useRef<HTMLDivElement>(null);
  const [answers, setAnswers] = useState<
    { questionId: number; answer: number; answerId: number }[]
  >([]);

  const { data: session } = useSession();

  return (
    <>
      <ScrollArea className="h-full min-h-screen w-full rounded-md p-4 sm:px-2 md:px-40">
        <div
          ref={headerRef}
          className="title scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center my-[40px]"
        >
          {" "}
          LoRaWAN: Lora Alliance, obmedzenia a výhody
        </div>

        {topicParts.map((topic, i) => (
          <section
            key={topic.step}
            className={`${step === topic.step ? "block" : "hidden"}`}
          >
            {topic.step === 1 && <Progress value={0} />}

            {topic.step === 2 && <Progress value={33} />}

            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mt-[30px]">
              {topic.subtitle}
            </h2>

            <div className="content text-base text-muted-foreground my-[30px] flex items-center flex-col gap-4 ">
              <p>{topic.content}</p>
              {topic.image == "/images/lora_alliance.png" && (
                <Image
                  src={topic.image}
                  alt="lpwan"
                  className="img my-[30px]"
                  width={800}
                  height={700}
                />
              )}

              {topic.image == "/images/lora_limits.avif" && (
                <Image
                  src={topic.image}
                  alt="lpwan"
                  className="img my-[30px]"
                  width={600}
                  height={500}
                />
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

        {step === 3 && (
          <>
            {!session ? (
              <div className="text-center">
                <p className="text-red-500 font-bold text-3xl">
                  Musíte sa prihlásiť, aby ste mohli začať testovanie.
                </p>
              </div>
            ) : (
              <>
                {session && session.user.topicsCompleted + 1 < 2 ? (
                  <div className="text-center">
                    <p className="text-red-500 font-bold text-3xl">
                      Aby ste sa dostali k tomuto testu, musíte absolvovať
                      predchádzajúce témy.
                    </p>
                  </div>
                ) : (
                  <>
                    <Progress className="mb-10" value={67} />
                    {test &&
                      test.questions.map((question, i) => (
                        <RadioGroup
                          key={question.id}
                          className="flex flex-col space-y-1 mb-2 border-solid border-2 border-sky-600 m-5 rounded-md p-3"
                        >
                          <h3 className="text-xl font-semibold">
                            {question.text}
                          </h3>
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
                      {test && <TestControll answers={answers} testId={2} />}
                    </div>
                  </>
                )}
              </>
            )}
          </>
        )}
      </ScrollArea>
    </>
  );
};

export default Topic2;
