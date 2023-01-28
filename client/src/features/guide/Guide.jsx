import React from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import ListGroup from "react-bootstrap/ListGroup";
import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { guideDetails } from "./guideContent";

export default function Guide() {
  const appDetails = (
    <Card style={{ width: "36rem" }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Introduction</Card.Title>
        <Card.Text>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Esse fugiat
          odio incidunt tempora minima eligendi, dignissimos rerum
          exercitationem similique amet voluptates ipsa eveniet tenetur cumque
          soluta totam repudiandae debitis perspiciatis.
        </Card.Text>
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

  const features = (feat, def, imp, tips, link) => (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>{feat}</Card.Title>
        {accordian(def, imp, tips)}
        <Link to={link.to}>
          <Button variant="primary">{`View your current ${link?.dir}`}</Button>
        </Link>
      </Card.Body>
    </Card>
  );
  const guide = guideDetails.map((g) =>
    features(g.feat, g.def, g.imp, g.tips, g.link)
  );

  return (
    <Stack gap={3}>
      {appDetails}
      {guide}
    </Stack>
  );
}
