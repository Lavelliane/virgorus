"use client";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@nextui-org/react";
import { CatalogPackage } from "@/types/package";
import fallbackImage from "../../../public/fallbackImage.jpg";
import Image from "next/image";
import Link from "next/link";

export const CatalogCard = ({ catPackage }: { catPackage: CatalogPackage }) => {
  console.log(catPackage);
  return (
    <>
      <Card className="w-full">
        <CardHeader className="flex flex-col items-start gap-2">
          <span className="font-bold text-gray-400 uppercase">
            {catPackage.type}
          </span>
          <span className="font-bold text-2xl">{catPackage.name}</span>
          <span className="text-lg">{catPackage.description}</span>
        </CardHeader>
        <CardBody className="w-full h-80 relative my-2">
          <Image
            src={fallbackImage}
            alt="Picture of the tour"
            fill={true}
          />
        </CardBody>
        <CardFooter className="flex justify-between gap-2 my-2">
          <div className="flex flex-col">
            <span className="text-md">Starts at</span>
            <div className="flex gap-1">
              <span className="text-md text-olive">₱ {catPackage.rate}.00</span>
              <span className="text-md"> / person</span>
            </div>
          </div>
          <Link href={`/tours/${catPackage.id}`}>
            <Button radius="full" className="bg-chocolate text-white">
              Book Now
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </>
  );
};
