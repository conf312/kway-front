import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import * as AxiosUtil from '../../lib/AxiosUtil';

function Notice() {
  const [noticeList, setNoticeList] = useState(null);

  useEffect(() => {
    let frm = new FormData();
    frm.append("type", "notice");

    AxiosUtil.send("GET", "/kway/support/list", frm, "", (e) => {
      console.log(e)
      const data = e.data;
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
          <tr>
            <td>Mark</td>
            <td>Otto</td>
          </tr>
          <tr>
            <td>Jacob</td>
            <td>Thornton</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

export default Notice;