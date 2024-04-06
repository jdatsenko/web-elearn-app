export const tests = [
  {
    id: 1,
    topicId: 1,
    questions: [
      {
        label:
          "1. Aký je rozsah dlhého dosahu (LPWAN) v závislosti od technológie?",
        answers: [
          {
            label: "a) Od 100 m do 1 km.",
            isRight: false,
          },
          {
            label: "b) Od 500 m do 5 km.",
            isRight: false,
          },
          {
            label: "c) Od 2 km do 1000 km.",
            isRight: true,
          },
          {
            label: "d) Od 10 km do 100 km.",
            isRight: false,
          },
        ],
      },
      {
        label:
          "2. Aká je maximálna veľkosť prijímaných paketov sietí LPWAN a aká je maximálna rýchlosť uplinku?",
        answers: [
          {
            label:
              "a) Maximálna veľkosť paketov je 50 bajtov pri rýchlosti do 100 Kb/s.",
            isRight: false,
          },
          {
            label:
              "b) Maximálna veľkosť paketov je 1000 bajtov pri rýchlosti do 200 Kb/s.",
            isRight: true,
          },
          {
            label:
              "c) Maximálna veľkosť paketov je 100 bajtov pri rýchlosti do 150 Kb/s.",
            isRight: false,
          },
          {
            label:
              "d) Maximálna veľkosť paketov je 2000 bajtov pri rýchlosti do 300 Kb/s.",
            isRight: false,
          },
        ],
      },
      {
        label:
          "3. Ktoré tvrdenie o štandardoch Narrowband-IoT a LTE-M je správne?",
        answers: [
          {
            label: "a) Sú štandardy projektu IEEE.",
            isRight: false,
          },
          {
            label: "b) Sú štandardy projektu Wi-Fi Alliance.",
            isRight: false,
          },
          {
            label: "c) Sú štandardy projektu Bluetooth SIG.",
            isRight: false,
          },
          {
            label: "d) Sú štandardy projektu 3GPP.",
            isRight: true,
          },
        ],
      },
      {
        label: "4. Ktoré tvrdenie popisuje správne úlohu protokolu LoRaWAN?",
        answers: [
          {
            label:
              "a) LoRaWAN je aplikačný protokol, ktorý riadi prístup k médiu (MAC).",
            isRight: false,
          },
          {
            label:
              "b) LoRaWAN je protokol pre sieťovú vrstvu, ktorý zabezpečuje spoľahlivý prenos dát.",
            isRight: false,
          },
          {
            label:
              "c) LoRaWAN je protokol vrstvy riadenia prístupu k médiu (MAC).",
            isRight: true,
          },
          {
            label:
              "d) LoRaWAN je protokol na aplikačnej úrovni, ktorý definuje formát dátových rámcov.",
            isRight: false,
          },
        ],
      },
      {
        label: "5. Čo NIE je prikladom súčasných aplikácií LPWAN?",
        answers: [
          {
            label: "a) Sledovanie kvality ovzdušia.",
            isRight: false,
          },
          {
            label: "b) Inteligentné meranie spotreby energie.",
            isRight: false,
          },
          {
            label: "c) Inteligentné parkovanie.",
            isRight: false,
          },
          {
            label: "d) Streamovanie videa, hlasová komunikácia.",
            isRight: true,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    topicId: 2,
    questions: [
      {
        label: "1. Ktorá spoločnosť je sponzorským členom LoRa Alliance?",
        answers: [
          {
            label: "a) Amazon Web Services.",
            isRight: false,
          },
          {
            label: "b) Microsoft Azure.",
            isRight: false,
          },
          {
            label: "c) IBM Cloud.",
            isRight: false,
          },
          {
            label: "d) Google Cloud.",
            isRight: true,
          },
        ],
      },
      {
        label:
          "2. Čo zaručuje vysokú odolnosť voči rušeniu u technológie LoRaWAN?",
        answers: [
          {
            label:
              "a) Použitie kryptografických algoritmov pre zabezpečenie dátových prenosov.",
            isRight: false,
          },
          {
            label: "b) Pravidelné aktualizácie softvéru a hardvéru zariadení.",
            isRight: false,
          },
          {
            label:
              "c) Základ technológie vyvinutej pre vojenský a vesmírny priemysel.",
            isRight: true,
          },
          {
            label: "d) Časté monitorovanie a údržba sieťových infraštruktúr.",
            isRight: false,
          },
        ],
      },
      {
        label:
          "3. Akým spôsobom môže byť obmedzená schopnosť výrobcov vyvíjať zariadenia IoT založené na vlastnej čipovej súprave v sieti LoRaWAN?",
        answers: [
          {
            label:
              "a) Potreba získať licenciu na IP od spoločnosti Semtech, ktorá vlastní proprietárnu moduláciu LoRa.",
            isRight: true,
          },
          {
            label:
              "b) Nemožnosť získať potrebné softvérové licencie od výrobcov koncových zariadení.",
            isRight: false,
          },
          {
            label:
              "c) Nutnosť zaplatiť vysoké licenčné poplatky priamo LoRaWAN aliancii.",
            isRight: false,
          },
          {
            label:
              "d) Absencia interoperability medzi rôznymi výrobcami čipovej súpravy pre LoRaWAN.",
            isRight: false,
          },
        ],
      },
      {
        label: "4. Čo NIE je vyhodou LoRaWAN?",
        answers: [
          {
            label: "a) Väčší dosah.",
            isRight: false,
          },
          {
            label: "b) Nízka spotreba energie.",
            isRight: false,
          },
          {
            label: "c) Jednoduchá architektúra.",
            isRight: false,
          },
          {
            label: "d) Vysoká rýchlosť prenosu dát.",
            isRight: true,
          },
        ],
      },
      {
        label: "5. Aká je najdôležitejšia výhoda LoRaWAN?",
        answers: [
          {
            label: "a) Spoľahlivosť.",
            isRight: false,
          },
          {
            label: "b) Nízka spotreba energie.",
            isRight: true,
          },
          {
            label: "c) Nízke náklady na prevádzku.",
            isRight: false,
          },
          {
            label: "d) Rýchle nasadenie.",
            isRight: false,
          },
        ],
      },
    ],
  },
  {
    id: 3,
    topicId: 3,
    questions: [
      {
        label:
          "1. Akú metódu pre komunikáciu medzi koncovými zariadeniami a sieťovými servermi hlavne používajú siete LoRaWAN?",
        answers: [
          {
            label: "a) Metódu CSMA/CA.",
            isRight: false,
          },
          {
            label: "b) Metódu TDMA.",
            isRight: false,
          },
          {
            label: "c) Metódu Aloha.",
            isRight: true,
          },
          {
            label: "d) Metódu CDMA.",
            isRight: false,
          },
        ],
      },
      {
        label: "2. Čo znamená schopnosť NB-IoT umožniť okamžité odpojenie po prijatí potvrdenia údajov?",
        answers: [
          {
            label:
              "a) Absencia potreby ďalšieho downlinku na potvrdenie údajov.",
            isRight: true,
          },
          {
            label:
              "b) Zvýšená latencia spojenia po prijatí potvrdenia údajov.",
            isRight: false,
          },
          {
            label: "c) Nutnosť opätovného pripojenia k sieťovej stanici po prijatí potvrdenia údajov.",
            isRight: false,
          },
          {
            label:
              "d) Znížená spoľahlivosť prenosu dát kvôli nedostatku downlinku.",
            isRight: false,
          },
        ],
      },
      {
        label:
          "3. Akú životnosť môžu dosiahnuť aplikácie v sieti LoRaWAN vďaka úspornej metóde energie koncových zariadení?",
        answers: [
          {
            label: "a) 5 až 7 rokov na bežnú batériu.",
            isRight: false,
          },
          {
            label: "b) 15 až 20 rokov na veľkú batériu.",
            isRight: false,
          },
          {
            label: "c) 2 až 3 roky na nabíjateľnú batériu.",
            isRight: false,
          },
          {
            label: "d) 10 až 15 rokov na veľmi malú batériu.",
            isRight: true,
          },
        ],
      },
      {
        label:
          "4. Aké sú hlavné charakteristiky vnútorných a vonkajších brán v sieti LoRaWAN?",
        answers: [
          {
            label:
              "a) Vnútorné brány sú vhodné pre miesta s veľkým množstvom ľudí, zatiaľ čo vonkajšie brány sú lepšie pre malé kancelárie.",
            isRight: false,
          },
          {
            label:
              "b) Vnútorné brány majú cenovú výhodu a sú vhodné pre vnútorné priestory s viacerými stenami, zatiaľ čo vonkajšie brány poskytujú väčšie pokrytie a sú vhodné pre mestské aj vidiecke oblasti.",
            isRight: true,
          },
          {
            label:
              "c) Vnútorné brány majú externé antény, zatiaľ čo vonkajšie majú interné antény.",
            isRight: false,
          },
          {
            label:
              "d) Vonkajšie brány majú menšiu účinnosť pri zachytávaní správ zo vzdialených snímačov v porovnaní s vnútornými bránami.",
            isRight: false,
          },
        ],
      },
      {
        label:
          "5. Ktoré tvrdenie najlepšie charakterizuje úlohu aplikačného servera v sieti LoRaWAN?",
        answers: [
          {
            label:
              "a) Aplikačný server je zodpovedný za spravovanie brán v sieti a riadenie prístupu koncových zariadení.",
            isRight: false,
          },
          {
            label:
              "b) Aplikačný server spracováva dátové správy z brán a zabezpečuje distribúciu týchto údajov na koncové zariadenia.",
            isRight: true,
          },
          {
            label:
              "c) Aplikačný server slúži na uchovávanie zálohových kópií údajov z koncových zariadení a brán.",
            isRight: false,
          },
          {
            label:
              "d) Aplikačný server je zodpovedný za správu fyzickej infraštruktúry siete, ako sú antény a vysielače.",
            isRight: false,
          },
        ],
      },
    ],
  },

  {
    id: 4,
    topicId: 4,
    questions: [
      {
        label:
          "1. Aká výhoda NB-IoT technológie je spojená s využívaním licencovaného frekvenčného spektra?",
        answers: [
          {
            label: "a) Zaručuje spoľahlivejší prenos dát bez interferencie s inými zariadeniami.",
            isRight: true,
          },
          {
            label: "b) Poskytuje nižšiu spotrebu energie, čo umožňuje dlhšiu životnosť batérií.",
            isRight: false,
          },
          {
            label: "c) Podporuje pokrytie veľkých oblastí bez väčšej náročnosti na energiu.",
            isRight: false,
          },
          {
            label: "d) Zabezpečuje vyššiu rýchlosť prenosu dát aj v husto obývaných oblastiach.",
            isRight: false,
          },
        ],
      },
      {
        label: "2. Aký je dôsledok schopnosti NB-IoT umožniť okamžité odpojenie po prijatí potvrdenia údajov na existenciu okna downlinku?",
        answers: [
          {
            label:
              "a) Okno downlinku je zachované bez zmeny.",
            isRight: false,
          },
          {
            label:
              "b) Okno downlinku je zvýšené.",
            isRight: false,
          },
          {
            label: "c) Potreba okna downlinku je eliminovaná.",
            isRight: true,
          },
          {
            label:
              "d) Okno downlinku je skrátené.",
            isRight: false,
          },
        ],
      },
      {
        label:
          "3. Prečo je NB-IoT v oblasti internetu vecí významnou alternatívou k 5G technológii?",
        answers: [
          {
            label: "a) 5G technológia je náročná na nasadenie aplikácií v porovnaní s NB-IoT.",
            isRight: false,
          },
          {
            label: "b)  NB-IoT ponúka jednoduchšiu infraštruktúru a rýchlejšie prijatie, čo podporuje veľký počet zariadení.",
            isRight: true,
          },
          {
            label: "c) NB-IoT má vyššiu rýchlosť prenosu dát v porovnaní s 5G.",
            isRight: false,
          },
          {
            label: "d) 5G technológia je nekompatibilná s väčšinou zariadení IoT.",
            isRight: false,
          },
        ],
      },
      {
        label:
          "4. Aké sú hlavné charakteristiky silného vnútorného pokrytia NB-IoT?",
        answers: [
          {
            label:
              "a) 10 dB zosilnenie oproti LTE a 50-násobné zvýšenie oblasti pokrytia.",
            isRight: false,
          },
          {
            label:
              "b) 20 dB zosilnenie oproti LTE a 100-násobné zvýšenie oblasti pokrytia.",
            isRight: true,
          },
          {
            label:
              "c) 30 dB zosilnenie oproti LTE a 200-násobné zvýšenie oblasti pokrytia.",
            isRight: false,
          },
          {
            label:
              "d) 50 dB zosilnenie oproti LTE a 500-násobné zvýšenie oblasti pokrytia.",
            isRight: false,
          },
        ],
      },
      {
        label:
          "5. Prečo je NB-IoT vhodný pre širokú škálu aplikácií internetu vecí?",
        answers: [
          {
            label:
              "a) NB-IoT ponúka viacero výhod oproti iným technológiám IoT a je schopný pripojiť veľké množstvo zariadení na veľké vzdialenosti.",
            isRight: true,
          },
          {
            label:
              "b) NB-IoT je jedinou technológiou, ktorá môže pripojiť zariadenia v priemyselných, automobilových, zdravotníckych a maloobchodných aplikáciách.",
            isRight: false,
          },
          {
            label:
              "c) NB-IoT je výlučne určený pre priemyselné aplikácie, ale môže byť využitý aj v automobilovom, zdravotníckom a maloobchodnom sektore.",
            isRight: false,
          },
          {
            label:
              "d) NB-IoT má obmedzené využitie a nie je vhodný pre aplikácie mimo priemyselného sektora.",
            isRight: false,
          },
        ],
      },
    ],
  },
  {
    id: 5,
    topicId: 5,
    questions: [
      {
        label:
          "1. Aké údaje merajú smart meters?",
        answers: [
          {
            label: "a) Smart meters sú zariadenia, ktoré merajú len spotrebu vody pri vodomeroch.",
            isRight: false,
          },
          {
            label: "b) Smart meters sú zariadenia, ktoré merajú len spotrebu elektriny.",
            isRight: false,
          },
          {
            label: "c) Smart meters sú zariadenia, ktoré merajú údaje o spotrebe vody pri vodomeroch alebo o úrovni napätia, prúdu a účinnosti pri elektromeroch.",
            isRight: true,
          },
          {
            label: "d) Smart meters sú zariadenia, ktoré merajú len úroveň napätia, prúdu a účinnosti pri elektromeroch.",
            isRight: false,
          },
        ],
      },
      {
        label: "2. Aký je jeden z prísľubov inteligentných meračov v súvislosti s meraním a fakturáciou??",
        answers: [
          {
            label:
              "a) Meranie len spotreby energie bez možnosti dynamického nastavenia cien.",
            isRight: false,
          },
          {
            label: 
              "b) Fakturácia na základe odhadu spotreby, čo vedie k presnejším účtom.",
            isRight: false,
          },
          {
            label:
              "c) Meranie len spotreby v priebehu špičkových hodín, čo umožňuje efektívnejšiu fakturáciu.",
            isRight: false,
          },
          {
            label:
              "d) Presnejšie meranie a fakturácia, často aj v kombinácii s dynamickou cenotvorbou.",
            isRight: true,
          },
        ],
      },
      {
        label:
          "3. Čo predstavuje koncept Smart cities?",
        answers: [
          {
            label: "a) Koncept Smart cities je zameraný výlučne na využitie moderných technológií v mestskom prostredí.",
            isRight: false,
          },
          {
            label: "b) Koncept Smart cities predstavuje komplexný prístup k fungovaniu mestského regiónu, zahŕňajúci rôzne spoločenské oblasti ako kultúra, infraštruktúra, životné prostredie, energetika, sociálne služby a ďalšie.",
            isRight: true,
          },
          {
            label: "c) Koncept Smart cities sa venuje len zlepšovaniu dopravy a mobility v mestách.",
            isRight: false,
          },
          {
            label: "d) Koncept Smart cities sa týka len ekologickej udržateľnosti a obnoviteľných zdrojov energie v mestskom prostredí.",
            isRight: false,
          },
        ],
      },
      {
        label:
          "4. Čo je možné centrálne ovládať pomocou Smart Building technológií?",
        answers: [
          {
            label:
              "a) Nákupné košíky v obchodoch.",
            isRight: false,
          },
          {
            label:
              "b) Počítačové systémy v kanceláriách.",
            isRight: false,
          },
          {
            label:
              "c) Dvere, výťahy, žalúzie, vetranie alebo osvetlenie - v závislosti od počtu osôb na mieste.",
            isRight: true,
          },
          {
            label:
              "d) Televízory v obývačkách domácností.",
            isRight: false,
          },
        ],
      },
      {
        label:
          "5. Ktorá z týchto možností je pravdivá o Smart Building?",
        answers: [
          {
            label:
              "a) Umožňuje preventívnu údržbu prostredníctvom analýzy údajov v reálnom čase a histórii, čím znižuje riziko potenciálnych porúch.",
            isRight: true,
          },
          {
            label:
              "b) Poskytuje len základné údaje o stavbe zariadení.",
            isRight: false,
          },
          {
            label:
              "c) Neumožňuje analýzu údajov v reálnom čase a histórii, čo obmedzuje možnosti prevencie porúch.",
            isRight: false,
          },
          {
            label:
              "d) Umožňuje len manuálnu údržbu bez využitia dát.",
            isRight: false,
          },
        ],
      },
    ],
  },
  {
    id: 6,
    topicId: 6,
    questions: [
      {
        label: "1. Aké tvrdenie je pravdivé o výbere správnej technológie IoT?",
        answers: [
          {
            label:
              "a) Rozdiely medzi technológiami NB-IoT, LoRa a Sigfox majú minimálny vplyv na efektívnosť a účinnosť riešenia IoT.",
            isRight: false,
          },
          {
            label: 
              "b) Technológia IoT nemá vplyv na efektívnosť a účinnosť riešenia IoT.",
            isRight: false,
          },
          {
            label:
              "c) Výber správnej technológie IoT je nezmyselný, pretože všetky technológie sú rovnako vhodné pre každý prípad použitia.",
            isRight: false,
          },
          {
            label:
              "d) Rozdiely medzi technológiami NB-IoT, LoRa a Sigfox môžu výrazne ovplyvniť efektívnosť a účinnosť vášho riešenia IoT.",
            isRight: true,
          },
        ],
      },
      {
        label:
          "2. Ktorá technológia podporuje vyššie prenosové rýchlosti a nižšiu latenciu v porovnaní s ostatnými?",
        answers: [
          {
            label: "a) LoRaWAN",
            isRight: false,
          },
          {
            label: "b) NB-IoT.",
            isRight: true,
          },
          {
            label: "c) 5G.",
            isRight: false,
          },
          {
            label: "d) Sigfox.",
            isRight: false,
          },
        ],
      },
      {
        label:
          "3. Ktorá technológia má zvyčajne najnižšie náklady na infraštruktúru a zariadenia?",
        answers: [
          {
            label: "a) NB-IoT.",
            isRight: false,
          },
          {
            label: "b) LoRaWAN.",
            isRight: false,
          },
          {
            label: "c) Sigfox",
            isRight: true,
          },
          {
            label: "d) LTE-M.",
            isRight: false,
          },
        ],
      },
      {
        label:
          "4. Ktorá z nasledujúcich technológií poskytuje najlepšie zabezpečenie?",
        answers: [
          {
            label:
              "a) NB-IoT.",
            isRight: true,
          },
          {
            label:
              "b) LoRaWAN.",
            isRight: false,
          },
          {
            label:
              "c) Sigfox.",
            isRight: false,
          },
          {
            label:
              "d) Wi-Fi HaLow.",
            isRight: false,
          },
        ],
      },
      {
        label:
          "5. Ktorá technológia je ideálna pre monitorovanie poľnohospodárstva a životného prostredia?",
          answers: [
            {
              label: "a) NB-IoT.",
              isRight: false,
            },
            {
              label: "b) LoRaWAN.",
              isRight: true,
            },
            {
              label: "c) Sigfox",
              isRight: false,
            },
            {
              label: "d) LTE-M.",
              isRight: false,
            },
          ],
      },
    ],
  },
];
