import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";

interface LikeButtonProps {
    contentId: string;
    endpoint: string; // どのコンテンツか指定
    initialLikes?: number;
}

export const LikeButton: React.FC<LikeButtonProps> = ({ contentId, endpoint, initialLikes = 0 }) => {
    const [likes, setLikes] = useState(initialLikes);
    const [liked, setLiked] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (typeof window === "undefined") return;
        
        const cookieValue = document.cookie.split(";").find(c => c.trim().startsWith(`liked-${endpoint}-${contentId}=`));

        if (cookieValue) {
            setLiked(true);
            setMessage("すでにいいねしています");
        }
    }, [endpoint, contentId]);
 

    const handleLike = async () => {
        if (liked) return; // すでに押していれば何もしない

        try {
            const res = await fetch("/api/like", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ contentId, endpoint }),
            });

            if (!res.ok) {
                console.error("API Error", res.statusText);
                return;
            }

            const data = await res.json();
            if (typeof data.likes === "number") {
                setLikes(data.likes);
                setLiked(true); 
                setMessage("すでにいいねしています");

                // Cookie を 1時間保持
                document.cookie = `liked-${endpoint}-${contentId}=true; path=/; max-age=${ 60 * 60 }; samesite=lax`;

                // sonner トースト
                toast.success("いいねありがとう！😊");
            }
        } catch (err) {
            console.error("Fetch Error", err);
        }
    };

    return (
        <div className="flex flex-col items-center gap-1">
            <Button
                className={`w-full rounded ${
                    liked ? "bg-red-700 text-white" : "bg-black text-white"
                }`}
                onClick={handleLike}
                disabled={liked}
            >
                <Heart className="h-4 w-4" />
                <span>{likes}</span>
            </Button>
            {message && <p className="text-xs text-red-500">{message}</p>}
        </div>
    );
};
