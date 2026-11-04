import { getCourses } from "@/features/courses";
import { PracticeHome } from "@/features/practice";

export default function PracticePage() {
  return <PracticeHome courses={getCourses()} />;
}
