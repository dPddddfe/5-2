// src/components/Pages/DetailPage.js

import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import { API_URL } from "../../api"; // ✅ 경로 수정됨
import { useParams } from "react-router-dom";
const { id } = useParams();


function DetailPage() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id'); // 쿼리 파라미터에서 ID 가져오기
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  // 강의 정보 불러오기
  const fetchCourse = useCallback(async () => {
    if (!id) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/${id}`);
      if (res.ok) {
        const data = await res.json();
        setCourse(data);
      } else {
        alert("강의 정보를 찾을 수 없습니다.");
        navigate("/list");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [id, navigate]);

  useEffect(() => {
    fetchCourse();
  }, [fetchCourse]);

  if (!id) { /* ... (ID 없음 UI 생략) */ }
  if (loading) { /* ... (로딩 중 UI 생략) */ }
  if (!course) { /* ... (데이터 없음 UI 생략) */ }
  
  if (!id) {
    return (
      <div className="container detail-class-page">
        <Header />
        <h2>상세 페이지</h2>
        <p>상세 정보를 보려면 강의 ID가 필요합니다. 목록에서 선택해주세요.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container detail-class-page">
        <Header />
        <h2>상세 페이지</h2>
        <p>강의 정보 로딩 중...</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="container detail-class-page">
        <Header />
        <h2>상세 페이지</h2>
        <p>강의 정보를 불러오는 데 실패했습니다.</p>
      </div>
    );
  }


  // 강의 정보의 키-값 쌍을 배열로 변환
  const courseDetails = Object.entries(course).filter(([key]) => key !== 'id');

  return (
    <div className="container detail-class-page">
      <Header />
      <h2>상세 페이지</h2>
      <p>강의 ID: {course.id}</p>
      
      <div className="detail-info mt-4 text-start">
        <h3 className="name mb-4">{course.name}</h3>

        <ul className="list-unstyled custom-form">
          {courseDetails.map(([key, value]) => (
            <li className="form-group mb-3" key={key}>
              <span className="Qua me-3">{key.charAt(0).toUpperCase() + key.slice(1)}:</span>
              <span className="ans">{value}</span>
            </li>
          ))}
        </ul>

        <div className="d-flex justify-content-center mt-5">
          <button className="btn btn-secondary me-2" onClick={() => navigate("/list")}>
            목록으로 돌아가기
          </button>
          <button className="btn btn-success" onClick={() => navigate(`/update?id=${course.id}`)}>
            수정 페이지로 이동
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetailPage;