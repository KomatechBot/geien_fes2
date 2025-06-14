import Link from "next/link"
import { ArrowLeft, Users, User, Mail, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function CreatorsPage() {
  const creators = [
    {
      id: "art-circle",
      name: "アートサークル",
      type: "サークル",
      description: "デジタルアートを中心とした創作活動を行う学生サークル",
      specialties: ["デジタルアート", "3DCG", "映像制作"],
      memberCount: 15,
      contact: "art-circle@university.ac.jp",
      website: "https://art-circle.example.com",
      exhibitions: ["デジタルアート展示", "3D映像作品展"],
    },
    {
      id: "craft-seminar",
      name: "工芸ゼミ",
      type: "ゼミ",
      description: "伝統工芸と現代技術の融合を研究するゼミナール",
      specialties: ["陶芸", "木工", "金属工芸"],
      memberCount: 8,
      contact: "craft-seminar@university.ac.jp",
      website: null,
      exhibitions: ["陶芸作品集", "現代工芸展"],
    },
    {
      id: "photo-club",
      name: "写真部",
      type: "部活",
      description: "写真撮影技術の向上と作品制作を目的とした部活動",
      specialties: ["風景写真", "ポートレート", "ストリートフォト"],
      memberCount: 22,
      contact: "photo-club@university.ac.jp",
      website: "https://photo-club.example.com",
      exhibitions: ["写真展「日常の美」", "四季の風景写真展"],
    },
    {
      id: "art-department",
      name: "美術部",
      type: "部活",
      description: "絵画を中心とした美術作品の制作と展示を行う部活動",
      specialties: ["油絵", "水彩画", "抽象画"],
      memberCount: 18,
      contact: "art-dept@university.ac.jp",
      website: null,
      exhibitions: ["抽象絵画シリーズ", "学生美術展"],
    },
    {
      id: "woodwork-circle",
      name: "木工サークル",
      type: "サークル",
      description: "木材を使った実用的で美しい作品制作を行うサークル",
      specialties: ["家具制作", "木彫", "建築模型"],
      memberCount: 12,
      contact: "woodwork@university.ac.jp",
      website: "https://woodwork.example.com",
      exhibitions: ["木工クラフト展", "手作り家具展示"],
    },
    {
      id: "illustration-lab",
      name: "イラスト研究会",
      type: "研究会",
      description: "多様なスタイルのイラストレーション制作と研究を行う団体",
      specialties: ["キャラクターデザイン", "コンセプトアート", "絵本制作"],
      memberCount: 25,
      contact: "illust-lab@university.ac.jp",
      website: "https://illust-lab.example.com",
      exhibitions: ["イラストレーション展", "キャラクターアート展"],
    },
  ]

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
                <Users className="h-8 w-8 text-purple-600" />
                <h1 className="text-2xl font-bold text-gray-900">創作者一覧</h1>
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
            <Card key={creator.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-purple-600" />
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
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">{creator.description}</p>

                <div>
                  <h4 className="font-medium text-sm mb-2">専門分野</h4>
                  <div className="flex flex-wrap gap-1">
                    {creator.specialties.map((specialty) => (
                      <Badge key={specialty} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-sm mb-2">主な展示</h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {creator.exhibitions.map((exhibition) => (
                      <li key={exhibition}>• {exhibition}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="text-xs text-gray-500">連絡可能</span>
                  </div>
                  {creator.website && (
                    <div className="flex items-center space-x-1">
                      <ExternalLink className="h-3 w-3 text-gray-400" />
                      <span className="text-xs text-gray-500">サイトあり</span>
                    </div>
                  )}
                </div>

                <Button asChild className="w-full" size="sm">
                  <Link href={`/creators/${creator.id}`}>詳細を見る</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
