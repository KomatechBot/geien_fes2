"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Comment } from "@/types/comments";
import { Textarea } from "./ui/textarea";


interface CommentBoxProps {
  contentId: string;
  endpoint: string;
}

export const CommentBox: React.FC<CommentBoxProps> = ({ contentId, endpoint }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [input, setInput] = useState("");
  const [hasCommented, setHasCommented] = useState(false);

  // cookie 判定
  useEffect(() => {
    const cookieName = `commented-${endpoint}-${contentId}`;
    const cookies = document.cookie.split(";").map(c => c.trim());
    const found = cookies.find(c => c.startsWith(cookieName + "="));
    setHasCommented(Boolean(found));
  }, [endpoint, contentId]);


   // コメントを取得
  useEffect(() => {
    fetch(`/api/comments?endpoint=${endpoint}&contentId=${contentId}`)
      .then(res => res.json())
      .then(data =>{
        setComments(data.comments ?? []);
      })
      .catch(console.error);
  }, [endpoint, contentId]);

  // コメントを送信
  const handleSubmit = async () => {
    if (!input.trim()) return;

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ endpoint, contentId, content: input }),
      });
      if (!res.ok) return;

      const data = await res.json();
      setComments(prev => [...prev, data.comment]);
      setInput("");
      setHasCommented(true); 
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Card className="w-full">
          <CardContent>
            <CardTitle>よかったところを投稿しよう！</CardTitle>
            <p className="text-sm text-gray-800 mt-2 mb-2">再投稿は１時間後にできます</p> 
            {hasCommented ? (
                <p className="text-red-500 font-semibold">すでにコメントを投稿しました</p>
              ) : (
                <>
                  <Textarea
                    className="flex-1 bg-white"
                    placeholder="コメントを入力"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  />
                  <br />
                  <Button onClick={handleSubmit}>送信</Button>
                </>
              )}
          </CardContent>
          <CardContent>
             {comments.map((c) => (
                c && c.content ? ( // content が存在する場合のみ描画
                  <Card key={c.id} className="bg-gray-50">
                    <CardContent className="p-2">
                      <p>{c.content}</p>
                      <span className="text-xs text-gray-500">
                        {new Date(c.createdAt).toLocaleString()}
                      </span>
                    </CardContent>
                  </Card>
                ) : null
              ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
