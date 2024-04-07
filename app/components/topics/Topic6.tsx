"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import { tests } from "@/mock/tests";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRef } from "react";
import TestControll from "../controll/page";
import axios from "axios";
import { TestResponse } from "@/lib/types";
import { useSession } from "next-auth/react";

const Topic6 = () => {
  const searchParams = useSearchParams();
  const topicStep = +(
    searchParams.get("step") ||
    window.localStorage.getItem("topic6-step") ||
    1
  );
  const [step, setStep] = useState(topicStep);

  useEffect(() => {
    console.log("Setting step", step);
    window.localStorage.setItem("topic6-step", step.toString());
  }, [step]);

  useEffect(() => {
    if (searchParams.get("step") && +searchParams.get("step")! !== 0) {
      setStep(+searchParams.get("step")!);
    }
  }, [searchParams.get("step")]);

  function scrollToTop() {
    headerRef.current?.scrollIntoView();
  }

  const topicParts = [
    {
      subtitle: "6.1 Sigfox vs LoRa vs NB-IoT",
      content: (
        <span>
          Výber správnej technológie internetu vecí môže byť zásadným
          rozhodnutím. Rozdiely medzi NB-IoT, LoRa a Sigfox, pokiaľ ide o
          pokrytie a dosah, rýchlosť spotreby energie, rýchlosť prenosu dát a
          časy latencie, vplyv na náklady a funkcie zabezpečenia môžu výrazne
          ovplyvniť efektivitu a efektivitu vášho riešenia IoT.
          <br />
          <br />
          Tu sú faktory, ktoré treba zvážiť:
          <br />
          <br />
          <b>- pokrytie a dosah:</b> NB-IoT poskytuje vynikajúce vnútorné a
          hlboké prenikanie, LoRa ponúka konektivitu na veľké vzdialenosti vo
          vidieckych a mestských oblastiach, zatiaľ čo Sigfox má globálny dosah.
          <br />
          <br />
          <b>- spotreba energie:</b> všetky tri technológie ponúkajú nízku
          spotrebu energie, ale presná rýchlosť bude závisieť od konkrétneho
          prípadu použitia a aktivity zariadenia. Dátová rýchlosť a latencia:
          NB-IoT podporuje vyššie dátové rýchlosti a nižšiu latenciu ako LoRa a
          Sigfox, vďaka čomu je vhodný pre aplikácie vyžadujúce časté dátové
          prenosy.
          <br />
          <br />
          <b>- náklady:</b> Sigfox má zvyčajne najnižšie náklady na
          infraštruktúru a zariadenia, zatiaľ čo NB-IoT môže zahŕňať vyššie
          náklady v dôsledku používania mobilnej infraštruktúry.
          <br />
          <br />
          <b>- zabezpečenie:</b> NB-IoT, súčasť mobilného štandardu, ponúka
          robustné bezpečnostné funkcie, zatiaľ čo LoRa a Sigfox tiež poskytujú
          dobré zabezpečenie, ale môžu byť náchylnejšie na rušenie.
        </span>
      ),
      content2: (
        <span>
          NB-IoT je ideálny pre aplikácie vyžadujúce vysoké kapacity a
          vynikajúce vnútorné pokrytie, ako je inteligentné meranie a sledovanie
          majetku. LoRa je vďaka svojmu dlhému dosahu skvelá na monitorovanie
          poľnohospodárstva a životného prostredia. Sigfox so svojimi nízkymi
          nákladmi a globálnym pokrytím je ideálny pre logistiku a sledovanie
          dodávateľského reťazca.
          <br />
          <br />
          Výber medzi týmito sieťami bude závisieť od konkrétnych požiadaviek
          vášho projektu IoT. Jasné pochopenie týchto troch technológií vás môže
          viesť k najvhodnejšej voľbe.
          <br />
          <br />
          Ďalej uvádzame porovnanie charakteristík technológií LPWAN.
        </span>
      ),
      images: [
        {
          src: "/images/tabulka1.jpg",
          alt: "lpwan comparison",
          width: 700,
          height: 700,
        },
        {
          src: "/images/tabulka2.jpg",
          alt: "lpwan comparison",
          width: 700,
          height: 700,
        },
      ],
      step: 1,
    },
  ];

  const [test, setTest] = useState<TestResponse>();
  useEffect(() => {
    axios
      .get("/api/tests/test", {
        params: {
          id: 6,
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
  if (session?.user.topicsCompleted! < 5) {
    return (
      <div className="text-center text-2xl">
        Pre prístup k tejto téme musíte najprv dokončiť predchádzajúcu tému.
      </div>
    );
  }

  return (
    <>
      <ScrollArea className="h-full min-h-screen w-full rounded-md border p-4 px-32">
        <div
          ref={headerRef}
          className="title scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center my-[40px]"
        >
          {" "}
          Porovnanie technológií LPWAN
        </div>

        {topicParts.map((topic, i) => (
          <section
            key={topic.step}
            className={`${step === topic.step ? "block" : "hidden"}`}
          >
            {topic.step === 1 && <Progress value={0} />}

            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mt-[30px]">
              {topic.subtitle}
            </h2>

            <div className="content text-base text-muted-foreground my-[30px] flex items-center flex-col gap-4 ">
              <p>{topic.content}</p>

              {topic.images[0].alt === "gateway" ? (
                <Image
                  src={topic.images[0].src}
                  alt={topic.images[0].alt}
                  className="img my-[30px]"
                  width={300}
                  height={300}
                />
              ) : (
                <Image
                  src={topic.images[0].src}
                  alt={topic.images[0].alt}
                  className="img my-[30px]"
                  width={500}
                  height={500}
                />
              )}

              {topic.content2 && <p>{topic.content2}</p>}

              {topic.images && topic.images.length >= 2 && (
                <Image
                  src={topic.images[1].src}
                  alt={topic.images[1].alt}
                  className="img my-[30px]"
                  width={500}
                  height={500}
                />
              )}
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
        {step === 2 && (
          <>
            <Progress className="mb-10" value={50} />
            {test &&
              test.questions.map((question, i) => (
                <RadioGroup className="flex flex-col space-y-1 mb-2 border-solid border-2 border-sky-600 m-5 rounded-md p-3">
                  <h3 className="text-xl font-semibold">{question.text}</h3>
                  {question.answers.map((answer, j) => (
                    <div className="flex gap-2 items-center " key={answer.id}>
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
              {test && <TestControll answers={answers} testId={6} />}
            </div>
          </>
        )}
      </ScrollArea>
    </>
  );
};

export default Topic6;
