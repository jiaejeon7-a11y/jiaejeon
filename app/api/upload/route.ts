// route.ts 파일 맨 위에 추가
export const maxDuration = 60; // 실행 시간 제한 늘리기
export const config = {
  api: {
    bodyParser: false, // [핵심] 서버가 파일을 직접 분석하지 않고 통째로 넘기게 함
  },
}; import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// 서버가 지아님의 정보를 잊어버리지 않게 직접 입력합니다.
cloudinary.config({
  cloud_name: "dibngz05a",
  api_key: "363275496743395",
  api_secret: "qsgSFZrsiAC9WhDTajxBgjHTXJo", // <--- 요게 정확한지 확인!
});

export async function POST(request: NextRequest) {
  try {
    // 19번 줄부터 아래 내용을 붙여넣으세요
    const blob = await request.blob();
    const formData = await new Response(blob, {
      headers: request.headers
    }).formData();

    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Promise((resolve) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "auto",
          folder: "free-images",
          use_filename: true,        // 이 줄 추가! (쉼표 꼭 확인)
          unique_filename: false,     // 이 줄 추가!
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            resolve(NextResponse.json({ error: "Upload failed" }, { status: 500 }));
          } else {
            resolve(NextResponse.json({ success: true, result }));
          }
        }
      );
      uploadStream.end(buffer);
    });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}