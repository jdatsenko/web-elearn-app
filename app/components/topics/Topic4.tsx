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

const Topic4 = () => {
  const searchParams = useSearchParams();
  const topicStep = +(
    searchParams.get("step") ||
    window.localStorage.getItem("topic3-step") ||
    1
  );
  const [step, setStep] = useState(topicStep);

  function scrollToTop() {
    headerRef.current?.scrollIntoView();
  }

  const topicParts = [
    {
      subtitle: "4.1 NB-IoT a jeho špecifikácie",
      content: (
        <span>
          <b>NB-IoT</b> je technológia, ktorá umožňuje veľkému počtu zariadení
          odosielať dáta tam, kde nie je štandardné pokrytie mobilnej siete.
          Využíva licencované frekvenčné spektrum, kde nedochádza k
          interferencii s inými zariadeniami, čo zaručuje spoľahlivejší prenos
          dát.
          <br />
          <br />
          NB-IoT je LPWAN sieť, ktorá dokáže pokryť veľké oblasti pri použití
          menšieho množstva energie. Táto technológia je použiteľná v rôznych
          scenároch a odvetviach a mohol by byť oveľa lepším riešením ako
          väčšina iných technológií a protokolov, pokiaľ ide o automatické
          odčítanie meračov.
          <br />
          <br />
          Ako už bolo spomenuté, NB-IoT je možné použiť na prenos väčšieho
          množstva dát, najmä v neprístupných oblastiach – odľahlých alebo
          vidieckych lokalitách. Dobrým príkladom by bol aj scenár, v ktorom sú
          moduly umiestnené pod zemou, pretože NB-IoT má lepšie hlboké pokrytie
          v interiéri ako GSM alebo LTE.
          <br />
          <br />
          NB-IoT ako bunková technológia využíva na komunikáciu bunkové pásma a
          bola vytvorená na fungovanie tromi rôznymi spôsobmi:
        </span>
      ),
      content2: (
        <span>
          NB-IoT je poloduplexný, takže účinne podporuje komunikáciu smerom
          nahor, čo umožňuje pripojenie k bunkovej sieti, distribúciu sieťových
          zdrojov do uzla (označovaného aj ako používateľské zariadenie alebo
          UE) a prenos údajov.
          <br />
          <br />
          Pokiaľ ide o zariadenia s podporou NB-IoT, najčastejší scenár
          fungovania zariadenia zahŕňa nasledovné: zariadenie zostáva odpojené
          od siete, kým nemá nejaké údaje na prenos, v tom momente sa pripojí,
          odošle údaje a potom preruší spojenie.
          <br />
          <br />
          Po nadviazaní spojenia si zariadenie udržiava spojenie RRC Connected
          po určitý čas, kým sa stane neaktívnym (známe aj ako "RRC Idle") a
          nakoniec sa odpojí. UE môže v prepojenom režime (RRC Connected)
          prenášať viac údajov a zadávať viac požiadaviek na zdroje, čo v
          podstate napodobňuje fungovanie architektúry LTE.
          <br />
          <br />
          Napriek tomu, NB-IoT umožňuje aj okamžité odpojenie po prijatí
          potvrdenia údajov, znamená to absenciu okna downlinku.
        </span>
      ),
      images: [
        {
          src: "/images/nb_specification.webp",
          alt: "nb specification",
          width: 600,
          height: 300,
        },
      ],
      step: 1,
    },
    {
      subtitle: "4.2 Výhody NB-IoT",
      content: (
        <span>
          V oblasti internetu vecí je 5G nepochybne frekventovaným pojmom. Pred
          vstupom do roku 2020 by žiadneho výrobcu zariadení nenapadlo, aké
          jednoduché je nasadiť aplikácie 5G. Niet divu, že NB-IoT získal v
          posledných rokoch takú veľkú prevahu.
          <br />
          <br />
          NB-IoT sa vzhľadom na svoj potenciál podporovať veľký počet zariadení,
          ako aj jednoduchšiu infraštruktúru, ktorá umožňuje rýchlejšie a
          jednoduchšie prijatie, javí ako ideálna alternatíva.
        </span>
      ),
      content2: (
        <span>
          <b>Intenzita signálu:</b> sila signálu je dôležitým parametrom na
          spoľahlivý prenos dát. NB-IoT zabezpečuje silnú intenzitu signálu pre
          outdoor a indoor pokrytie, pretože jednoducho preniká stavebnými
          prekážkami. Signál je priestupný cez niekoľko múrov, v podzemí alebo
          pod vodou.
          <br />
          <br />
          <b>Globálny dosah:</b> zatiaľ čo hlavní hráči v USA už investovali
          miliardy dolárov do sietí LTE, v mnohých regiónoch sveta je LTE stále
          menej. Väčšie rozmiestnenia GSM existujú mimo USA, kde je možné
          identifikovať nové pásma na využitie pre NB-IoT. NB-IoT by teda mohol
          pomôcť vynálezcom internetu vecí pri objavovaní lacných vstupných
          bodov na nové trhy po celom svete. Dokonca aj v USA môžu menší sieťoví
          operátori, ako napríklad Boost Mobile alebo T-Mobile, využívať NB-IoT
          na svojom existujúcom spektre GSM na zvýšenie konektivity bez toho,
          aby museli investovať do LTE tak ako Verizon alebo AT&T.
          <br />
          <br />
          <b>Široké pokrytie siete:</b> dostupnosť signálu pre pripojenie IoT
          zariadení je na viac ako 52% populácie, pričom signál je tiež dostupný
          v šachtách pod zemou, či oblastiach so zahustenou výstavbou. Silné
          vnútorné pokrytie NB-IoT s 20 dB zosilnením oproti LTE a 100-násobným
          zvýšením oblasti pokrytia. Môže byť použitý pre aplikácie, ako sú
          výrobné priestory, podzemné garáže a kryty inžinierskych sietí, ktoré
          vyžadujú hĺbkové pokrytie okrem splnenia všeobecných požiadaviek na
          pokrytie vidieckych oblastí. Výdrž batérie: hlavnou výhodu NB-IoT
          siete sú nízke energetické nároky, preto môžu byť zariadenia napájané
          z batérie samotných zariadení. Výdrž batérií v zariadení môže byť až
          10 rokov.
          <br />
          <br />
          <b>Bezpečnosť prenosu dát:</b> obojsmerná šifrovaná komunikácia
          zariadení zabezpečuje maximálnu bezpečnosť prenosu dát v celej sieti.
          <br />
          <br />
          <b>Nízke náklady:</b> vďaka nízkym požiadavkám na šírku pásma je
          nasadenie NB-IoT oveľa lacnejšie ako pri iných technológiách internetu
          vecí. Vďaka tomu môžu organizácie poskytovať nízkonákladové pripojenie
          pre veľký počet zariadení, a to aj na vzdialených a ťažko dostupných
          miestach.
          <br />
          <br />
          NB-IoT ponúka oproti iným technológiám internetu vecí viacero výhod.
          Vďaka týmto výhodám je NB-IoT vhodný pre širokú škálu aplikácií
          internetu vecí, od priemyselných a automobilových až po zdravotnícke a
          maloobchodné aplikácie. Vďaka svojej schopnosti pripojiť veľké
          množstvo zariadení na veľké vzdialenosti má NB-IoT potenciál zmeniť
          spôsob, akým žijeme a pracujeme.
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
      step: 2,
    },
  ];

  useEffect(() => {
    console.log("Setting step", step);
    window.localStorage.setItem("topic4-step", step.toString());
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
          id: 4,
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

  return (
    <>
      <ScrollArea className="h-full min-h-screen w-full rounded-md border p-4 px-32">
        <div
          ref={headerRef}
          className="title scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center my-[40px]"
        >
          {" "}
          NB-IoT: špecifikácie a výhody
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

              <Image
                src={topic.images[0].src}
                alt={topic.images[0].alt}
                className="img my-[30px]"
                width={600}
                height={600}
              />

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
            <Progress className="mb-10" value={67} />
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
            {test && <TestControll answers={answers} />}
            </div>
          </>
        )}
      </ScrollArea>
    </>
  );
};

export default Topic4;
