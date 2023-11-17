'use client'

import { CatalogCard } from "@/components/Guest/CatalogCard";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchPackages } from "@/queries/fetchPackages";

type Package = {
  id: number;
  name: string;
  description: string;
  type: string;
  location: string;
};

export default function Home() {
  const [packages, setPackages] = useState<Package[]>([]);
  const { data: packagesData, isLoading: packagesLoading } = useQuery({
    queryKey: ["packages"],
    queryFn: fetchPackages,
  });

  useEffect(() => {
    if (!packagesLoading && packagesData) {
      console.log(packagesData);
      setPackages(
        packagesData.map((pd: any) => ({
          id: pd.id,
          name: pd.name,
          description: pd.description,
          type: pd.type,
          location: pd.location,
        }))
      );
    }
  }, [packagesLoading, packagesData]);

  return (
    <>
      <CatalogCard packages={packages} />
    </>
  );
}
