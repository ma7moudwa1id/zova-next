"use client";
import { useRef } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/image-gallery.css";
import type { GalleryItem, ImageGalleryRef } from "react-image-gallery";

export default function ProductGallery({
  imageCover,
  productImages,
}: {
  imageCover: string | undefined;
  productImages: string[] | undefined;
}) {
  const images: GalleryItem[] = [
    ...(imageCover
      ? [
          {
            original: imageCover,
            thumbnail: imageCover,
          },
        ]
      : []),

    ...(productImages?.map((image) => ({
      original: image,
      thumbnail: image,
    })) ?? []),
  ];

  const galleryRef = useRef<ImageGalleryRef>(null);

  return (
    <div className="border-2 border-gray-200 p-4 rounded-xl">
      <ImageGallery
        ref={galleryRef}
        items={images}
        showPlayButton={false}
        showNav={false}
        showFullscreenButton={false}
      />
    </div>
  );
}
