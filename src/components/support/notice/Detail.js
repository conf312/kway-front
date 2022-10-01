import { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import * as AxiosUtil from '../../../lib/AxiosUtil';

function NoticeDetail() {
  const params = useParams();
  const [title, setTitle] = useState(null);
  const [contents, setContents] = useState(null);

  useEffect(() => {
    AxiosUtil.send("GET", "/kway/support/detail?id=" + params.id, "", "", (e) => {
      const data = e.data;
      if (data !== undefined) {
        setTitle(data.title);
        setContents(data.contents);
      }
    });
  }, []);

  return (
    <>
     <div className="container-fluid">
        <h5 className="mt-3 ft-ckr-bold">공지사항</h5>
        <Form className="container-fluid mt-3">
          <Form.Group className="mb-3">
            <Form.Label className="ft-gm">제목</Form.Label>
            <Form.Control type="text" name="title" maxLength={100} value={title} disabled />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="ft-gm">내용</Form.Label>
              <Form.Control name="contents" maxLength={2000} value={contents} disabled 
              as="textarea"
              style={{ height: '300px' }}
            />
          </Form.Group>
          <Button href="/notice-list" variant="primary" className="w-100">목록</Button>
        </Form>
      </div>
    </>
  );
}

export default NoticeDetail;
