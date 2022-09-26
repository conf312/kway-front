import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import * as AxiosUtil from '../../lib/AxiosUtil';

function Notice() {
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

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th style={{width:"70%"}}>제목</th>
            <th>등록일</th>
          </tr>
        </thead>
        <tbody>
          {noticeList.map((data, idx) => (
            <tr key={idx}>
              <td>{data.title}</td>
              <td>{data.registerTime}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default Notice;