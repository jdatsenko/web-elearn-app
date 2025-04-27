"use client";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="flex flex-col md:flex-row items-center w-full px-12 rounded-lg shadow-xl mb-5 pb-8 sm:pb-[40px]">
        <div className="w-full md:w-2/5">
          <p className="text-sm text-gray-700 dark:text-[#696969]">
            Informácie o ochrane osobných údajov a zásadách nájdete{" "}
            <Link
              href={"/policy"}
              className="text-blue-400 underline hover:text-blue-600 transition-colors"
            >
              tu.
            </Link>
          </p>
          <p className="mt-2 text-sm text-gray-700 dark:text-[#696969]">
            Ak nájdete akékoľvek chyby, neváhajte mi napísať na email:{" "}
            <Link
              href="mailto:yu.datsenko@gmail.com"
              className="text-blue-400 underline hover:text-blue-600 transition-colors"
            >
              yu.datsenko@gmail.com
            </Link>
            .
          </p>
        </div>

        <div className="w-full md:w-1/2 mt-8 md:text-justify md:ml-8">
          <p className="text-base dark:text-gray-400">
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
        </div>
      </footer>
    )
}

export default Footer;