import React, { useState, useEffect, useCallback } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import CourseTable from "../CourseTable/CourseTable";
import CreateCourseModal from "../Modals/CreateCourseModal";
import { API_URL } from "../../api";

function ShowList() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editCourse, setEditCourse] = useState(null); // 수정 대상
  const navigate = useNavigate();

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      if (res.ok) {
        const data = await res.json();
        setCourses(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const handleDelete = async (courseId) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    try {
      const res = await fetch(`${API_URL}/${courseId}`, { method: "DELETE" });
      if (res.ok) fetchCourses();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (course) => {
    setEditCourse(course); // 수정할 데이터 저장
    setShowModal(true);
  };

  const handleViewDetail = (course) => {
    navigate(`/detail/${course.id}`);
  };

  return (
    <div className="container-fluid p-0">
      <Header />
      <h1>나의 수강 과목</h1>
      <Button className="mb-3" onClick={() => { setEditCourse(null); setShowModal(true); }}>
        + 강의 추가
      </Button>

      <CourseTable
        courses={courses}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onViewDetail={handleViewDetail}
      />

      <CreateCourseModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        fetchCourses={fetchCourses}
        editCourse={editCourse} // 수정 대상 전달
      />
    </div>
  );
}

export default ShowList;
