import React from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import { guideDetails } from "./guideContent";

export default function Guide() {
  const income =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, ipsam impedit? Soluta sint, quasi vero temporibus eaque molestiae corporis, maxime expedita a maiores accusantium vel non iste sequi, dolores blanditiis!";
  const savings =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, ipsam impedit? Soluta sint, quasi vero temporibus eaque molestiae corporis, maxime expedita a maiores accusantium vel non iste sequi, dolores blanditiis!";
  const popover = (str) => (
    <Popover id="popover-basic">
      <Popover.Body>{str}</Popover.Body>
    </Popover>
  );

  const Info = () => (
    <div style={{ display: "flex", justifyContent: "space-evenly" }}>
      <OverlayTrigger
        trigger="click"
        placement="bottom"
        overlay={popover(income)}
      >
        <Button className="text-white bg-secondary" variant="success">
          Income
        </Button>
      </OverlayTrigger>
      <OverlayTrigger
        trigger="click"
        placement="bottom"
        overlay={popover(savings)}
      >
        <Button className="text-white bg-secondary" variant="success">
          Savings
        </Button>
      </OverlayTrigger>
    </div>
  );
  const appDetails = (
    <Card className="bg-info">
      <Card.Body>
        <Card.Title className="text-white">Introduction</Card.Title>
        <Card.Text className="text-white">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Esse fugiat
          odio incidunt tempora minima eligendi, dignissimos rerum
          exercitationem similique amet voluptates ipsa eveniet tenetur cumque
          soluta totam repudiandae debitis perspiciatis.
        </Card.Text>
        <Info />
      </Card.Body>
    </Card>
  );

  const accordian = (def, imp, tips) => (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Definition</Accordion.Header>
        <Accordion.Body>{def}</Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Importance</Accordion.Header>
        <Accordion.Body>{imp}</Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>Tips</Accordion.Header>
        <Accordion.Body>
          <ListGroup>
            {tips?.map((t, idx) => (
              <ListGroup.Item>
                {idx + 1}. {t}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );

  const features = (feat, def, imp, tips, link, style) => (
    <Col xs={6} style={{ padding: "calc(var(--bs-gutter-x) * 0.5)" }}>
      <Card>
        <Card.Body className={style}>
          <Card.Title className="text-white">{feat}</Card.Title>
          {accordian(def, imp, tips)}
          <Link to={link.to}>
            <Button
              className="bg-secondary"
              variant="primary"
            >{`View your ${link?.dir}`}</Button>
          </Link>
        </Card.Body>
      </Card>
    </Col>
  );

  const guide = guideDetails.map((g) =>
    features(g.feat, g.def, g.imp, g.tips, g.link, g.style)
  );

  return (
    <>
      <Container fluid>
        {appDetails}
        <Row>{guide}</Row>
      </Container>
    </>
  );
}
