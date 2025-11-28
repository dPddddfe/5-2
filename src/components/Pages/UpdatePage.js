// src/components/Pages/UpdatePage.js

import React, { useState, useEffect, useCallback, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import { API_URL } from "../../api"; // 경로 수정: Pages 폴더 기준
import { useParams } from "react-router-dom";
const { id } = useParams();


function UpdatePage() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const navigate = useNavigate();
  // 1. useState를 활용하여 폼 데이터 관리
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  
  // 2. useRef를 활용하여 수정 횟수 카운트 및 유효성 검사
  const editCountRef = useRef(0);
  const inputRefs = useRef({}); // useRef로 input 참조를 관리 (유효성 체크용)

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
        setFormData(data);
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

  // input 값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    // 3. useState로 즉각 값 반영
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // 4. useRef를 이용한 유효성 체크 예시
    if (name !== 'grade' && !value) {
      inputRefs.current[name].style.border = '2px solid red';
    } else {
      inputRefs.current[name].style.border = '1px solid #ced4da';
    }
  };

  // 5. 즉각 반영 (onChange 시 PUT API 호출)
  useEffect(() => {
    // 폼 데이터 로딩 완료 후, 그리고 ID가 있을 때만 실행
    if (Object.keys(formData).length > 0 && id) {
      // 컴포넌트 마운트 시 최초 실행 방지
      const isInitialMount = editCountRef.current === 0;

      // 최초 로딩 시에는 API 호출을 건너뛰고, 이후 변경만 감지
      if (isInitialMount) {
        editCountRef.current = 1; // 1로 설정하여 다음 변경부터 카운트 시작
        return;
      }

      // 6. PUT API 호출 (즉각 반영)
      const updateData = async () => {
        // 필수 값 유효성 체크 (grade는 제외)
        const isValid = Object.keys(formData).every(key => key === 'grade' || key === 'id' || formData[key]);
        
        if (!isValid) {
            console.warn("필수 항목이 비어 있어 API 호출을 건너뜁니다.");
            return;
        }

        try {
          const res = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...formData, credits: Number(formData.credits) }),
          });

          if (res.ok) {
            // 7. 수정 횟수 카운트
            editCountRef.current = editCountRef.current + 1;
            console.log(`수정 성공! 현재 수정 횟수: ${editCountRef.current - 1}`);
          } else {
            console.error("Failed to update immediately");
          }
        } catch (err) {
          console.error("API 호출 오류:", err);
        }
      };

      // 디바운싱 없이 바로 호출 (요구사항대로 즉각 반영)
      updateData();
    }
  }, [formData, id]); // formData가 변경될 때마다 실행

  if (!id) return (<div className="container add-class-page"><Header /><h2>강의 정보 수정</h2><p>수정할 강의 ID가 필요합니다.</p></div>);
  if (loading) return (<div className="container add-class-page"><Header /><h2>강의 정보 수정 중...</h2></div>);

  const formKeys = Object.keys(formData).filter(key => key !== "id");

  return (
    <div className="container add-class-page">
      <Header />
      <h2>🔄 강의 수정</h2>
      
      {/* 8. 총 수정 횟수 표시 */}
      <p className="edit-counter">페이지 로딩 이후 총 수정 횟수: **{editCountRef.current > 0 ? editCountRef.current - 1 : 0}**회</p>
      
      <form className="custom-form">
        {formKeys.map(key => (
          <div className="form-group mb-2" key={key}>
            <label>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
            <input
              type={key === "credits" ? "number" : "text"}
              className="form-control"
              name={key}
              value={formData[key] || ""} 
              onChange={handleChange}
              step={key === "credits" ? "0.5" : undefined}
              required={key !== "grade"}
              // 9. inputRefs를 사용하여 input 태그 참조
              ref={el => inputRefs.current[key] = el}
            />
          </div>
        ))}
        
        <p className="text-danger mt-3">**주의: 이 페이지는 수정 완료 버튼 없이, 입력할 때마다 즉시 서버에 반영됩니다.**</p>
      </form>

    </div>
  );
}

export default UpdatePage;