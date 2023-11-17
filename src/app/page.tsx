"use client";

import { Catalog } from "@/components/Guest/Catalog";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchPackages } from "@/queries/fetchPackages";
import { CatalogPackage } from "@/types/package";
import NavbarGuest from "@/components/Guest/NavbarGuest";
import { ContactBar } from "@/components/Guest/ContactBar";
import SitemapFooter from "@/components/Footer";
import { CatalogCardSuspense } from "@/components/Guest/CatalogCardSuspense";

export default function Home() {
  const [packages, setPackages] = useState<CatalogPackage[]>([]);
  const { data: packagesData, isLoading: packagesLoading } = useQuery({
    queryKey: ["packages"],
    queryFn: fetchPackages,
  });

  useEffect(() => {
    // FOR DUMMY DATA PURPOSES ONLY
    const multiplyData = (
      data: CatalogPackage[],
      multiplier: number
    ): CatalogPackage[] => {
      return data.flatMap((pd, index) => {
        return Array.from({ length: multiplier }, (_, innerIndex) => ({
          id: pd.id + innerIndex,
          name: pd.name,
          description: pd.description,
          type: pd.type,
          rate: pd.rates[0].ratePerPax,
        }));
      });
    };

    if (!packagesLoading && packagesData) {
      // setPackages(
      //   packagesData.map((pd: any) => ({
      //     id: pd.id,
      //     name: pd.name,
      //     description: pd.description,
      //     type: pd.type,
      //     rate: pd.rates[0].ratePerPax,
      //   }))
      // );

      const multipliedPackages: CatalogPackage[] = multiplyData(
        packagesData,
        4
      ); // Change the multiplier as needed FOR DUMMY DATA
      setPackages(multipliedPackages);
    }
  }, [packagesLoading, packagesData]);

  return (
    <>
      <main className="flex flex-col items-center justify-between bg-white h-screen">
        <section className="flex flex-col w-full h-full items-center">
          <div className="flex flex-col w-full fixed z-30">
            <NavbarGuest />
            <ContactBar />
          </div>
          {!packagesLoading ? (
            <div className="grid grid-cols-3 gap-3 mt-36 mb-10">
              <Catalog packages={packages} />
            </div>
          ) : (
            <div className="flex h-full w-full gap-3 my-10">
              <CatalogCardSuspense />
            </div>
          )}
          <SitemapFooter />
        </section>
      </main>
    </>
  );
}
