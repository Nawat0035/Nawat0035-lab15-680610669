import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { Course, Student } from "@/lib/types";

type RegisterDialogProps = {
  courses: Course[];
  student: Student;
  enrolledCourseIds: string[];
  onRegister: (courseId: string, time: string) => void;
};

function getCurrentTime() {
  const now = new Date();

  return `${String(now.getHours()).padStart(2, "0")}:${String(
    now.getMinutes()
  ).padStart(2, "0")}`;
}

export function RegisterDialog({
  courses,
  student,
  enrolledCourseIds,
  onRegister,
}: RegisterDialogProps) {
  const [open, setOpen] = useState(false);
  const [courseId, setCourseId] = useState("");
  const [time, setTime] = useState(getCurrentTime());

  // แสดงเฉพาะวิชาที่ยังไม่ได้ลงทะเบียน
  const availableCourses = courses.filter(
    (course) => !enrolledCourseIds.includes(course.courseId)
  );

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!courseId) return;

    onRegister(courseId, time);

    setCourseId("");
    setTime(getCurrentTime());
    setOpen(false);
  }

  function handleOpen(value: boolean) {
    setOpen(value);

    if (value) {
      setTime(getCurrentTime());
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogTrigger>
        <Button>ลงทะเบียน</Button>
      </DialogTrigger>

      <DialogContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>ลงทะเบียนรายวิชา</DialogTitle>

            <DialogDescription>
              กรอกข้อมูลเพื่อลงทะเบียน
            </DialogDescription>
          </DialogHeader>

          {/* วิชา */}
          <div className="space-y-2">
            <Label>วิชา</Label>

            <Select
              value={courseId}
              onValueChange={(value) => setCourseId(value ?? "")}
            >
              <SelectTrigger>
                <SelectValue placeholder="เลือกวิชา" />
              </SelectTrigger>

              <SelectContent>
                {availableCourses.map((course) => (
                  <SelectItem
                    key={course.courseId}
                    value={course.courseId}
                  >
                    {course.courseId} - {course.courseTitle}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* เวลา */}
          <div className="space-y-2">
            <Label htmlFor="time">
              เลือกเวลา
            </Label>

            <Input
              id="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>

          {/* ชื่อนักศึกษา */}
          <div className="space-y-2">
            <Label htmlFor="studentName">
              ชื่อ นศ.
            </Label>

            <Input
              id="studentName"
              value={`${student.firstName} ${student.lastName}`}
              readOnly
            />
          </div>

          {/* โปรแกรม */}
          <div className="space-y-2">
            <Label htmlFor="program">
              โปรแกรม
            </Label>

            <Input
              id="program"
              value={student.program}
              readOnly
            />
          </div>

          {/* ปุ่มยืนยัน */}
          <DialogFooter>
            <Button
              type="submit"
              disabled={!courseId}
            >
              ยืนยันการลงทะเบียน
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}