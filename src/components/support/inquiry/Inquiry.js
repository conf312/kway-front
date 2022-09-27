import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import * as AxiosUtil from '../../../lib/AxiosUtil';
import ReCAPTCHA from 'react-google-recaptcha';

function Inquiry() {
  const [validated, setValidated] = useState(false);
  const [recaptchaValue, setRecaptchaValue] = useState(false);
  const onChangeRecaptcha = (value) => {
    setRecaptchaValue(value);
  }
  const handleSubmit = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setValidated(true);

    const form = event.currentTarget;
    const formData = new FormData(form);

    if (form.checkValidity()) {
      if (!recaptchaValue) {
        alert("Please check recaptcha.");
        return false;
      }

      formData.append("recaptchaValue", recaptchaValue);
      AxiosUtil.send("POST", "/kway/inquiry/save", formData, "", (e) => {
        if (e.data > 0) {
          alert("성공적으로 제출되었습니다.");
          window.location.href = "/";
        } else {
          alert("오류가 발생하였습니다.\n잠시후에 다시 시도해주세요.");
        }
      });
    }
  };

  return (
    <>
      <Form className="container-fluid mt-3" noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
        <Form.Label>종류</Form.Label>
          <Form.Select name="type">
            <option value="SERVICE">서비스</option>
            <option value="QUESTION">건의 및 개선</option>
            <option value="ERROR">오류</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>이메일</Form.Label>
          <Form.Control type="email" name="email" placeholder="이메일을 작성해주세요." maxLength={100} required/>
          <Form.Control.Feedback type="invalid">
            이메일을 작성해주세요.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>제목</Form.Label>
          <Form.Control type="text" name="title" placeholder="제목을 작성해주세요." maxLength={100} required/>
          <Form.Control.Feedback type="invalid">
            제목을 작성해주세요.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>내용</Form.Label>
            <Form.Control name="contents" maxLength={2000} required
            as="textarea"
            placeholder="내용을 작성해주세요."
            style={{ height: '100px' }}
          />
          <Form.Control.Feedback type="invalid">
            내용을 작성해주세요.
          </Form.Control.Feedback>
        </Form.Group>
        <ReCAPTCHA
          className="mt-3"
          onChange={onChangeRecaptcha}
          sitekey={process.env.REACT_APP_RECAPTCHA_KEY}
        />
        <Button className="mt-3 w-100" variant="primary" type="submit">제출</Button>
      </Form>
    </>
  );
}

export default Inquiry;