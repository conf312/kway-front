import { useEffect, useState } from 'react';
import { Accordion  } from 'react-bootstrap';
import * as AxiosUtil from '../../lib/AxiosUtil';

function Faq() {
  const [faqList, setFaqList] = useState(null);
  
  useEffect(() => {
    let frm = new FormData();
    frm.append("type", "faq");

    AxiosUtil.send("GET", "/kway/support/list", frm, "", (e) => {
      console.log(e)
      const data = e.data;
      if (data !== undefined) {
        setFaqList(data);
      }
    });
  }, []);

  return (
    <>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Accordion Item #1</Accordion.Header>
          <Accordion.Body>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Accordion Item #2</Accordion.Header>
          <Accordion.Body>
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Accordion Item #3</Accordion.Header>
          <Accordion.Body>
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
}

export default Faq;