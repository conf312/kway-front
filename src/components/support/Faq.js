import { useEffect, useState } from 'react';
import { Accordion  } from 'react-bootstrap';
import * as AxiosUtil from '../../lib/AxiosUtil';

function Faq() {
  const [faqList, setFaqList] = useState([]);
  
  useEffect(() => {
    AxiosUtil.send("GET", "/kway/support/list?type=FAQ", "", "", (e) => {
      console.log(e)
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
            <Accordion.Header>{data.title}</Accordion.Header>
            <Accordion.Body>{data.contents}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </>
  );
}

export default Faq;