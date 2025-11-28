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
  const [showCreateModal, setShowCreateModal] = useState(false);
  const navigate = useNavigate();

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      if (res.ok) setCourses(await res.json());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchCourses(); }, [fetchCourses]);

  const handleDelete = async (courseId) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    try {
      const res = await fetch(`${API_URL}/${courseId}`, { method: "DELETE" });
      if (res.ok) fetchCourses();
    } catch (err) { console.error(err); }
  };

  const handleViewDetail = (course) => navigate(`/detail/${course.id}`);
  const handleEdit = (course) => navigate(`/update/${course.id}`);

  return (
    <div className="container-fluid p-0">
      <Header />
      <h1>나의 수강 과목</h1>
      <Button className="mb-2" onClick={() => setShowCreateModal(true)}>+ 강의 추가</Button>
      <CourseTable
        courses={courses}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onViewDetail={handleViewDetail}
      />
      <CreateCourseModal
        show={showCreateModal}
        handleClose={() => setShowCreateModal(false)}
        fetchCourses={fetchCourses}
      />
    </div>
  );
}

export default ShowList;
