"use client";

import { Catalog } from "@/components/Guest/Catalog";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchPackages } from "@/queries/fetchPackages";
import { CatalogPackage } from "@/types/package";
import NavbarGuest from "@/components/Guest/NavbarGuest";
import SitemapFooter from "@/components/Footer";
import { CatalogCardSuspense } from "@/components/Guest/CatalogCardSuspense";

export default function Home() {
  const [packages, setPackages] = useState<CatalogPackage[]>([]);
  const { data: packagesData, isLoading: packagesLoading } = useQuery({
    queryKey: ["packages"],
    queryFn: fetchPackages,
  });

  useEffect(() => {
    if (!packagesLoading && packagesData) {
      setPackages(
        packagesData.map((pd: any) => ({
          id: pd.id,
          name: pd.name,
          description: pd.description,
          type: pd.type,
          rate: pd.rates[0].ratePerPax,
        }))
      );
    }
  }, [packagesLoading, packagesData]);

  return (
    <>
      <main className="flex flex-col items-center justify-between bg-white min-h-screen">
        <div className="flex flex-col w-full fixed z-30">
          <NavbarGuest />
        </div>
        <section className="flex flex-col w-full h-full items-center">
          {!packagesLoading ? (
            <div className="flex flex-wrap h-fit max-w-7xl pt-24 gap-3 my-10">
              <Catalog packages={packages} />
            </div>
          ) : (
            <div className="flex flex-wrap h-fit w-full max-w-7xl pt-24 gap-3 my-10">
              <CatalogCardSuspense />
              <CatalogCardSuspense />
            </div>
          )}
        </section>
        <SitemapFooter />
      </main>
    </>
  );
}
