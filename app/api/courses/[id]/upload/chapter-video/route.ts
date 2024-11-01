import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/utils/authOptions";
import { createUploadFolder, saveFile } from "@/lib/storage"; // Assuming these utilities are defined
import { db } from "@/lib/db";
import path from "path";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  // Unwrap the params Promise
  const { id } = await params;


  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const userId = session.user.id;
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return new NextResponse("No file uploaded", { status: 400 });
    }

    // Determine file type and set the upload path
    let uploadPath = '';
   if (file.type.startsWith('video/')) {
      uploadPath = `assets/videos/courses/${id}/`;
    } else if (file.type.startsWith('application/')) {
      // This could include PDFs, Word docs, etc.
      uploadPath = `assets/docs/courses/${id}/`;
    } else {
      return new NextResponse("Unsupported file type", { status: 400 });
    }

    await createUploadFolder(uploadPath);
    // Save the file and get the URL
    const filePath = await saveFile(file, uploadPath);
        
    const cleanedFilePath = filePath.replace(/\\/g, '/'); 
    const fullFile = `/${cleanedFilePath}`; 
    
const updatedChapter = await db.chapter.update({
      where: { id }, // Make sure to use the correct identifiers
      data: {
        videoUrl: fullFile,
      },
    });

    return NextResponse.json({
      url: `${fullFile}`, 
      updatedChapter,
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return new NextResponse("Failed to upload file", { status: 500 });
  }
}
