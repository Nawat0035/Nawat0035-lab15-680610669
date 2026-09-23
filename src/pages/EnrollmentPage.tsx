import { useState } from "react";

import { CourseCard } from "@/components/course-card";
import { RegisterDialog } from "@/components/register-dialog";

import {
  courses,
  currentStudent,
  enrollments,
} from "@/lib/mock-data";

// เอาข้อมูลวิชาที่ลงทะเบียนไว้แล้วมาแสดงตอนเปิดเว็บ
function getInitialEnrollments() {
  return Object.fromEntries(
    enrollments
      .filter(
        (enrollment) =>
          enrollment.studentId === currentStudent.studentId
      )
      .map((enrollment) => [
        enrollment.courseId,
        enrollment.enrolledAt ?? "",
      ])
  );
}

export default function Enrollent() {
  const [enrolledCourses, setEnrolledCourses] = useState<
    Record<string, string>
  >(getInitialEnrollments);

  // เอาเฉพาะรหัสวิชาที่ลงทะเบียนแล้ว
  const enrolledCourseIds = Object.keys(enrolledCourses);

  // ตอนกดลงทะเบียน
  function handleRegister(courseId: string, time: string) {
    const now = new Date();

    const [hours, minutes] = time.split(":").map(Number);

    now.setHours(hours, minutes, 0, 0);

    setEnrolledCourses((old) => ({
      ...old,
      [courseId]: now.toISOString(),
    }));
  }

  // ตอนกดยกเลิก
  function handleCancel(courseId: string) {
    setEnrolledCourses((old) => {
      const newData = { ...old };

      delete newData[courseId];

      return newData;
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold">
            รายวิชาทั้งหมด
          </h1>

          {/* ปุ่มลงทะเบียนรวม */}
          <RegisterDialog
            courses={courses}
            student={currentStudent}
            enrolledCourseIds={enrolledCourseIds}
            onRegister={handleRegister}
          />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {courses.map((course) => (
          <CourseCard
            key={course.courseId}
            course={course}
            student={currentStudent}
            enrolledAt={enrolledCourses[course.courseId]}
            isEnrolled={course.courseId in enrolledCourses}
            onCancel={handleCancel}
          />
        ))}
      </div>
    </div>
  );
}