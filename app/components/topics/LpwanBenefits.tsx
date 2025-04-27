import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import { useState } from "react";

const LpwanBenefits = () => {
  return (
    <>
      <h1 className="text-4xl font-bold text-center mt-8 sm:mt-[20px]">
        Prečo by sme mali vedieť, čo je LPWAN?
      </h1>
      <div className="overflow-hidden">
        <Accordion
          type="single"
          collapsible
          className="mx-auto sm:mx-[100px] mb-8 sm:mb-[30px]"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-base w-full text-start text-red-500 py-4">
              <div className="flex justify-between"><p className="hover:underline">1. Lepšie porozumenie technologickému prostrediu.</p> 
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-base overflow-hidden transition-all duration-500 ease-in-out max-h-0 data-[state=open]:max-h-[1000px] opacity-0 data-[state=open]:opacity-100 pb-4 pt-0">
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
            <AccordionTrigger className="text-base text-start hover:underline text-red-500 py-4">
              2. Pochopenie výhod pre obyčajného spotrebiteľa.
            </AccordionTrigger>
            <AccordionContent className="text-base overflow-hidden transition-all duration-500 ease-in-out max-h-0 data-[state=open]:max-h-[1000px] opacity-0 data-[state=open]:opacity-100 pb-4 pt-0">
              LPWAN technológia prináša niekoľko výhod pre bežných
              spotrebiteľov, ako sú dlhá výdrž batérie v zariadeniach, široké
              pokrytie siete, čo umožňuje použitie týchto zariadení aj v
              oblastiach s obmedzeným dosahom signálu, a možnosť efektívneho
              monitorovania a riadenia rôznych aspektov ich každodenného života.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="text-base text-start hover:underline text-red-500 py-4">
              3. Zlepšenie kvality života.
            </AccordionTrigger>
            <AccordionContent className="text-base overflow-hidden transition-all duration-500 ease-in-out max-h-0 data-[state=open]:max-h-[1000px] opacity-0 data-[state=open]:opacity-100 pb-4 pt-0">
              LPWAN technológia umožňuje vytváranie inteligentných riešení,
              ktoré môžu prispieť k zlepšeniu kvality života obyčajných ľudí.
              Medzi príklady patrí sledovanie kvality ovzdušia, inteligentné
              parkovanie, monitorovanie spotreby energie a vody, sledovanie
              zdravia a ďalšie.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger className="text-base text-start hover:underline text-red-500 py-4">
              4. Informovanosť a ochrana súkromia.
            </AccordionTrigger>
            <AccordionContent className="text-base overflow-hidden transition-all duration-1000 ease-in-out max-h-0 data-[state=open]:max-h-[1000px] opacity-0 data-[state=open]:opacity-100 pb-4 pt-0">
              Pochopenie technológie ako LPWAN umožňuje obyčajným spotrebiteľom
              byť informovaní o tom, ako ich dáta sú zbierané, spracované a
              použité. To môže pomôcť pri ochrane ich súkromia a pri rozhodovaní
              o tom, ktoré inteligentné zariadenia a služby používať.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
};

export default LpwanBenefits;
