import { Trash2 } from "lucide-react";

import type { Course, Student } from "@/lib/types";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type CourseCardProps = {
  course: Course;
  student: Student;
  enrolledAt?: string;
  isEnrolled: boolean;
  onCancel: (courseId: string) => void;
};

function formatEnrolledAt(value?: string) {
  if (!value) return "";

  return new Intl.DateTimeFormat("th-TH", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export function CourseCard({
  course,
  student,
  enrolledAt,
  isEnrolled,
  onCancel,
}: CourseCardProps) {
  const statusText = isEnrolled
    ? "ลงทะเบียนแล้ว"
    : "เปิดรับ";

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div>
          <CardTitle className="text-base">
            {course.courseTitle}
          </CardTitle>

          <CardDescription>
            รหัสวิชา: {course.courseId} · ผู้สอน:{" "}
            {course.instructors.join(", ")}
          </CardDescription>
        </div>

        <Badge
          className={
            isEnrolled
              ? "bg-amber-100 text-amber-700 hover:bg-amber-100 dark:bg-purple-900/40 dark:text-purple-300"
              : "bg-purple-100 text-purple-700 hover:bg-purple-100 dark:bg-amber-900/40 dark:text-amber-300"
          }
        >
          {statusText}
        </Badge>
      </CardHeader>

      {isEnrolled && (
        <CardContent className="flex items-end justify-between">
          <div className="text-xs text-muted-foreground">
            <p>
              ชื่อ นศ.: {student.firstName}{" "}
              {student.lastName}
            </p>

            <p>
              โปรแกรม: {student.program}
            </p>

            <p>
              ลงทะเบียนเมื่อ:{" "}
              {formatEnrolledAt(enrolledAt)}
            </p>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() =>
              onCancel(course.courseId)
            }
            aria-label="ยกเลิกการลงทะเบียน"
          >
            <Trash2 />
          </Button>
        </CardContent>
      )}
    </Card>
  );
}