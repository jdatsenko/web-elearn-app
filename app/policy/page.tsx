"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";

const PodmienkyOchranyOsobnychUdajov = () => {
  const router = useRouter();
  return (
    <div className="mx-5 md:mx-40 p-4">
      <h1 className="text-3xl font-bold text-center mb-6">
        Ochrana osobných údajov
      </h1>

      <h2 className="text-2xl mb-2 font-semibold">Účel spracovania údajov</h2>
      <p className="mb-2">
        Osobné údaje sú spracovávané výhradne na účely registrácie a
        poskytovania prístupu k e-learningovej aplikácii. Údaje sú chránené a
        nebudú poskytnuté tretím stranám.
      </p>

      <br />
      <h2 className="text-2xl mb-2 font-semibold">Bezpečnosť vašich údajov</h2>
      <p className="mb-2">
        Ochrana osobných údajov je zabezpečená pomocou šifrovania a ďalších
        bezpečnostných opatrení.
      </p>

      <br />
      <h2 className="text-2xl mb-2 font-semibold">Práva používateľov</h2>
      <p className="mb-2">
        Používatelia majú právo na prístup k svojim osobným údajom a ich opravu
        alebo vymazanie. Pre viac informácií kontaktujte správcu aplikácie.
      </p>

      <br />
      <footer>
        <p>
          Ak máte akékoľvek otázky o ochrane vašich osobných údajov, kontaktujte
          správcu aplikácie na e-mailovej adrese:{" "}
          <Link
            href="mailto:yu.datsenko@gmail.com"
            className="text-blue-400 underline hover:text-blue-600 transition-colors"
          >
            yu.datsenko@gmail.com
          </Link>
          .
        </p>
      </footer>
      <div className="flex justify-center mt-4 mb-7">
        <Button
          onClick={() => router.push("/")}
          variant="secondary"
        >
          Späť
        </Button>
      </div>
    </div>
  );
};

export default PodmienkyOchranyOsobnychUdajov;
