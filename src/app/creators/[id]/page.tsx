"use client"

import { useState, useEffect, use } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, User, Mail, ExternalLink, Users, Calendar, Palette } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

import type { Creator } from "@/types/creators"



export default function CreatorDetailPage(props: {params: Promise<{ id: string}>}) {
  const { id } = use(props.params)
  const [creator, setCreator] = useState<Creator | null>(null)
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/creators/${id}`)
        const data = await res.json()
        setCreator(data || null)
      } catch (_) {
        
      }
    }

    fetchData()
  }, [id])

  

  if (!creator) {return <div>読み込み中...</div>}


  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Button asChild variant="ghost" size="sm">
              <Link href="/creators">
                <ArrowLeft className="h-4 w-4 mr-2" />
                創作者一覧に戻る
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Header */}
            <Card>
              <CardHeader>
                <div className="flex items-start space-x-4">
                  <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center">
                    <User className="h-10 w-10 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <CardTitle className="text-2xl">{creator.name}</CardTitle>
                      <Badge variant="outline">{creator.type}</Badge>
                    </div>
                    <CardDescription className="text-base mb-3">{creator.description}</CardDescription>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{creator.memberCount}名</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{creator.establishedYear}年設立</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Specialties */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Palette className="h-5 w-5" />
                  <span>専門分野</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  { creator.specialties && (
                    <Badge variant="secondary" className="text-sm">
                      {creator.specialties}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* About */}
            <Card>
              <CardHeader>
                <CardTitle>自己紹介</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  {creator.longDescription && (
                    <CardDescription className="text-gray-700 leading-relaxed">{creator.longDescription}</CardDescription>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Past Exhibitions */}
            <Card>
              <CardHeader>
                <CardTitle>過去の展示</CardTitle>
              </CardHeader>
              <CardContent>
                {creator.exhibitions?.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {creator.exhibitions.map((exhibition) => (
                      <div key={exhibition.id} className="border p-4 rounded-md bg-gray-50">
                        <h4 className="font-medium text-base">{exhibition.title}</h4>
                        {exhibition.description && (
                          <p className="text-sm text-gray-600">{exhibition.description}</p>
                        )}
                        {exhibition.image?.url && (
                          <Image
                            src={exhibition.image.url}
                            alt={exhibition.title}
                            width={800}
                            height={600}
                            className="mt-2 w-full h-auto object-cover rounded-lg shadow-sm border"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">表示可能な展示はありません。</p>
                )}
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle>主な実績</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  { creator.achievements &&  (
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-700">{creator.achievements}</span>
                    </li>
                  )}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle>連絡先</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-medium">メール</p>
                    <a href={`mailto:${creator.contact}`} className="text-purple-600 hover:underline text-sm">
                      {creator.contact}
                    </a>
                  </div>
                </div>
                {creator.website && (
                  <>
                    <Separator />
                    <div className="flex items-center space-x-3">
                      <ExternalLink className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="font-medium">ウェブサイト</p>
                        <a
                          href={creator.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-600 hover:underline text-sm"
                        >
                          公式サイト
                        </a>
                      </div>
                    </div>
                  </>
                )}
                {creator.socialMedia && (
                  <>
                    <Separator />
                    <div>
                      <p className="font-medium mb-2">SNS</p>
                      <div className="space-y-1">
                        {creator.socialMedia && (
                          <p className="text-sm text-gray-600">{creator.socialMedia}</p>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle>今後の予定</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  { Array.isArray(creator.upcomingEvents) && creator.upcomingEvents.map((event, index) => (
                    <div key={index}>
                      <h4 className="font-medium text-sm">{event.title}</h4>
                      <p className="text-xs text-gray-600 mb-1">
                        {event.date} {event.time}
                      </p>
                      <p className="text-xs text-gray-600">{event.description}</p>
                      {index < creator.upcomingEvents.length - 1 && <Separator className="mt-4" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>アクション</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button asChild className="w-full" size="sm">
                  <a href={`mailto:${creator.contact}`}>
                    <Mail className="h-4 w-4 mr-2" />
                    メールで連絡
                  </a>
                </Button>
                {creator.website && (
                  <Button asChild variant="outline" className="w-full" size="sm">
                    <a href={creator.website} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      公式サイト
                    </a>
                  </Button>
                )}
                <Button asChild variant="outline" className="w-full" size="sm">
                  <Link href="/exhibitions">
                    <Palette className="h-4 w-4 mr-2" />
                    展示を見る
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
