"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, MapPin, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function WorkshopsPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 5, 15)) // 2024年6月15日

  const workshops = [
    {
      id: 1,
      title: "陶芸体験ワークショップ",
      instructor: "工芸ゼミ",
      date: "2024-06-15",
      time: "10:00-12:00",
      duration: 120,
      location: "工芸室A",
      difficulty: "初心者向け",
      description: "粘土を使って基本的な陶芸技法を学び、オリジナルの器を制作します。",
      materials: "粘土、釉薬、道具一式（すべて提供）",
      requirements: "汚れても良い服装でお越しください",
    },
    {
      id: 2,
      title: "デジタルアート制作講座",
      instructor: "アートサークル",
      date: "2024-06-16",
      time: "14:00-17:00",
      duration: 180,
      location: "PC室B",
      difficulty: "中級者向け",
      description: "Photoshopを使用したデジタルアート制作の基本から応用まで学びます。",
      materials: "PC、ソフトウェア（提供）",
      requirements: "基本的なPC操作ができる方",
    },
    {
      id: 3,
      title: "写真撮影テクニック講座",
      instructor: "写真部",
      date: "2024-06-17",
      time: "09:00-12:00",
      duration: 180,
      location: "屋外（集合：正門）",
      difficulty: "初心者向け",
      description: "カメラの基本操作から構図の取り方まで、実践的な撮影技術を学びます。",
      materials: "カメラ（デジタル一眼推奨、貸出可）",
      requirements: "歩きやすい服装と靴",
    },
    {
      id: 4,
      title: "木工クラフト体験",
      instructor: "木工サークル",
      date: "2024-06-18",
      time: "13:00-16:00",
      duration: 180,
      location: "工作室",
      difficulty: "初心者向け",
      description: "木材を使って小物入れやコースターなどの実用的な作品を制作します。",
      materials: "木材、工具一式（すべて提供）",
      requirements: "安全のため長袖着用推奨",
    },
    {
      id: 5,
      title: "イラスト描画ワークショップ",
      instructor: "イラスト研究会",
      date: "2024-06-19",
      time: "15:00-18:00",
      duration: 180,
      location: "美術室C",
      difficulty: "初心者向け",
      description: "キャラクターデザインの基本から色彩理論まで、イラスト制作の基礎を学びます。",
      materials: "画材一式（提供）、タブレット（貸出可）",
      requirements: "特になし",
    },
    {
      id: 6,
      title: "3DCG制作入門",
      instructor: "アートサークル",
      date: "2024-06-20",
      time: "10:00-13:00",
      duration: 180,
      location: "PC室A",
      difficulty: "中級者向け",
      description: "Blenderを使用した3DCG制作の基本操作から簡単なモデリングまで学習します。",
      materials: "PC、ソフトウェア（提供）",
      requirements: "基本的なPC操作ができる方",
    },
  ]

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("ja-JP", { year: "numeric", month: "long" })
  }

  const getWorkshopsForDate = (date: string) => {
    return workshops.filter((workshop) => workshop.date === date)
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate)
    const firstDay = getFirstDayOfMonth(currentDate)
    const days = []

    // 空のセルを追加（月の最初の日まで）
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 border border-gray-200"></div>)
    }

    // 日付のセルを追加
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
      const dayWorkshops = getWorkshopsForDate(dateString)
      const isToday = dateString === "2024-06-15" // 現在日として設定

      days.push(
        <div key={day} className={`h-24 border border-gray-200 p-1 ${isToday ? "bg-purple-50" : "bg-white"}`}>
          <div className={`text-sm font-medium mb-1 ${isToday ? "text-purple-600" : "text-gray-900"}`}>{day}</div>
          <div className="space-y-1">
            {dayWorkshops.slice(0, 2).map((workshop) => (
              <div
                key={workshop.id}
                className="text-xs bg-purple-100 text-purple-800 px-1 py-0.5 rounded truncate"
                title={workshop.title}
              >
                {workshop.time.split("-")[0]} {workshop.title}
              </div>
            ))}
            {dayWorkshops.length > 2 && <div className="text-xs text-gray-500">+{dayWorkshops.length - 2}件</div>}
          </div>
        </div>,
      )
    }

    return days
  }

  const upcomingWorkshops = workshops
    .filter((workshop) => new Date(workshop.date) >= new Date("2024-06-15"))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Button asChild variant="ghost" size="sm">
                <Link href="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  ホームに戻る
                </Link>
              </Button>
              <div className="flex items-center space-x-2">
                <Calendar className="h-8 w-8 text-purple-600" />
                <h1 className="text-2xl font-bold text-gray-900">ワークショップ</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="calendar" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="calendar">カレンダー表示</TabsTrigger>
            <TabsTrigger value="list">リスト表示</TabsTrigger>
          </TabsList>

          <TabsContent value="calendar" className="space-y-6">
            {/* Calendar Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">{formatDate(currentDate)}</h2>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={() => navigateMonth("prev")}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => navigateMonth("next")}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Calendar Grid */}
            <Card>
              <CardContent className="p-0">
                <div className="grid grid-cols-7 border-b border-gray-200">
                  {["日", "月", "火", "水", "木", "金", "土"].map((day) => (
                    <div key={day} className="p-3 text-center font-medium text-gray-700 bg-gray-50">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7">{renderCalendar()}</div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="list" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">今後のワークショップ</h2>
              <Badge variant="outline">{upcomingWorkshops.length}件</Badge>
            </div>

            <div className="grid gap-6">
              {upcomingWorkshops.map((workshop) => (
                <Card key={workshop.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{workshop.title}</CardTitle>
                        <CardDescription className="text-base mt-1">講師: {workshop.instructor}</CardDescription>
                      </div>
                      <Badge variant={workshop.difficulty === "初心者向け" ? "default" : "secondary"}>
                        {workshop.difficulty}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-700">{workshop.description}</p>

                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span>{new Date(workshop.date).toLocaleDateString("ja-JP")}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span>
                            {workshop.time} ({workshop.duration}分)
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span>{workshop.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium">持参物:</span> {workshop.materials}
                      </div>
                      <div>
                        <span className="font-medium">注意事項:</span> {workshop.requirements}
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-4">
                      <div className="text-sm text-gray-600">
                        期間:{" "}
                        {new Date(new Date(workshop.date).getTime() - 24 * 60 * 60 * 1000).toLocaleDateString("ja-JP")}
                        まで
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
