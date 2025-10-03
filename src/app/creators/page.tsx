"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, Users, User,  ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

import type { Creator } from "@/types/creators"

export default function CreatorsPage() {
  const [creators, setCreators] = useState<Creator[]>([])

  useEffect(() => {
    const fetchData = async() => {
      const res = await fetch('/api/creators')
      const data = await res.json()
      setCreators(data)
    }
    fetchData()
  }, [])
  
  


  return (
    <div className="min-h-screen  bg-neutral-50">
      {/* Header */}
      <header className="bg-black shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Button asChild variant="default" size="sm">
                <Link href="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  ホームに戻る
                </Link>
              </Button>
              <div className="flex items-center space-x-2">
                <Users className="h-8 w-8 text-black" />
                  <h1 className="text-2xl font-bold text-white">団体一覧</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <p className="text-gray-600 text-lg">
            藝苑祭に参加している創作者・団体をご紹介します。各団体の詳細ページでは、活動内容や連絡先をご確認いただけます。
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {creators.map((creator) => (
            <Card key={creator.id} className="flex flex-col justify-between h-full hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-gray-800" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{creator.name}</CardTitle>
                      <CardDescription>{creator.type}</CardDescription>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {creator.memberCount}名
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col flex-grow space-y-4">
                <p className="text-sm text-gray-600">{creator.description}</p>

                <div>
                  <h4 className="font-medium text-sm mb-2">専門分野</h4>
                  <div className="flex flex-wrap gap-1">
                    <div className="flex flex-wrap gap-2">
                      { creator.specialties && (
                        <Badge variant="secondary" className="text-sm">
                          {creator.specialties}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-sm mb-2">主な展示</h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {  Array.isArray(creator.exhibitions) && 
                    creator.exhibitions.map((exhibition, index) => (
                      <React.Fragment key={index}>
                        <li>• {exhibition.title}</li>
                      </React.Fragment>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between pt-2">
                  {creator.website && (
                    <div className="flex items-center space-x-1">
                      <ExternalLink className="h-3 w-3 text-gray-400" />
                      <span className="text-xs text-gray-500">サイトあり</span>
                    </div>
                  )}
                </div>
                <div className="mt-auto px-6 pb-5 pt-2">
                  <Button asChild className="flex w-full" size="sm">
                    <Link href={`/creators/${creator.id}`}>詳細を見る</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
