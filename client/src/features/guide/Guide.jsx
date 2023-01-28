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
import { guideDetails, introDetails } from "./guideContent";

export default function Guide() {
  
  const popover = (obj, int) => (
    <Popover id="popover-basic">
      <Popover.Body>
        {obj.text}
        <a href={obj.ref}>
          <sup>[{int}]</sup>
        </a>
      </Popover.Body>
    </Popover>
  );

  const Info = () => (
    <div style={{ display: "flex", justifyContent: "space-evenly" }}>
      <OverlayTrigger
        trigger="click"
        placement="bottom"
        overlay={popover(introDetails.income, 1)}
      >
        <Button className="text-white bg-secondary" variant="success">
          Income
        </Button>
      </OverlayTrigger>
      <OverlayTrigger
        trigger="click"
        placement="bottom"
        overlay={popover(introDetails.savings, 2)}
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
        <Card.Text className="text-white">{introDetails.text}</Card.Text>
        <Info />
      </Card.Body>
    </Card>
  );

  const accordian = (def, imp, tips, idx, ref) => (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Definition</Accordion.Header>
        <Accordion.Body>
          <span>
            {def}
            <a href={ref}>
              <sup>[{idx + 3}]</sup>
            </a>
          </span>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Importance</Accordion.Header>
        <Accordion.Body>{imp}</Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>Resources</Accordion.Header>
        <Accordion.Body>
          <ListGroup>
            {tips?.map((t, idx) => (
              <ListGroup.Item>
                <a target="_blank" href={t}>
                  Article #{idx + 1}{" "}
                </a>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );

  const features = (feat, def, imp, tips, link, style, idx, ref) => (
    <Col xs={12} md={6} style={{ padding: "calc(var(--bs-gutter-x) * 0.5)" }}>
      <Card>
        <Card.Body className={style}>
          <Card.Title className="text-white">{feat}</Card.Title>
          {accordian(def, imp, tips, idx, ref)}
          <Link to={link.to}>
            <Button
              className="bg-secondary"
              variant="primary"
              style={{ marginTop: "var(--bs-card-title-spacer-y)" }}
            >{`View your ${link.dir}`}</Button>
          </Link>
        </Card.Body>
      </Card>
    </Col>
  );

  const guide = guideDetails.map((g, idx) =>
    features(g.feat, g.def, g.imp, g.tips, g.link, g.style, idx, g.ref)
  );

  const References = (
    <Card className="bg-secondary">
      <Card.Body>
        <Card.Title className="text-white">References</Card.Title>

        <ListGroup>
          <ListGroup.Item>
            {1}. {introDetails.income.ref}
          </ListGroup.Item>

          <ListGroup.Item>
            {2}. {introDetails.savings.ref}
          </ListGroup.Item>

          {guideDetails.map((g, idx) => (
            <ListGroup.Item>
              {idx + 3}. {g.ref}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );

  return (
    <Container fluid>
      <div style={{ paddingTop: "calc(var(--bs-gutter-x) * 0.5)" }}>
        {appDetails}
      </div>
      <Row>{guide}</Row>
      {References}
    </Container>
  );
}
