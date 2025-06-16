"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"


//Exhibitionsの型定義
import type { Exhibition } from "@/types/exhibition"



export default function ExhibitionsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [displayFilter, setDisplayFilter] = useState("all")
  const [exhibitions, setExhibitions] = useState<Exhibition[]>([])



  useEffect(() => {
    const fetchData = async() => {
      const res = await fetch('/api/exhibitions')
      const data = await res.json()
      setExhibitions(data)
    }
    fetchData()
  }, [])



  const filteredExhibitions = exhibitions.filter((exhibition) => {
    const matchesSearch =
      exhibition.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exhibition.creator.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || exhibition.category === categoryFilter
    const matchesDisplay =
      displayFilter === "all" ||
      (displayFilter === "current" && exhibition.isCurrentlyDisplayed) ||
      (displayFilter === "upcoming" && !exhibition.isCurrentlyDisplayed)

    return matchesSearch && matchesCategory && matchesDisplay
  })

  const categories = ["all", "デジタルアート", "工芸", "写真", "絵画", "イラスト"]

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
                <h1 className="text-2xl font-bold text-gray-900">展示一覧</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1 w-auto h-auto bg-white border-purple-700">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="展示名や創作者で検索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-48 bg-white">
                <SelectValue placeholder="カテゴリー" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">すべてのカテゴリー</SelectItem>
                {categories.slice(1).map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={displayFilter} onValueChange={setDisplayFilter}>
              <SelectTrigger className="w-full md:w-48 bg-white">
                <SelectValue placeholder="展示状況" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">すべて</SelectItem>
                <SelectItem value="current">展示中</SelectItem>
                <SelectItem value="upcoming">今後展示予定</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">{filteredExhibitions.length}件の展示が見つかりました</p>
        </div>

        {/* Exhibition Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExhibitions.map((exhibition) => (
            <Card key={exhibition.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <Image
                  src={exhibition.image?.url ?? "/placeholder.svg"}
                  alt={exhibition.title}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2">
                  {exhibition.isCurrentlyDisplayed ? (
                    <Badge className="bg-green-500 hover:bg-green-600">展示中</Badge>
                  ) : (
                    <Badge variant="secondary">今後展示予定</Badge>
                  )}
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-lg">{exhibition.title}</CardTitle>
                <CardDescription>{exhibition.creator}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">{exhibition.description}</p>
                <div className="flex justify-between items-center">
                  <Badge variant="outline">{exhibition.category}</Badge>
                  <Button asChild size="sm">
                    <Link href={`/exhibitions/${exhibition.id}`}>詳細を見る</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredExhibitions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">条件に一致する展示が見つかりませんでした。</p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setCategoryFilter("all")
                setDisplayFilter("all")
              }}
              variant="outline"
              className="mt-4"
            >
              検索条件をリセット
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
