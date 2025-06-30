"use client"

import { FC } from "react";
import { QRCodeCanvas } from "qrcode.react";

interface QRCodeProps {
    url: string;
}

// QRコード生成用のコンポーネント（実際の実装ではqrcode.jsなどを使用）
const QRCodeDisplay: FC<QRCodeProps> = (props) => {
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="w-48 h-48 bg-gray-100 border-2 border-dashed flex items-center justify-center">
        <div className="text-center">
          <QRCodeCanvas
            value={props.url}
            size={190}
            bgColor={"#FFFFFF"}
            fgColor={"#000000"}
            level={"L"}
            imageSettings={{
                src: "none",
                x: undefined,
                y: undefined,
                height: 24,
                width: 24,
                excavate: true,
            }}
          />
        </div>
      </div>
      <p className="text-sm text-gray-600 text-center max-w-xs">このQRコードをスキャンして展示ページにアクセス</p>
      <p className="text-xs text-gray-400 break-all max-w-xs text-center">{props.url}</p>
    </div>
  )
}

export default QRCodeDisplay;