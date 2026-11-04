import { getCourses } from "@/features/courses";
import { CourseList } from "@/features/notes";

export default function NotesPage() {
  return <CourseList courses={getCourses()} />;
}
