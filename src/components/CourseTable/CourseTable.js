// src/components/CourseTable/CourseTable.js

import React from "react";

function CourseTable({ courses, loading, onEdit, onDelete, onViewDetail }) {
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
          {loading && (
            <tr><td colSpan="9" className="text-center">Loading...</td></tr>
          )}
          {!loading && courses.length === 0 && (
            <tr><td colSpan="9" className="text-center">표시할 데이터가 없습니다.</td></tr>
          )}
          {!loading && courses.map(course => (
            <tr key={course.id}>
              <td data-label="과목명">
              <td data-label="과목명">
                <button 
                  type="button"
                  onClick={() => onViewDetail(course)}
                  className="btn btn-link p-0 text-decoration-none"
                >
                  {course.name}
                </button>
              </td>
              </td>
              <td data-label="과목 코드">{course.code}</td>
              <td data-label="담당 교수">{course.professor}</td>
              <td data-label="개설 학부">{course.major}</td>
              <td data-label="학점">{course.credits}</td>
              <td data-label="강의 장소">{course.place}</td>
              <td data-label="강의 시간">{course.time}</td>
              <td data-label="성적">{course.grade}</td>
              <td data-label="관리">
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
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CourseTable;