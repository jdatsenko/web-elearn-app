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

const Topic5 = () => {
  const searchParams = useSearchParams();
  const topicStep = +(
    searchParams.get("step") ||
    window.localStorage.getItem("topic5-step") ||
    1
  );
  const [step, setStep] = useState(topicStep);

  useEffect(() => {
    console.log("Setting step", step);
    window.localStorage.setItem("topic5-step", step.toString());
  }, [step]);

  useEffect(() => {
    if (searchParams.get("step") && +searchParams.get("step")! !== 0) {
      setStep(+searchParams.get("step")!);
    }
  }, [searchParams.get("step")]);

  function scrollToTop() {
    headerRef.current?.scrollIntoView();
  }

  const [test, setTest] = useState<TestResponse>();
  useEffect(() => {
    axios
      .get("/api/tests/test", {
        params: {
          id: 5,
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
  if (session?.user.topicsCompleted! < 4) {
    return (
      <div className="text-center text-2xl">
        Pre prístup k tejto téme musíte najprv dokončiť predchádzajúcu tému.
      </div>
    );
  }

  const topicParts = [
    {
      subtitle: "5.1 Smart meters",
      content: (
        <span>
          NB-IoT sa môže používať v rôznych aplikáciách vrátane inteligentného
          merania pre verejné služby, ako je elektrina, plyn a voda, služieb
          správy budov, zabezpečenia v komerčných objektoch, sledovania
          obyvateľov a pripojenia priemyselných zariadení a systémov.
          <br />
          <br />
          <b>Smart meters</b> sú zariadenia podporované internetom vecí, ktoré
          merajú údaje z meračov. Môže ísť o spotrebu vody pri vodomeroch alebo
          o úroveň napätia, prúd a účinník pri elektromeroch. Spotrebiteľom
          poskytuje prehľad o ich spotrebiteľskom správaní. Zatiaľ čo
          dodávateľom verejných služieb pomáha monitorovať ich systémy a
          presnejšie účtovať zákazníkom.
          <br />
          <br />
          NB-IoT je ideálnym riešením pre aplikácie pokročilej meracej
          infraštruktúry (AMI) a automatizácie distribúcie (DA). NB-IoT môže
          poskytnúť bezpečnú a spoľahlivú komunikačnú sieť pre infraštruktúru
          merania a systém riadenia distribúcie (DMS) na výmenu údajov a umožniť
          obojsmernú komunikáciu medzi dodávateľom a spotrebiteľom.
        </span>
      ),
      content2: (
        <span>
          Smart meters sa v podstate nazývajú smart, pretože umožňujú obojsmernú
          komunikáciu, môžu komunikovať s inými zariadeniami, ako sú
          inteligentné spotrebiče a vybavenie domácností, a môžu byť diaľkovo
          monitorované a riadené prevádzkovateľom distribučných služieb (DSO).
          <br />
          <br />
          Prevádzkovateľ distribučnej siete je poskytovateľ verejných služieb,
          ktorý poskytuje určité služby. Smart meters dokážu merať množstvo
          spotrebovaných médií, ako aj množstvo médií, ktoré sa dodáva do siete.
          Údaje sa v pravidelných intervaloch posielajú prevádzkovateľom
          distribučných sietí, ktorí ich okrem iného využívajú na mapovanie
          špičiek spotreby a získavanie poznatkov, pričom ich zároveň
          odovzdávajú dodávateľovi médií na účely fakturácie.
          <br />
          <br />
          Jedným z prísľubov inteligentných meračov je presnejšie meranie a
          fakturácia, často aj v kombinácii s dynamickou cenotvorbou.
        </span>
      ),
      images: [
        {
          src: "/images/smart_meter.jpeg",
          alt: "smart meter",
          width: 600,
          height: 300,
        },
        {
          src: "/images/smart_meters2.jpg",
          alt: "how do smart meters work",
          width: 600,
          height: 300,
        },
      ],
      step: 1,
    },
    {
      subtitle: "5.2 Smart cities",
      content: (
        <span>
          Koncept <b>Smart cities</b> predstavuje komplexný prístup k fungovaniu
          mestského regiónu, ktorý zasahuje do rôznych spoločenských oblastí ako
          kultúra, infraštruktúra, životné prostredie, energetika, sociálne
          služby a ďalšie.
        </span>
      ),
      content2: (
        <span>
          Technologický vývoj viedol smart cities od fáz 1.0 a 2.0 k evolúcii
          smerom k informatizácii orientovanej na ľudí. Smart City 1.0 bolo
          založené na PC a internete s e-govermentom a elektronickým obchodom
          ako hlavnými aplikačnými scenármi, zatiaľ čo Smart City 2.0 bolo
          založené na smartfónoch a mobilnom internete s mobilnými platbami ako
          hlavným aplikačným scenárom.
          <br />
          <br />
          Vznik úzkopásmového internetu vecí (NB-IoT), úzkopásmovej technológie
          masívneho pripojenia mobilného internetu vecí, priniesol Smart City
          3.0. V tejto generácii Smart Cities slúži internet vecí ako neurónová
          sieť mesta a umelá inteligencia (AI) ako mozog mesta.
          <br />
          <br />
          Smart City 3.0 sa venuje komplexným prepojeniam medzi vecami a ľuďmi,
          ako aj medzi vecami a vecami. Podľa výskumnej správy, ktorú v roku
          2017 vypracovala spoločnosť Markets and Markets, sa očakáva, že objem
          globálneho trhu s inteligentnými mestami sa do roku 2022 zvýši zo
          424,68 miliardy USD v roku 2017 na 1,20169 bilióna USD, pričom zložená
          ročná miera rastu dosiahne 23,1 %.
        </span>
      ),
      images: [
        {
          src: "/images/smart_city.png",
          alt: "smart city",
          width: 600,
          height: 300,
        },
      ],
      step: 2,
    },
    {
      subtitle: "5.3 Smart Building",
      content: (
        <span>
          Ďalšou oblasťou použitia, ktorá sa dokonale hodí na využitie
          Narrowband IoT, je <b>Smart Building</b>, teda inteligentné sieťovanie
          a automatizácia v budovách, ako sú nákupné centrá, nemocnice alebo
          administratívne budovy.
          <br />
          <br />
          Pomocou Smart Building možno centrálne ovládať napríklad dvere,
          výťahy, žalúzie, vetranie alebo osvetlenie – v závislosti od toho,
          koľko ľudí je v danom čase na mieste. Správa budov a energie sa tak
          stáva oveľa efektívnejšou a transparentnejšou. Zvýši sa komfort a
          bezpečnosť ľudí na mieste. Toto je aspekt, ktorý sa stal ešte
          dôležitejším, najmä v dôsledku pandémie Corona.
        </span>
      ),
      content2: (
        <span>
          Výhody tejto technológie:
          <br />
          <br />
          <b>- pohodlie pre obyvateľov</b> vďaka riadeniu osvetlenia, teploty,
          vlhkosti a ďalších parametrov a umožneniu personalizovaného nastavenia
          komfortu;
          <br />
          <br />
          <b>- automatizované riadenie</b> systémov HVAC, elektrických,
          osvetľovacích, tieniacich, prístupových a bezpečnostných systémov
          budovy na základe zberu a analýzy údajov o podmienkach prostredia,
          správaní obyvateľov a ďalších;
          <br />
          <br />
          <b>- optimalizácia nákladov</b> vďaka analýze modelov využívania
          budovy a úpravám s cieľom zlepšiť údržbu budovy, optimalizovať
          prevádzku HVAC, zosúladiť modely obsadenosti s využívaním energie,
          zvýšiť efektívnosť využívania priestoru a ďalšie;
          <br />
          <br />
          <b>- zníženie vplyvu na životné prostredie</b> vďaka analýze podmienok
          vnútorného a vonkajšieho prostredia, správania obyvateľov a ďalších
          údajov s cieľom optimalizovať vzorce spotreby energie a vody a znížiť
          emisie;
          <br />
          <br />
          <b>- možnosti integrácie</b>, vďaka ktorým nie je potrebné stavať
          alebo sa sťahovať do novej budovy, aby ste mohli využívať výhody
          inteligentnej technológie. Moderné riešenia inteligentných budov možno
          zabudovať do starších stavieb;
          <br />
          <br />
          <b>- preventívna údržba</b> vďaka analýze údajov o zariadeniach v
          reálnom čase a historických údajov a zisťovaniu vzorcov vedúcich k
          potenciálnej poruche;
          <br />
          <br />
          <b>- zlepšenie zdravia a pohody</b> vďaka podpore úsilia o fyzické
          vzdialenie sa prostredníctvom optimalizácie priestoru a systémov
          kontroly prístupu a zlepšenia kvality vzduchu v interiéri
          prostredníctvom efektívnej prevádzky HVAC a ďalších.
        </span>
      ),
      images: [
        {
          src: "/images/nb-iot_pros.jpg",
          alt: "nb pros",
          width: 600,
          height: 300,
        },
      ],
      step: 3,
    },
  ];
  return (
    <>
      <ScrollArea className="h-full min-h-screen w-full rounded-md border p-4 px-32">
        <div
          ref={headerRef}
          className="title scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center my-[40px]"
        >
          {" "}
          NB-IoT: aplikácie
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

              <Image
                src={topic.images[0].src}
                alt={topic.images[0].alt}
                className="img my-[30px]"
                width={600}
                height={600}
              />

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
        {step === 4 && (
          <>
            {!session ? (
              <div className="text-center">
                <p className="text-red-500 font-bold text-3xl">
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
                          className="flex gap-2 items-center"
                          key={answer.id}
                        >
                          <RadioGroupItem
                            key={i}
                            value={answer.text}
                            checked={answers[i].answer === j + 1}
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
                  {test && <TestControll answers={answers} testId={5} />}
                </div>
              </>
            )}
          </>
        )}
      </ScrollArea>
    </>
  );
};

export default Topic5;
