"use client"

import PhotoAlbum from "react-photo-album";
import NextJsImage from "../../NextJsImage";
import { photos } from "../../../../public/assets/images/sample-gallery";

export function Gallery() {
  return (
    <PhotoAlbum
      layout="rows"
      photos={photos}
      renderPhoto={NextJsImage}
      defaultContainerWidth={1200}
      sizes={{ size: "calc(100vw - 240px)" }}
    />
  );
}
