export type LessonStatus = "ready" | "placeholder";

export type Topic = {
  id: string;
  title: string;
  summary: string;
};

export type Lesson = {
  id: string;
  number: number;
  title: string;
  status: LessonStatus;
  topics: Topic[];
};

export type Course = {
  id: string;
  code: string;
  title: string;
  description: string;
  lessons: Lesson[];
};
