"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Textarea } from "./ui/textarea";

import sanitizeHtml from 'sanitize-html'
import { blacklistWords } from "@/lib/blacklist";
import { Comment } from "@/types/comments";


interface CommentBoxProps {
  contentId: string;
  endpoint: "exhibitions" | "workshops";
}

export const CommentBox: React.FC<CommentBoxProps> = ({ contentId, endpoint }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [input, setInput] = useState("");
  const [hasCommented, setHasCommented] = useState(false);
  const [loading, setLoading] = useState(false);

  // cookie 判定
  useEffect(() => {
    const cookieName = `commented-${endpoint}-${contentId}`;
    const cookies = document.cookie.split(";").map(c => c.trim());
    const found = cookies.find(c => c.startsWith(cookieName + "="));
    setHasCommented(Boolean(found));
  }, [endpoint, contentId]);



  // コメントを取得
  const fetchComments = useCallback(async () => {
    try {
      const res = await fetch(`/api/comments?targetType=${endpoint}&targetId=${contentId}`);
      const data = await res.json();
      setComments(Array.isArray(data.comments) ? data.comments : []);
    } catch (err) {
      console.error("コメント取得エラー:", err);
    }
  }, [endpoint, contentId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  
  // ブラックリストの単語に当てはまったら、自動で投稿をはじく機能
  function containsBlacklistedWord(comment: string): boolean {
    return blacklistWords.some(word => comment.includes(word.toLowerCase()))
  }

  // コメントを送信
  const handleSubmit = async () => {
    if (!input.trim()) return;
    
    if (containsBlacklistedWord(input)) {
      alert("不適切なワードが含まれているため投稿できません。")
      return
    }

    // サニタイズ処理
    const safeInput = sanitizeHtml(input)
      const createComment = {
        targetType: endpoint,
        targetId: contentId,
        content: safeInput,
      };
        
      setLoading(true);
      try{
          const res = await fetch("/api/comments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(createComment),
          });

        await fetchComments();
      
        const data = await res.json();
        setComments((prev) => [data.comment, ...prev])
        setInput("");
        setHasCommented(true);
      } finally {
        setLoading(false);
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
                  <Button onClick={handleSubmit} disabled={loading}>
                     {loading ? "送信中…" : "送信"}
                  </Button>
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
                        {c.createdAt}
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
