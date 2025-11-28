import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../Header/Header";
import { API_URL } from "../../api";

function DetailPage() {
  const { id } = useParams(); // ✅ 컴포넌트 안에서 useParams 호출
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (!id) return <div><Header /><p>ID가 필요합니다.</p></div>;
  if (loading) return <div><Header /><p>로딩 중...</p></div>;
  if (!course) return <div><Header /><p>데이터 없음</p></div>;

  const courseDetails = Object.entries(course).filter(([key]) => key !== 'id');

  return (
    <div className="container detail-class-page">
      <Header />
      <h2>상세 페이지</h2>
      <p>강의 ID: {course.id}</p>
      <ul>
        {courseDetails.map(([key, value]) => (
          <li key={key}>
            {key}: {value}
          </li>
        ))}
      </ul>
      <button onClick={() => navigate("/list")}>목록으로 돌아가기</button>
      <button onClick={() => navigate(`/update/${course.id}`)}>수정 페이지로 이동</button>
    </div>
  );
}

export default DetailPage;
