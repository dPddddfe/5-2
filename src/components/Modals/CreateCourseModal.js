// src/components/CourseTable/CourseTable.js

import React from "react";

// ✅ courses에 기본값 [] 할당 및 onEdit, onDelete props 유지
function CourseTable({ courses = [], loading, onEdit, onDelete }) {
  
  let tbodyContent;

  if (loading) {
    tbodyContent = (
      <tr>
        <td colSpan="9" className="text-center">Loading...</td>
      </tr>
    );
  } else if (courses.length === 0) {
    // ✅ 데이터가 없을 때의 메시지
    tbodyContent = (
      <tr>
        <td colSpan="9" className="text-center">표시할 데이터가 없습니다.</td>
      </tr>
    );
  } else {
    // ✅ 데이터가 있을 때 목록을 매핑
    tbodyContent = courses.map(course => (
      <tr key={course.id}>
        <td>{course.name}</td>
        <td>{course.code}</td>
        <td>{course.professor}</td>
        <td>{course.major}</td>
        <td>{course.credits}</td>
        <td>{course.place}</td>
        <td>{course.time}</td>
        <td>{course.grade}</td>
        <td>
          <button
            className="btn btn-sm btn-success me-2"
            onClick={() => onEdit(course)}
          >수정</button>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => onDelete(course.id)}
          >삭제</button>
        </td>
      </tr>
    ));
  }

  return (
    <div className="table-responsive">
      <table className="table table-hover">
        <thead>
          <tr>
            <th>과목명</th>
            <th>과목 코드</th>
            <th>담당 교수</th>
            <th>개설 학부</th>
            <th>학점</th>
            <th>강의 장소</th>
            <th>강의 시간</th>
            <th>성적</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          {/* ✅ 최종적으로 계산된 내용만 렌더링 */}
          {tbodyContent} 
        </tbody>
      </table>
    </div>
  );
}

export default CourseTable;