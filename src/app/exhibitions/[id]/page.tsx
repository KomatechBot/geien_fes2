"use client"

import { useState, useEffect, use } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Share2, QrCode, MapPin, Clock, User, Copy } from "lucide-react"
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
import QRCodeDisplay from "@/components/qrcodeDisplay"
import { LikeButton } from "@/components/likebutton"
import { CommentBox } from "@/components/comments_box"

import type { Exhibition } from "@/types/exhibition"
import type { Creator } from "@/types/creators"




export default function ExhibitionDetailPage(props: {params: Promise<{ id: string}>}) {
  const { id } = use(props.params)
  const [exhibition, setExhibition] = useState<Exhibition | null>(null)
  const [creators, setCreators] = useState<Creator[]>([])
  const [copied, setCopied] = useState(false)


  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/exhibitions/${id}`);
      const data = await res.json();
      setExhibition(data || null)
    }
  fetchData();
  }, [id])

  //プロフィールのCMS上の名前と照合するためだけのuseEffect
  useEffect(() => {
    const fetchCreators = async () => {
  
      const res = await fetch("/api/creators");
      const data = await res.json();
      setCreators(data)
    }
  fetchCreators();
  }, [])

  
  if (!exhibition) return <p>読み込み中...</p>;

  //creatorsのスキーマとexhibitionsのスキーマの名前が一致するか検証している
  const matchedCreator = creators.find(
    (creator) => creator.name === exhibition.creator
  ); 

  const creatorPageLink = matchedCreator
    ? `/creators/${matchedCreator.id}`
    : "#";
  
  
  const currentUrl = typeof window !== "undefined" ? window.location.href : ""
  const handleShare = async () => {
    if (navigator.share) {
      
      await navigator.share({
        title: exhibition.title,
        text: exhibition.description,
        url: currentUrl,
      })
      
    } else {
      // フォールバック: クリップボードにコピー
      await navigator.clipboard.writeText(currentUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
     
  }
}

  return (
    <div className="min-h-screen bg-yellow-50">
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
              <Button onClick={handleShare} variant="outline" className="flex gap-2 items-center">
                {copied ? <Copy className="w-4 h-4 text-green-500" /> : <Share2 className="w-4 h-4" />}
                {copied ? "コピー完了" : "共有"}
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
                src={exhibition.image?.url ?? "/placeholder.svg"}
                alt={exhibition.title}
                width={1600}
                height={1200}
                className="w-full h-96 object-contain rounded-lg"
              />
              <div className="absolute -left-2">
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
                <Link href={`/creators/${exhibition.creatorGroup}`} className="flex items-center hover:text-white">
                  <User className="h-4 w-4 mr-1" />
                  {exhibition.creator}
                </Link>
                <Badge variant="outline">{exhibition.category}</Badge>
              </div>
              <p className="text-lg text-gray-700">{exhibition.description}</p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {typeof exhibition?.tags === 'string' &&
                exhibition.tags.split('　').map((tag) => (
                  <Badge key={tag} variant="secondary">
                    #{tag}
                  </Badge>
                ))}
              
              {Array.isArray(exhibition?.tags) && exhibition.tags.map((tag) => (
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
                  {exhibition.longDescription ? (
                    exhibition.longDescription.split("\n\n").map((paragraph, index) => (
                      <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                        {paragraph}
                      </p>
                    ))) : (
                      <p className="text-gray-400">説明がまだ登録されていません。</p>
                    )}
                </div>
              </CardContent>
            </Card>

            {/* Additional Images */}
            <Card>
              <CardHeader>
                <CardTitle>その他の作品画像</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {exhibition.images && exhibition.images.length > 0 ? (
                    exhibition.images.map((image, index) => (
                      <div key={index} className="relative h-auto overflow-hidden ">
                        <Image
                          key={index}
                          src={image.url}
                          alt={`${exhibition.title} - 画像 ${index + 1}`}
                          width={1600} // 実際の画像サイズに合わせる
                          height={1200}
                          className="w-full h-full object-contain rounded-lg"
                        />
                      </div>
                    ))
                  ) : (
                    <div className="relative w-full overflow-hidden rounded-lg">
                      <Image
                        src="/placeholder.svg"
                        alt="No image"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
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
                <CardTitle>制作者情報</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
                    <User className="h-8 w-8 text-gray-600" />
                  </div>
                  <h3 className="font-semibold text-lg">{exhibition.creator}</h3>
                  <p className="text-gray-600 text-sm mb-4">{exhibition.creatorGroup}</p>
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <Link href={creatorPageLink}>プロフィールを見る</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardContent className="space-y-3">
                <p className="text-sm text-gray-800">再いいねは１時間後にできます</p> 
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
                <LikeButton contentId={exhibition.id} endpoint="exhibitions" initialLikes={exhibition.likes} />
              </CardContent>
            </Card>
            <CommentBox contentId={exhibition.id} endpoint="exhibitions"/>
          </div>
        </div>
      </div>
    </div>
  )
}
