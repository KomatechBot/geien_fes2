"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "./ui/button"
import Link from "next/link"

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
            width={300}
            height={300}
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
      <UmbrellaColumn isLeft={true} />
      <UmbrellaColumn isLeft={false} />

      {/* 背景画像 */}
      <Image
        src="/Geien_fes_picture.png"
        alt="藝苑祭の写真"
        height={1000}
        width={800}
        className="flex object-cover z-0"
        priority
      />

      {/* オーバーレイ */}
      <div className="absolute inset-0 bg-black/5 z-10" />

      {/* コンテンツ */}
      <div className="absolute z-15 flex flex-col items-center justify-center h-full text-center text-white px-4 mt-178">
        <div className="flex flex-col sm:flex-row gap-16 mt-8">
          <Button
            asChild
            size="lg"
            className="bg-red-700 hover:bg-red-800 transform transition-transform duration-300 hover:-translate-y-1"
          >
            <Link href="/exhibitions">展示を見る</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="bg-red-700 hover:bg-red-800 border-red-700 hover:border-red-800 hover:text-white transform transition-transform duration-300 hover:-translate-y-1"
          >
            <Link href="/workshops">イベントを見る</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
