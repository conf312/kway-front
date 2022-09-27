import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import * as AxiosUtil from '../../../lib/AxiosUtil';

function NoticeList() {
  const [noticeList, setNoticeList] = useState([]);

  useEffect(() => {
    AxiosUtil.send("GET", "/kway/support/list?type=NOTICE", "", "", (e) => {
      console.log(e)
      const data = e.data.list;
      if (data !== undefined) {
        setNoticeList(data);
      }
    });
  }, []);

  function getDetail(id) {
    window.location.href = "/notice-detail/" + id;
  }

  return (
    <>
      <div className="container-fluid">
        <h5 className="mt-3 fw-bold">공지사항</h5>
        <Table className="mt-3" striped bordered hover>
          <thead>
            <tr>
              <th style={{width:"70%"}}>제목</th>
              <th>등록일</th>
            </tr>
          </thead>
          <tbody>
            {noticeList.map((data, idx) => (
              <tr className="cursor-pointer" key={idx} onClick={() => getDetail(data.id)}>
                <td>{data.title}</td>
                <td>{data.registerTime}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default NoticeList;