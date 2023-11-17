"use client";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@nextui-org/react";
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

export const CatalogCard = (package: Package) => {
  return (
    <>
      <Card>
        <CardHeader>{package.type}</CardHeader>
        <CardBody>Hi</CardBody>
        <CardFooter></CardFooter>
      </Card>
    </>
  );
};
