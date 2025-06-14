"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, QrCode, Share2, Heart, MapPin, Clock, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// QRコード生成用のコンポーネント（実際の実装ではqrcode.jsなどを使用）
function QRCodeDisplay({ url }: { url: string }) {
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="w-48 h-48 bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center">
        <div className="text-center">
          <QrCode className="h-12 w-12 mx-auto mb-2 text-gray-400" />
          <p className="text-sm text-gray-500">QRコード</p>
          <p className="text-xs text-gray-400 mt-1">実装時にqrcode.jsを使用</p>
        </div>
      </div>
      <p className="text-sm text-gray-600 text-center max-w-xs">このQRコードをスキャンして展示ページにアクセス</p>
      <p className="text-xs text-gray-400 break-all max-w-xs text-center">{url}</p>
    </div>
  )
}

export default function ExhibitionDetailPage({ params }: { params: { id: string } }) {
  const [isLiked, setIsLiked] = useState(false)

  // 実際の実装ではmicroCMSからデータを取得
  const exhibition = {
    id: Number.parseInt(params.id),
    title: "デジタルアート展示",
    creator: "アートサークル",
    creatorId: "art-circle",
    image: "/placeholder.svg?height=600&width=800",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    category: "デジタルアート",
    isCurrentlyDisplayed: true,
    description:
      "最新のデジタル技術を使用した革新的なアート作品。AIと人間の創造性の融合を探求し、新しい表現の可能性を追求しています。",
    longDescription: `この展示では、最新のデジタル技術を駆使して制作された革新的なアート作品を紹介します。

人工知能と人間の創造性の融合をテーマに、従来のアートの概念を超えた新しい表現の可能性を探求しています。

作品は全てインタラクティブな要素を含んでおり、来場者の動きや声に反応して変化します。デジタルとアナログ、テクノロジーと感情の境界線を曖昧にし、観る人それぞれに異なる体験を提供します。

制作には最新の機械学習技術、リアルタイム画像処理、音響解析などが使用されており、技術的な側面からも注目に値する作品群となっています。`,
    location: "第1展示室",
    displayPeriod: "2024年6月15日 - 6月30日",
    openingHours: "10:00 - 18:00",
    tags: ["デジタルアート", "AI", "インタラクティブ", "最新技術"],
    likes: 42,
  }

  const currentUrl = typeof window !== "undefined" ? window.location.href : ""

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: exhibition.title,
          text: exhibition.description,
          url: currentUrl,
        })
      } catch (err) {
        console.log("Error sharing:", err)
      }
    } else {
      // フォールバック: クリップボードにコピー
      navigator.clipboard.writeText(currentUrl)
      alert("URLをクリップボードにコピーしました")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Button asChild variant="ghost" size="sm">
              <Link href="/exhibitions">
                <ArrowLeft className="h-4 w-4 mr-2" />
                展示一覧に戻る
              </Link>
            </Button>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsLiked(!isLiked)}
                className={isLiked ? "text-red-500 border-red-500" : ""}
              >
                <Heart className={`h-4 w-4 mr-1 ${isLiked ? "fill-current" : ""}`} />
                {exhibition.likes + (isLiked ? 1 : 0)}
              </Button>
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-1" />
                共有
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <QrCode className="h-4 w-4 mr-1" />
                    QRコード
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>展示ページのQRコード</DialogTitle>
                    <DialogDescription>このQRコードを使って展示ページを簡単に共有できます</DialogDescription>
                  </DialogHeader>
                  <div className="flex justify-center py-4">
                    <QRCodeDisplay url={currentUrl} />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Image */}
            <div className="relative">
              <Image
                src={exhibition.image || "/placeholder.svg"}
                alt={exhibition.title}
                width={800}
                height={600}
                className="w-full h-96 object-cover rounded-lg"
              />
              <div className="absolute top-4 left-4">
                {exhibition.isCurrentlyDisplayed ? (
                  <Badge className="bg-green-500 hover:bg-green-600">展示中</Badge>
                ) : (
                  <Badge variant="secondary">今後展示予定</Badge>
                )}
              </div>
            </div>

            {/* Title and Basic Info */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{exhibition.title}</h1>
              <div className="flex items-center space-x-4 text-gray-600 mb-4">
                <Link href={`/creators/${exhibition.creatorId}`} className="flex items-center hover:text-purple-600">
                  <User className="h-4 w-4 mr-1" />
                  {exhibition.creator}
                </Link>
                <Badge variant="outline">{exhibition.category}</Badge>
              </div>
              <p className="text-lg text-gray-700">{exhibition.description}</p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {exhibition.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  #{tag}
                </Badge>
              ))}
            </div>

            {/* Detailed Description */}
            <Card>
              <CardHeader>
                <CardTitle>作品について</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  {exhibition.longDescription.split("\n\n").map((paragraph, index) => (
                    <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Additional Images */}
            <Card>
              <CardHeader>
                <CardTitle>その他の作品画像</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {exhibition.images.map((image, index) => (
                    <Image
                      key={index}
                      src={image || "/placeholder.svg"}
                      alt={`${exhibition.title} - 画像 ${index + 1}`}
                      width={300}
                      height={200}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Exhibition Info */}
            <Card>
              <CardHeader>
                <CardTitle>展示情報</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="font-medium">展示場所</p>
                    <p className="text-gray-600">{exhibition.location}</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="font-medium">展示期間</p>
                    <p className="text-gray-600">{exhibition.displayPeriod}</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="font-medium">開館時間</p>
                    <p className="text-gray-600">{exhibition.openingHours}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Creator Info */}
            <Card>
              <CardHeader>
                <CardTitle>創作者情報</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <User className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-lg">{exhibition.creator}</h3>
                  <p className="text-gray-600 text-sm mb-4">デジタルアート専攻</p>
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <Link href={`/creators/${exhibition.creatorId}`}>プロフィールを見る</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>アクション</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full">
                      <QrCode className="h-4 w-4 mr-2" />
                      QRコードを表示
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>展示ページのQRコード</DialogTitle>
                      <DialogDescription>このQRコードを使って展示ページを簡単に共有できます</DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-center py-4">
                      <QRCodeDisplay url={currentUrl} />
                    </div>
                  </DialogContent>
                </Dialog>
                <Button variant="outline" className="w-full" onClick={handleShare}>
                  <Share2 className="h-4 w-4 mr-2" />
                  この展示を共有
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
