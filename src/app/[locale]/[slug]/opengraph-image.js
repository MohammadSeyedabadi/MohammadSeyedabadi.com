import { ImageResponse } from "next/og";

export async function generateStaticParams() {
  const locales = ['en', 'fa'];
  return locales.map((locale) => ({ locale }));
}

// Route segment config
// export const runtime = "edge";

// Image metadata
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image() {
  // Font
  // const Vazirmatn = fetch(
  //   new URL("/public/fonts/fonts/ttf/Vazirmatn-Black.ttf", import.meta.url)
  // ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      //ImageResponse JSX element
      <div
        style={{
          fontSize: 64,
          background: "#618be1",
          color: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        Mohammad Seyedabadi
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
      // fonts: [
      //   {
      //     name: "Vazirmatn",
      //     data: await Vazirmatn,
      //     style: "normal",
      //     weight: 400,
      //   },
      // ],
    }
  );
}
