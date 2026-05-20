"use client";

import Head from "next/head";
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

const defaultSeo = {
  title: "Renan Tattoo | Estúdio Premium em São José dos Campos",
  description: "Experiência de tatuagem exclusiva. Arte na pele, luxo underground e estética dark premium por Renan Tattoo.",
  keywords: "tattoo, tatuagem, renan tattoo, são josé dos campos",
};

export default function SeoMetadata() {
  const [seo, setSeo] = useState(defaultSeo);

  useEffect(() => {
    const docRef = doc(db, "content", "seo");
    const unsubscribe = onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const fetchedData = docSnap.data();
          setSeo((prev) => ({
            title: fetchedData.title || prev.title,
            description: fetchedData.description || prev.description,
            keywords: fetchedData.keywords || prev.keywords,
          }));
        }
      },
      (error) => {
        console.error("Error listening seo:", error);
      }
    );

    return unsubscribe;
  }, []);

  return (
    <Head>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={seo.keywords} />
    </Head>
  );
}
