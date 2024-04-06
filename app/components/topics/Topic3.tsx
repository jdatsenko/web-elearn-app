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

const Topic3 = () => {
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
      subtitle: "3.1 Ako funguje architektúra LoRaWAN",
      content: (
        <span>
          Siete LoRaWAN® používajú na komunikáciu medzi koncovými zariadeniami a
          ich pridruženými sieťovými servermi predovšetkým metódu Aloha.
          <br />
          <br />
          Pri použití metódy Aloha koncové zariadenia posielajú údaje cez bránu
          na sieťový server len vtedy, keď jeden alebo 7 viacero ich snímačov
          zaznamená určitú zmenu v prostredí alebo keď sa spustí nejaká iná
          udalosť, napríklad vyprší časovač.
          <br />
          <br />
          Po odoslaní uplinku koncové zariadenie "počúva" správu zo siete jednu
          a dve sekundy po uplinku a potom sa vráti do režimu spánku.
        </span>
      ),
      content2: (
        <span>
          Typická sieť LoRaWAN pozostáva z týchto prvkov: koncové zariadenia,
          brány, sieťový server, aplikačný server. Detailne preskúmajme
          jednotlivé prvky siete LoRaWAN.
        </span>
      ),
      images: [
        {
          src: "/images/lora_architecture.png",
          alt: "lpwan",
          width: 700,
          height: 700,
        },
      ],
      step: 1,
    },
    {
      subtitle: "3.2 Koncové zariadenia",
      content: (
        <span>
          <b>Koncové zariadenia</b> trávia väčšinu času spánkom. Počas tohto
          času spotrebujú menej ako jeden mikroampér energie. Táto metóda úspory
          energie zabezpečuje, že aplikácie môžu dosiahnuť životnosť 10 až 15
          rokov na veľmi malú batériu.
          <br />
          <br />
          Naproti tomu prístup TDMA (Time Division Multiple Access) si vyžaduje
          synchronizáciu zariadení, ktorá je spojená s nákladmi na energiu pre
          koncové zariadenia, pretože musia byť v bdelom stave a vysielať, aby
          sa zabezpečila ich synchronizácia.
          <br />
          <br />
          Koncové zariadenie LoRaWAN môže byť snímač, akčný člen alebo oboje.
          Často sú napájané z batérií. Tieto koncové zariadenia sú bezdrôtovo
          pripojené k sieti LoRaWAN prostredníctvom brán využívajúcich RF
          moduláciu LoRa.
          <br />
          <br />
          Na nasledujúcom obrázku je znázornené koncové zariadenie, ktoré
          pozostáva zo snímačov, ako je teplota, vlhkosť a detekcia pádu.
        </span>
      ),
      images: [
        {
          src: "/images/koncove_zar.jpg",
          alt: "end device",
          width: 600,
          height: 300,
        },
      ],
      step: 2,
    },
    {
      subtitle: "3.3 Brány",
      content: (
        <span>
          Brány LoRaWAN možno rozdeliť na vnútorné (picocell) a vonkajšie
          (macrocell) brány.
          <br />
          <br />
          <b>Vnútorné brány</b> sú cenovo výhodné a vhodné na poskytovanie
          pokrytia v miestach, ako sú napríklad hlboké vnútorné priestory
          (priestory kryté viacerými stenami) a viacpodlažné budovy.
          <br />
          <br />
          Tieto brány majú interné antény alebo externé "pigtail" antény. V
          závislosti od fyzického prostredia vo vnútri budov však niektoré
          vnútorné brány môžu prijímať správy zo snímačov vzdialených niekoľko
          kilometrov. Brána LoRaWAN môže obsluhovať viacero skupín zariadení
          naraz, hoci brány sa často nasadzujú v prekrývajúcich sa skupinách.
          <br />
          <br />
          Brány fungujú ako poštová schránka medzi zariadeniami a cloudom,
          uchovávajú správy, ktoré medzi nimi prechádzajú, ale nečítajú ich.
          Načasovanie správ závisí od toho, ako často sa koncové zariadenie
          zobudí na odosielanie a prijímanie údajov. Ak cloud odošle správu
          zariadeniu, brána správu podrží, kým sa zariadenie najbližšie
          neprebudí.
          <br />
          <br />
          Na nasledujúcom obrázku je znázornená brána The Things Indoor určená
          na priame zapojenie do sieťovej zásuvky.
        </span>
      ),
      content2: (
        <span>
          <b>Vonkajšie brány</b> poskytujú väčšie pokrytie ako vnútorné brány.
          Sú vhodné na poskytovanie pokrytia vo vidieckych aj mestských
          oblastiach.
          <br />
          <br />
          Tieto brány možno namontovať na mobilné veže, strechy veľmi vysokých
          budov, kovové rúry (stožiare) atď. Vonkajšia brána má zvyčajne externú
          anténu (t. j. anténu zo sklených vlákien) pripojenú pomocou
          koaxiálneho kábla. Ak ste dobrí hackeri elektronických výrobkov,
          môžete niektoré vnútorné brány premeniť na vonkajšie brány pomocou
          vodotesných/prachotesných krytov a pridaním externých antén.
          <br />
          <br />
          Na nasledujúcom obrázku je znázornená vonkajšia brána LoRaWAN. Má
          konektory na pripojenie externých antén LoRaWAN, 3G/4G a GPS.
        </span>
      ),
      images: [
        {
          src: "/images/brana_lora.png",
          alt: "gateway",
          width: 300,
          height: 270,
        },
        {
          src: "/images/brana2.png",
          alt: "gateway2",
          width: 300,
          height: 270,
        },
      ],
      step: 3,
    },
    {
      subtitle: "3.4 Servery",
      content: (
        <span>
          <b>Sieťový server</b> spravuje brány, koncové zariadenia, aplikácie a
          používateľov v celej sieti LoRaWAN. Sieťový server je zodpovedný za:
          <br />
          <br />
          <b>Konsolidácia správ:</b> viaceré kópie toho istého dátového paketu
          sa môžu dostať na sieťový server cez viaceré brány. Sieťový server ich
          musí sledovať, analyzovať kvalitu prijatých paketov a informovať
          sieťový kontrolér.
          <br />
          <br />
          <b>Smerovanie:</b> v prípade správ odosielaných zo servera do
          koncového zariadenia (downlinky) sieťový server rozhoduje, ktorá trasa
          je najlepšia na odoslanie správy do daného koncového zariadenia.
          <br />
          <br />
          <b>Riadenie siete:</b> kvalita spojenia môže tiež pomôcť sieťovému
          serveru rozhodnúť o najlepšom faktore šírenia (t. j. komunikačnej
          rýchlosti) pre dané koncové zariadenie. Ide o politiku adaptívnej
          prenosovej rýchlosti (ADR), ktorú riadi sieťový kontrolér.
          <br />
          <br />
          <b>Dohľad nad sieťou a bránou:</b> brány sa zvyčajne pripájajú k
          sieťovému serveru prostredníctvom šifrovaného spojenia internetového
          protokolu (IP). Podobne má sieť zvyčajne rozhranie na uvedenie brány
          do prevádzky a dohľad, ktoré umožňuje poskytovateľovi siete spravovať
          svoje brány, riešiť poruchové situácie, monitorovať alarmy atď.
        </span>
      ),
      content2: (
        <span>
          <b>Aplikačný server</b> spracováva dátové správy špecifické pre
          aplikáciu prijaté z koncových zariadení. Taktiež generuje všetky
          užitočné zaťaženia zostupnej vrstvy aplikácie a odosiela ich
          pripojeným koncovým zariadeniam prostredníctvom sieťového servera.
          <br />
          <br />
          Sieť LoRaWAN môže mať viac ako jeden aplikačný server. Zozbierané
          údaje možno interpretovať použitím techník, ako je strojové učenie a
          umelá inteligencia, na riešenie obchodných problémov.
          <br />
          <br />
          Protokol LoRaWAN je navrhnutý tak, aby podporoval rôzne typy sietí. V
          niektorých prípadoch je poskytovateľ siete a poskytovateľ aplikácie
          ten istý subjekt, v iných prípadoch nie. Vzhľadom na tieto rozdiely
          môžu byť aplikačné servery integrované so sieťovým serverom alebo
          umiestnené inde.
          <br />
          <br />
          Možnosti zapájania zariadení skutočne podporujú tento scenár siete s
          viacerými nájomcami, v ktorej rôzni dodávatelia aplikácií poskytujú
          heterogénne aplikácie.
        </span>
      ),
      images: [
        {
          src: "/images/server_lora.jpg",
          alt: "server",
          width: 600,
          height: 300,
        },
      ],
      step: 4,
    },
  ];

  useEffect(() => {
    console.log("Setting step", step);
    window.localStorage.setItem("topic3-step", step.toString());
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
          id: 3,
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
    <div>
      <ScrollArea className="h-full min-h-screen w-full rounded-md border p-4 px-32">
        <div
          ref={headerRef}
          className="title scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center my-[40px]"
        >
          {" "}
          Architektúra LoRaWAN
        </div>

        {topicParts.map((topic, i) => (
          <section
            key={topic.step}
            className={`${step === topic.step ? "block" : "hidden"}`}
          >
            {topic.step === 1 && <Progress value={0} />}

            {topic.step === 2 && <Progress value={20} />}

            {topic.step === 3 && <Progress value={40} />}

            {topic.step === 4 && <Progress value={60} />}

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
                  width={300}
                  height={300}
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

        {step === 5 && (
          <>
            <Progress className="mb-10" value={80} />
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
    </div>
  );
};

export default Topic3;
