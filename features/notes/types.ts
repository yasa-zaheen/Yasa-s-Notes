export type NoteSection = {
  id: string;
  title: string;
  markdown: string;
};

export type TopicNotes = {
  topicId: string;
  title: string;
  sections: NoteSection[];
};

export type LessonNotes = {
  courseId: string;
  lessonId: string;
  intro: string;
  topics: TopicNotes[];
};
