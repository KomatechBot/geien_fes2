export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="flex flex-col items-center gap-4">
          {/* Spinner */}
          <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
          {/* Loading Text */}
          <p className="text-lg text-black">読み込み中...</p>
        </div>
      </div>
  );
}