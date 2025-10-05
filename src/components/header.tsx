"use client"

import React from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react"

export default function Header() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-2 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-2">
              <h1 className="text-3xl font-bold text-white">藝苑祭</h1>
            </div>
            <nav className="hidden sm:flex space-x-8">
              <Link href="/exhibitions" className="text-white hover:text-gray-500 font-bold">
                展示品
              </Link>
              <Link href="/creators" className="text-white hover:text-gray-500 font-bold">
                団体名
              </Link>
              <Link href="/workshops" className="text-white hover:text-gray-500 font-bold">
                ワークショップ
              </Link>
            </nav>

            {/* Sheet (Mobile) */}
            <div className="sm:hidden">
                <Sheet>
                    <SheetTrigger asChild>
                    <Button variant="ghost" size="lg">
                        <Menu className="text-white w-6 h-6" />
                    </Button>
                    </SheetTrigger>

                    <SheetContent
                    side="right"
                    className="bg-gray-950 text-white border-none flex flex-col justify-between h-full"
                    >
                    {/* 上部エリア */}
                    <div>
                        <SheetHeader>
                        <SheetTitle className="mt-2 text-xl text-white font-bold">リスト</SheetTitle>
                        </SheetHeader>

                        {/* ✅ タイトルのすぐ下にリンクを配置 */}
                        <div className="flex flex-col px-5 space-y-6 mt-4">
                        <Link href="/exhibitions" className="hover:text-gray-400 font-bold">
                            展示品
                        </Link>
                        <Link href="/creators" className="hover:text-gray-400 font-bold">
                            団体名
                        </Link>
                        <Link href="/workshops" className="hover:text-gray-400 font-bold">
                            ワークショップ
                        </Link>
                        </div>
                    </div>

                    {/* 下部フッター固定 */}
                    <div className="text-center text-gray-400 text-sm pb-4">
                        <p>&copy; 2025 藝苑祭. Komatech.</p>
                    </div>
                    </SheetContent>
                </Sheet>
            </div>
          </div>
    </div>
  )
}
