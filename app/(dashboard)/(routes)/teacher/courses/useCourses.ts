import { useEffect, useState } from "react";

const useCourses = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("/api/courses");
        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }
        const data = await response.json();
        setCourses(data.courses);
      } catch (err) {
        setError("Failed to fetch courses");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return { courses, loading, error };
};

export default useCourses;

// import { useEffect, useState } from "react";
// import { db } from "@/lib/db";

// const useCourses = (userId: string | null) => {
//   const [courses, setCourses] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchCourses = async () => {
//       if (!userId) {
//         setCourses([]); // Reset courses if userId is null
//         setLoading(false);
//         return;
//       }

//       try {
//         const data = await db.course.findMany({
//           where: { userId },
//           orderBy: { createdAt: "desc" },
//         });

//         setCourses(data);
//       } catch (err) {
//         console.log(err, "dfdfdfdf");
//         setError("Failed to fetch courses");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCourses();
//   }, [userId]);

//   return { courses, loading, error };
// };

// export default useCourses;
