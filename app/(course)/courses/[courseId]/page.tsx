import { db } from "@/lib/db";
import { redirect } from "next/navigation";

type Params = Promise<{ courseId: string; }>;

const CourseIdPage = async ({
  params
}: {
  params: Params;
}) => {
  const resolvedParams = await params;
  const courseId = resolvedParams.courseId;

  // Aapka logic yahaan aata hai
  // For example, fetch course details using courseId
  // const courseDetails = await getCourseDetails(courseId);


  const course = await db.course.findUnique({
    where: {
      id: courseId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        orderBy: {
          position: "asc"
        }
      }
    }
  });

  if (!course) {
    return redirect("/");
  }

  return redirect(`/courses/${course.id}/chapters/${course.chapters[0].id}`);
}
 
export default CourseIdPage;