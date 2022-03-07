import {
  Card,
  Row,
  Col,
  CardBody,
//   Button,
  Form,
  FormGroup,
  Label,
  Input,
  CardTitle,
 
} from "reactstrap";
import { Link } from "react-router-dom";


const Login = () => {
  return (
    <Row className="mt-5">
      <Col lg="4"></Col>
      <Col lg="4">
        <Card>
          <CardTitle tag="h5" className="text-center mt-3">
         
            Login To Admin Dashboard
          </CardTitle>
          <CardBody className="p-8">
            <Row justify-content>
              <Col lg="12">
                <Form >
                  <FormGroup>
                    <Label for="exampleEmail">Email</Label>
                    <Input
                      id="exampleEmail"
                      name="email"
                      placeholder="Please Enter Email"
                      type="email"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="examplePassword">Password</Label>
                    <Input
                      id="examplePassword"
                      name="password"
                      placeholder="Enter Password"
                      type="password"
                    />
                  </FormGroup>

                  <Link to={'/'}  className="btn btn-primary">Submit</Link>
                </Form>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
      <Col lg="4"></Col>
    </Row>
  );
};

export default Login;
