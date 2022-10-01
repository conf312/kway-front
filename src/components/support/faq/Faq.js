import { useEffect, useState } from 'react';
import { Accordion  } from 'react-bootstrap';
import * as AxiosUtil from '../../../lib/AxiosUtil';

function Faq() {
  const [faqList, setFaqList] = useState([]);
  
  useEffect(() => {
    AxiosUtil.send("GET", "/kway/support/list?type=FAQ", "", "", (e) => {
      const data = e.data.list;
      if (data !== undefined) {
        setFaqList(data);
      }
    });
  }, []);

  return (
    <>
      <Accordion>
        {faqList.map((data, idx) => (
          <Accordion.Item eventKey={idx}>
            <Accordion.Header className="ft-ckr-bold">{data.title}</Accordion.Header>
            <Accordion.Body className="ft-gm">{data.contents}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </>
  );
}

export default Faq;