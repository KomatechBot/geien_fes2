"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Calendar, Users, Palette } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import type { Exhibition } from "@/types/exhibition"
import type { Workshop } from "@/types/workshop"

import TopPage from "@/components/topPage"



export default function HomePage() {
  const [featuredExhibitions, setFeaturedExhibitions] = useState<Exhibition[]>([]);
  const [upcomingWorkshops, setUpcomingWorkshops] = useState<Workshop[]>([])

  useEffect(() => {
      const fetchData = async() => {
        try {
          const [exhibitionsRes, workshopsRes] = await Promise.all([
            fetch('/api/exhibitions'),
            fetch('/api/workshops')
          ])
          const exhibitionsData = await exhibitionsRes.json()
          const workshopsData = await workshopsRes.json()
          


          if (Array.isArray( exhibitionsData && workshopsData)) {
              setFeaturedExhibitions(exhibitionsData)
              setUpcomingWorkshops(workshopsData)
          } else {
              console.error("APIレスポンスが配列ではありません", exhibitionsData, workshopsData);
              setFeaturedExhibitions([]);
              setUpcomingWorkshops([]);
            } 
          }
          catch (err) {
            console.error("API通信エラー:", err);
            setFeaturedExhibitions([]);
            setUpcomingWorkshops([]);
          }

    }
    fetchData()
  }, [])

  
    //最新3個の作品を展示
  const sortedFeaturedExhibitions = [...featuredExhibitions] // 元の配列をコピー（破壊的変更を防ぐ）
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) // 新しい順
    .slice(0, 3); // 上位3件だけ取得

  //最新３個の作品を展示
  const sortedUpcomingWorkshops = [...upcomingWorkshops] // 元の配列をコピー（破壊的変更を防ぐ）
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) // 新しい順
    .slice(0, 2); // 上位3件だけ取得



  return (
    <div className="h-full bg-neutral-900">
      {/* Header */}
      <header className="shadow-sm border-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-2">
              <h1 className="text-3xl font-bold text-white">藝苑祭</h1>
            </div>
            <nav className="hidden sm:flex space-x-8">
              <Link href="/exhibitions" className="text-white hover:text-gray-500 font-bold">
                展示品
              </Link>
              <Link href="/creators" className="text-white hover:text-gray-500 font-bold">
                制作者プロフィール
              </Link>
              <Link href="/workshops" className="text-white hover:text-gray-500 font-bold">
                ワークショップ
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative flex h-full w-full justify-center items-center bg-sky-950 ">
          <TopPage />
      </section>

      {/* Features */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-black mb-12">藝苑祭とは？</h3>
          <p className="flex justify-center items-center text-center text-2xl sm:text-3xl font-semibold drop-shadow-md mb-8 ">
              学生たちの創作活動を展示し、制作者と利用者を繋ぐ藝苑祭の第二弾！
          </p>
          <div className="grid md:grid-cols-3 gap-20">
            <Card className="text-center border-none shadow-none bg-gray-100">
              <CardHeader>
                <Palette className="h-12 w-12 text-black mx-auto mb-4" />
                <CardTitle>多くの制作展示</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>デジタルアート、文学など様々な制作物を見ることができます！</CardDescription>
              </CardContent>
            </Card>
            <Card className="text-center border-none shadow-none bg-gray-100">
              <CardHeader>
                <Users className="h-12 w-12 text-black mx-auto mb-4" />
                <CardTitle>制作者とのつながり</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>制作者の活動内容を通じて、制作者と利用者との交流ができます！</CardDescription>
              </CardContent>
            </Card>
            <Card className="text-center border-none shadow-none bg-gray-100">
              <CardHeader>
                <Calendar className="h-12 w-12 text-black mx-auto mb-4" />
                <CardTitle>体験ワークショップ</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>体験ができるワークショップで制作を楽しめる！</CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Works */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-3xl font-bold text-white ">注目の展示</h3>
            <Button asChild variant="secondary">
              <Link href="/exhibitions">すべて見る</Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {sortedFeaturedExhibitions.map((exhibition) => ( 
              <Card key={exhibition.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                    <Image
                      src={exhibition.image?.url ?? "/placeholder.svg"}
                      alt={exhibition.title}
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover"
                    />
                  
                  {exhibition.isCurrentlyDisplayed && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      展示中
                    </div>
                  )}
                  
                </div>
                <br />
                <CardHeader>
                  <Link href={`/exhibitions/${exhibition.id}`}>
                  <CardTitle className="text-lg">{exhibition.title}</CardTitle>
                  <CardDescription>
                    {exhibition.creator}
                  </CardDescription>
                  <CardDescription>
                    開催期間：{exhibition.displayPeriod}
                  </CardDescription>
                  </Link>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-black font-medium">{exhibition.category}</span>
                    <Button asChild size="sm" variant="outline">
                      <Link href={`/exhibitions/${exhibition.id}`}>詳細</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Workshops */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-3xl font-bold text-gray-900">今後のワークショップ</h3>
            <Button asChild variant="secondary">
              <Link href="/workshops">ワークショップを見る</Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {sortedUpcomingWorkshops.map((workshop, index) => (
              <Card key={index}>
                <Link href="/workshops">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{workshop.title}</CardTitle>
                      <CardDescription>
                        開催日：{workshop.date} 
                      </CardDescription>
                      <CardDescription>
                        開催時間：{workshop.time}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-xl font-bold">藝苑祭</span>
              </div>
              <p className="text-gray-400">学生たちの創作活動を展示し、制作者と利用者を繋ぐ藝苑祭</p>
              <br />
              <div>
                <ul>
                  <p>
                    Komatech
                  </p>
                  <li>
                    <Link href="https://x.com/Komazawa_Tech" className="text-gray-400 hover:text-white">
                      X(旧Twitter)
                    </Link>
                  </li>
                  <li>
                    <Link href="https://www.instagram.com/koma_tech/" className="text-gray-400 hover:text-white">
                      Instagram
                    </Link>
                  </li>
                  <br />
                  <li>
                    <Link href="https://www.komazawa-u.ac.jp/" className="text-gray-400 hover:text-white">
                      駒澤大学について
                    </Link>
                  </li>
                  <li>
                    <Link href="https://my-portfolio-phi-tan-95.vercel.app/" className="text-gray-400 hover:text-white">
                      Web作成者について
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">リンク</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/exhibitions" className="hover:text-white">
                    展示品
                  </Link>
                </li>
                <li>
                  <Link href="/creators" className="hover:text-white">
                    制作者プロフィール
                  </Link>
                </li>
                <li>
                  <Link href="/workshops" className="hover:text-white">
                    イベントカレンダー
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">お問い合わせ</h4>
              <p className="text-gray-400">
                藝苑祭運営スタッフ
              </p>
              <p className="text-gray-400">
                Gmail: komazawa.geien.official@gmail.com
              </p>
              <h6 className="text-lg mt-4 mb-2">SNSアカウント</h6>
              <ul>
                <li>
                  <Link href="https://www.instagram.com/komazawa_geien_official/" className="text-gray-400 hover:text-white">
                    公式Instagram
                  </Link>
                </li>
                <li>
                  <Link href="https://x.com/komazawa_geien" className="text-gray-400 hover:text-white">
                    公式X(旧Twitter)
                  </Link>
                </li>
              </ul>

            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 藝苑祭. Komatech.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}




