// import { auth } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";

import { UseIsTeacher } from "@/lib/teacher";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/utils/authOptions";
import { NextResponse } from "next/server";
import { isUserType } from "@/lib/auth";

const f = createUploadthing();

const handleAuth = async () => {
  // const { userId } = auth();

  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const userId = session.user.id;
  const IsTeacher = session?.user.type === "TEACHER";

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  // return userId

  // const isAuthorized = isUserType();

  if (!userId || !IsTeacher) throw new Error("Unauthorized");
  return userId;
};

export const ourFileRouter = {
  courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  courseAttachment: f(["text", "image", "video", "audio", "pdf"])
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  chapterVideo: f({ video: { maxFileCount: 1, maxFileSize: "512GB" } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
