import Link from "next/link"
import { ArrowLeft, User, Mail, ExternalLink, Users, Calendar, Palette } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function CreatorDetailPage({ params }: { params: { id: string } }) {
  // 実際の実装ではmicroCMSからデータを取得
  const creator = {
    id: params.id,
    name: "アートサークル",
    type: "サークル",
    description:
      "デジタルアートを中心とした創作活動を行う学生サークル。最新の技術を取り入れながら、伝統的なアートの概念を現代に再解釈する作品制作を行っています。",
    longDescription: `アートサークルは2018年に設立された学生主体の創作団体です。

    デジタルアートを中心としながらも、従来のアナログ手法との融合を重視し、新しい表現の可能性を追求しています。メンバーは美術学部だけでなく、工学部、文学部など多様な学部から参加しており、異なる専門性を活かした学際的な作品制作を行っています。

    主な活動内容：
    • 月2回の定期制作会
    • 年4回の作品発表会
    • 外部アーティストを招いたワークショップ
    • 地域のアートイベントへの参加
    • 他大学との合同展示会

    私たちは「技術と感性の調和」をテーマに、デジタル技術を単なる道具として使うのではなく、新しい芸術表現の可能性を探求するパートナーとして捉えています。`,
    specialties: ["デジタルアート", "3DCG", "映像制作", "インタラクティブアート"],
    memberCount: 15,
    establishedYear: 2018,
    contact: "art-circle@university.ac.jp",
    website: "https://art-circle.example.com",
    socialMedia: {
      twitter: "@art_circle_uni",
      instagram: "@artcircle_university",
    },
    exhibitions: [
      {
        title: "デジタルアート展示",
        description: "最新のAI技術を活用したインタラクティブアート作品",
      },
      {
        title: "3D映像作品展",
        description: "立体映像技術を使った没入型アート体験",
      },
      {
        title: "学際アート展",
        description: "他学部との協働による実験的作品群",
      },
    ],
    upcomingEvents: [
      {
        title: "デジタルアート制作ワークショップ",
        date: "2024年6月20日",
        time: "14:00-17:00",
        description: "初心者向けのデジタルアート制作体験",
      },
      {
        title: "作品講評会",
        date: "2024年6月25日",
        time: "18:00-20:00",
        description: "メンバーの最新作品を発表・討論",
      },
    ],
    achievements: [
      "2023年度 学生アート大賞 優秀賞受賞",
      "地域アートフェスティバル 特別賞受賞",
      "他大学との合同展示会 主催",
    ],
  }

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
                  {creator.specialties.map((specialty) => (
                    <Badge key={specialty} variant="secondary" className="text-sm">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* About */}
            <Card>
              <CardHeader>
                <CardTitle>詳細について</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  {creator.longDescription.split("\n\n").map((paragraph, index) => (
                    <div key={index}>
                      {paragraph.includes("•") ? (
                        <div className="mb-4">
                          {paragraph.split("\n").map((line, lineIndex) => (
                            <div key={lineIndex} className="mb-1">
                              {line.startsWith("•") ? (
                                <div className="ml-4 text-gray-700">{line}</div>
                              ) : (
                                <div className="font-medium text-gray-900 mb-2">{line}</div>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="mb-4 text-gray-700 leading-relaxed">{paragraph}</p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Past Exhibitions */}
            <Card>
              <CardHeader>
                <CardTitle>過去の展示</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {creator.exhibitions.map((exhibition, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-lg">{exhibition.title}</h4>
                      </div>
                      <p className="text-gray-600 text-sm">{exhibition.description}</p>
                      {index < creator.exhibitions.length - 1 && <Separator className="mt-4" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle>主な実績</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {creator.achievements.map((achievement, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-700">{achievement}</span>
                    </li>
                  ))}
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
                        {creator.socialMedia.twitter && (
                          <p className="text-sm text-gray-600">Twitter: {creator.socialMedia.twitter}</p>
                        )}
                        {creator.socialMedia.instagram && (
                          <p className="text-sm text-gray-600">Instagram: {creator.socialMedia.instagram}</p>
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
                  {creator.upcomingEvents.map((event, index) => (
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
