import { CatalogPackage } from "@/types/package";
import { CatalogCard } from "@/components/Guest/CatalogCard";

export const Catalog = ({ packages }: { packages: CatalogPackage[] }) => {
  return (
    <>
      {packages.map((catPackage) => (
        <CatalogCard key={catPackage.id} catPackage={catPackage} />
      ))}
    </>
  );
};
