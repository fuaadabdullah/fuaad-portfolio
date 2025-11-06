import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div tw="w-full h-full flex items-center justify-center text-white font-bold text-[100px] bg-[#4d7c0f]">
        F
      </div>
    ),
    {
      ...size,
    }
  );
}
