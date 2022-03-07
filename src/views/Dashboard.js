import { Col, Row, Card, CardTitle, CardBody,CardText} from "reactstrap";


const Dashboard = () => {
  return (
    <div>
      <Row>
        <Col>
          <Card>
            <CardTitle tag="h3" className="border-bottom p-3 mb-0">
              Dashboard
            </CardTitle>
            <CardBody className="">
              <CardText>
                Hello World!!!
              </CardText>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
