// src/components/Pages/ShowList.js

import React, { useState, useEffect, useCallback } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import CourseTable from "../CourseTable/CourseTable";
import CreateCourseModal from "../Modals/CreateCourseModal";
import { API_URL } from "../../api"; // ✅ 경로 수정됨


function ShowList() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const navigate = useNavigate(); 
  
  // (fetchCourses, handleDelete 함수 생략 - 이전과 동일)

  // 강의 목록 불러오기 (이전 코드 재사용)
  const fetchCourses = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      if (res.ok) {
        const data = await res.json();
        setCourses(data);
      } else throw new Error("Failed to fetch courses");
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
    if (!window.confirm("정말로 이 강의 정보를 삭제하시겠습니까?")) return;
    try {
      const res = await fetch(`${API_URL}/${courseId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        alert("강의 정보가 삭제되었습니다!");
        fetchCourses(); 
      } else throw new Error("Failed to delete");
    } catch (err) {
      console.error(err);
    }
  };


  const handleEdit = (course) => {
    navigate(`/update/${course.id}`);
  };
  
  const handleDetail = (course) => {
    navigate(`/detail/${course.id}`);
  };
  

  return (
    <div className="container-fluid p-0">
      
      <div className="top-header-banner">
        <h1>나의 수강 과목 📚</h1>
        <p>2025학년도 수강 과목들을 확인하고 관리하세요</p>
      </div>

      <div className="container">
        <Header /> 
      </div>

      <div className="container"> 
        
        <h2 className="course-list-title">수강 과목</h2> 
      
        <div className="d-flex justify-content-end mb-3">
          <Button variant="primary" onClick={() => setShowCreateModal(true)}>
            + 강의 추가
          </Button>
        </div>

        <CourseTable 
          courses={courses} 
          loading={loading} 
          onEdit={handleEdit}
          onDelete={handleDelete}
          onViewDetail={handleViewDetail} // ✅ 상세 보기 핸들러 전달
        />
        
        <CreateCourseModal
          show={showCreateModal}
          handleClose={() => setShowCreateModal(false)}
          fetchCourses={fetchCourses}
        />
      </div>
    </div>
  );
}

export default ShowList;