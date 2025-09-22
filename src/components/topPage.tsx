"use client"

export default function TopPage() {
  return (
    <>
      <div className="relative w-full h-screen overflow-hidden">
        {/* 背景動画 */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/Geien2_poster.mp4" type="video/mp4" />
        </video>

        {/* オーバーレイ */}
        <div className="absolute inset-0 bg-black/5 z-10" />


      </div>
    </>
  );
}
