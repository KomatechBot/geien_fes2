"use client"

import { motion } from "framer-motion"
import Image from "next/image"


const UmbrellaColumn = ({ isLeft }: { isLeft: boolean }) => {
  const umbrellas = [0, 1, 2];

  return (
    <div
      className={`absolute top-1/2 transform -translate-y-1/2 z-5 flex flex-col gap-1 ${
        isLeft ? "left-4" : "right-4"
      }`}
    >
      {umbrellas.map((id) => (
        <motion.div
          key={id}
          animate={{ rotate: isLeft ? 360 : -360 }}
          transition={{
            repeat: Infinity,
            duration: 10 + id, // それぞれ少し違う速さ
            ease: "linear",
          }}
        >
          <Image
            src="/umbrella.png"
            alt={`傘${isLeft ? "左" : "右"}-${id}`}
            width={249}
            height={250}
            className="rotate-180"
          />
        </motion.div>
      ))}
    </div>
  );
};

export default function TopPage() {
  return (
    <>
      {/* 左右の傘 */}
      <div className="hidden xl:flex">
        <UmbrellaColumn isLeft={true} />
        <UmbrellaColumn isLeft={false} />
      </div>

      {/* 背景画像 */}
      <Image
        src="/Geien2_poster.png"
        alt="藝苑祭の写真"
        height={1000}
        width={800}
        className="flex object-cover z-0"
        priority
      />

      {/* オーバーレイ */}
      <div className="absolute inset-0 bg-black/5 z-10" />

      
    </>
  );
}
