import React from 'react'
import { Catalog } from "@/components/Guest/Catalog";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchPackages } from "@/queries/fetchPackages";
import { CatalogPackage } from "@/types/package";
import NavbarGuest from "@/components/Guest/NavbarGuest";
import { CatalogCardSuspense } from "@/components/Guest/CatalogCardSuspense";
import Hero from "@/components/Guest/Landing/Hero";
import PhotoAlbum from "react-photo-album";
import NextJsImage from "@/components/NextJsImage";
import { photo } from "../../../../public/assets/images/sample-gallery";
import {
  Button, 
  Link, 
  Spacer, 
} from "@nextui-org/react"

function About() {
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
            photos: pd.photos
          }))
        );
      }
    }, [packagesLoading, packagesData]);
  return (
          <div aria-label="About Us" className="w-auto min-h-fit flex flex-col text-white">
            {/* About */}
            <div className="flex flex-col bg-primary font-poppins pb-20">
              <div className="flex justify-center w-full self-center my-10 xl:my-20">
                <div className="font-playfair text-5xl lg:text-5xl xl:text-7xl w-full max-w-9xl 2xl:mx-0 mx-6">Virgorus Organizes Everything</div>
              </div>              
              <div className="flex flex-row">
                <div className="w-1/2 flex flex-col justify-between ml-10 2xl:ml-48">
                  <p className="text-xl lg:text-2xl xl:text-3xl font-extralight">
                    Our tours go beyond exploration—they are meticulously organized adventures that seamlessly blend excitement, comfort, and cultural richness, ensuring that every moment becomes a cherished memory. 
                  </p>
                  <div>
                    <Button
                      color='secondary'
                      className='font-base font-poppins text-md md:text-lg lg:text-xl px-6 py-10 rounded-md text-primary justify-self-end'
                    >
                      See Destinations
                    </Button>
                  </div>
                </div>
                <div className="w-1/2 relative">
                  <div className="clip-path-div">
                    <PhotoAlbum
                      layout="rows"
                      photos={photo}
                      renderPhoto={NextJsImage}
                      defaultContainerWidth={700}
                      sizes={{ size: "calc(100vw - 240px)" }}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Packages */}
            <div className="w-auto half-bg-primary mb-10 flex flex-col">
              <div className="flex justify-center w-full self-center">
                <div className="font-playfair text-5xl lg:text-5xl xl:text-7xl w-full max-w-9xl flex justify-between items-center 2xl:mx-0 mx-6">
                  Explore Popular Packages
                  <Button
                    color='secondary'
                    className='font-base font-poppins text-md md:text-lg lg:text-xl px-6 py-10 rounded-md text-primary'
                  >
                    Browse Packages
                  </Button>             
                </div>

              </div>
              <div className="w-full flex flex-col">
                {!packagesLoading ? (
                  <div className="flex flex-wrap h-fit max-w-7xl w-full gap-3 my-10 self-center">
                    <Catalog packages={packages} />
                  </div>
                ) : (
                  <div className="flex flex-wrap h-fit max-w-7xl w-full gap-3 my-10 self-center">
                    <CatalogCardSuspense />
                    <CatalogCardSuspense />
                  </div>
                )}
              </div>
            </div>
          </div>
  )
}

export default About