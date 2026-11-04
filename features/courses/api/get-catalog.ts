import { cot4400Course } from "@/content/courses/cot-4400/catalog";

import type { Course, Lesson, Topic } from "../types";

const COURSES: Course[] = [cot4400Course];

export function getCourses(): Course[] {
  return COURSES;
}

export function getCourse(courseId: string): Course | undefined {
  return COURSES.find((course) => course.id === courseId);
}

export function getLesson(
  courseId: string,
  lessonId: string
): { course: Course; lesson: Lesson } | undefined {
  const course = getCourse(courseId);
  const lesson = course?.lessons.find((item) => item.id === lessonId);

  if (!course || !lesson) {
    return undefined;
  }

  return { course, lesson };
}

export function getTopic(
  courseId: string,
  lessonId: string,
  topicId: string
): { course: Course; lesson: Lesson; topic: Topic } | undefined {
  const match = getLesson(courseId, lessonId);
  const topic = match?.lesson.topics.find((item) => item.id === topicId);

  if (!match || !topic) {
    return undefined;
  }

  return { ...match, topic };
}

export function findTopicInCourse(
  courseId: string,
  topicId: string
): { course: Course; lesson: Lesson; topic: Topic } | undefined {
  const course = getCourse(courseId);
  if (!course) {
    return undefined;
  }

  for (const lesson of course.lessons) {
    const topic = lesson.topics.find((item) => item.id === topicId);
    if (topic) {
      return { course, lesson, topic };
    }
  }

  return undefined;
}
