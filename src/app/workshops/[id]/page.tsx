"use client"

import { useState, useEffect, use } from "react"
import Link from "next/link"
import { ArrowLeft, Share2, QrCode, Calendar, Clock, MapPin, Copy } from "lucide-react"
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

import type { Workshop } from "@/types/workshop"

export default function WorkshopDetailPage(props: { params: Promise<{ id: string }> }) {
  const { id } = use(props.params)
  const [workshop, setWorkshop] = useState<Workshop | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/workshops/${id}`)
      const data = await res.json()
      setWorkshop(data || null)
    }
    fetchData()
  }, [id])

  if (!workshop) return <p>読み込み中...</p>

  const currentUrl = typeof window !== "undefined" ? window.location.href : ""

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: workshop.title,
        text: workshop.description,
        url: currentUrl,
      })
    } else {
      await navigator.clipboard.writeText(currentUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  // 開催日を Date オブジェクトに変換して開催中か判定
  const today = new Date()
  const eventDate = new Date(workshop.date)
  const isUpcoming = eventDate >= new Date(today.getFullYear(), today.getMonth(), today.getDate())

  return (
    <div className="min-h-screen  bg-neutral-50">
      {/* Header */}
      <header className="bg-black shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Button asChild variant="default" size="sm">
              <Link href="/workshops">
                <ArrowLeft className="h-4 w-4 mr-2" />
                ワークショップ一覧に戻る
              </Link>
            </Button>
            <div className="flex items-center space-x-2">
              <Button onClick={handleShare} variant="outline" className="flex gap-2 items-center">
                {copied ? <Copy className="w-4 h-4 text-green-500" /> : <Share2 className="w-4 h-4" />}
                {copied ? "コピー完了" : "共有"}
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="default" size="sm">
                    <QrCode className="h-4 w-4 mr-1" />
                    QRコード
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>ワークショップページのQRコード</DialogTitle>
                    <DialogDescription>
                      このQRコードを使ってワークショップページを簡単に共有できます
                    </DialogDescription>
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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Workshop Info */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{workshop.title}</h1>
              <div className="flex items-center space-x-4 text-gray-600 mb-4">
                <Badge className={isUpcoming ? "bg-green-500 hover:bg-green-600" : "bg-gray-400"}>
                  {isUpcoming ? "開催予定" : "終了"}
                </Badge>
                <Badge variant={workshop.difficulty === "初心者向け" ? "default" : "secondary"}>
                  {workshop.difficulty}
                </Badge>
              </div>
              <p className="text-lg text-gray-700">{workshop.description}</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>詳細情報</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span>{new Date(workshop.date).toLocaleDateString("ja-JP")}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span>
                    {workshop.time}（{workshop.duration}分）
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span>{workshop.location}</span>
                </div>
                <Separator />
                <div>
                  <span className="font-medium">講師(団体):</span> {workshop.instructor}
                </div>
                <div>
                  <span className="font-medium">参加者の持ち物:</span> {workshop.materials || "特になし"}
                </div>
                <div>
                  <span className="font-medium">団体側が準備してくれる物:</span> {workshop.requirements || "特になし"}
                </div>
                <div>
                  <span className="font-medium">SNSアカウント:</span> {workshop.snsUrl || "特になし"}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* RightSide */}
          <div className="space-y-6">
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
                        <DialogTitle>ワークショップページのQRコード</DialogTitle>
                        <DialogDescription>
                            このQRコードを使ってワークショップページを簡単に共有できます
                        </DialogDescription>
                        </DialogHeader>
                        <div className="flex justify-center py-4">
                            <QRCodeDisplay url={currentUrl} />
                        </div>
                    </DialogContent>
                    </Dialog>
                    <Button variant="outline" className="w-full" onClick={handleShare}>
                    <Share2 className="h-4 w-4 mr-2" />
                        このワークショップを共有
                    </Button>
                    <LikeButton contentId={workshop.id} endpoint="workshops" initialLikes={workshop.likes} />
                </CardContent>
            </Card>
            <CommentBox contentId={workshop.id} endpoint="workshops" />
          </div>
        </div>
      </div>
    </div>
  )
}
