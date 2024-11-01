// import Mux from "@mux/mux-node";
// import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
// import mux from "@/lib/mux"; // Import the Mux configuration
// import mux from "@/lib/mux"
import { db } from "@/lib/db";
import Mux from '@mux/mux-node';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/utils/authOptions";

const { MUX_TOKEN_ID, MUX_TOKEN_SECRET } = process.env; 
const mux = new Mux({
  tokenId:MUX_TOKEN_ID,
  tokenSecret:MUX_TOKEN_SECRET,
  // : MUX_TOKEN_ID,
  // secret: MUX_TOKEN_SECRET,
});

const video = mux.video;  // Assign Video for easier reference

// module.exports = mux;

// const { Video } = new Mux(
//   process.env.MUX_TOKEN_ID!,
//   process.env.MUX_TOKEN_SECRET!
// );

// export async function DELETE(
//   req: Request,
//   { params }: { params: { courseId: string; chapterId: string } }
// ) {
  export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ courseId: string; chapterId: string }> }
  ) {
    // Await the resolution of params
    const resolvedParams = await params;
    const { courseId, chapterId } = resolvedParams;
  
  
  try {
    // const { userId } = auth();
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    // const { userId } = auth();
    const userId = session.user.id;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const ownCourse = await db.course.findUnique({
      where: {
        id: courseId,
        userId,
      },
    });

    if (!ownCourse) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const chapter = await db.chapter.findUnique({
      where: {
        id: chapterId,
        courseId: courseId,
      },
    });

    if (!chapter) {
      return new NextResponse("Not Found", { status: 404 });
    }

    if (chapter.videoUrl) {
      const existingMuxData = await db.muxData.findFirst({
        where: {
          chapterId: chapterId,
        },
      });

      if (existingMuxData) {
        // await Video.Assets.del(existingMuxData.assetId);
        await db.muxData.delete({
          where: {
            id: existingMuxData.id,
          },
        });
      }
    }

    const deletedChapter = await db.chapter.delete({
      where: {
        id: chapterId,
      },
    });

    const publishedChaptersInCourse = await db.chapter.findMany({
      where: {
        courseId: courseId,
        isPublished: true,
      },
    });

    if (!publishedChaptersInCourse.length) {
      await db.course.update({
        where: {
          id: courseId,
        },
        data: {
          isPublished: false,
        },
      });
    }

    return NextResponse.json(deletedChapter);
  } catch (error) {
    console.log("[CHAPTER_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// export async function PATCH(
//   req: Request,
//   { params }: { params: { id: string; chapterId: string } }
// ) {
  export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string; chapterId: string }> }
  ) {
    // Await the resolution of params
    const resolvedParams = await params;
    const { id, chapterId } = resolvedParams;
  
  
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    // const { userId } = auth();
    const userId = session.user.id;

    // const { userId } = auth();
    const { isPublished, ...values } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const ownCourse = await db.course.findUnique({
      where: {
        id: id,
        userId,
      },
    });
    console.log(ownCourse, "owncourssee");

    if (!ownCourse) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const chapter = await db.chapter.update({
      where: {
        id: chapterId,
        courseId: id,
      },
      data: {
        ...values,
      },
    });

    if (values.videoUrl) {
      const existingMuxData = await db.muxData.findFirst({
        where: {
          chapterId: chapterId,
        },
      });

      if (existingMuxData) {
        // await Video.Assets.del(existingMuxData.assetId);
        await db.muxData.delete({
          where: {
            id: existingMuxData.id,
          },
        });
      }
      // const asset  = await mux..create({
      //   input: values.videoUrl, // Use the file stream for upload
      //   playback_policy: "public", // Set playback policy
      //   test: false,

      // });
  
      const asset = await video.assets.create({
        input: values.videoUrl,
        playback_policy:["public"],
        // playback_policy: "public",
        test: false,
      });

      await db.muxData.create({
        data: {
          chapterId: chapterId,
          assetId: asset.id,
          playbackId: asset.playback_ids?.[0]?.id,
        },
      });
    }

    return NextResponse.json(chapter);
  } catch (error) {
    console.log("[COURSES_CHAPTER_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
