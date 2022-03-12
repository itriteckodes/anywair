import {
  Card,
  Row,
  Col,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  CardTitle,
} from "reactstrap";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { API_BASE_URL } from "../components/values/strings";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  
 const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      "email": formData.email,
      "password": formData.password,
  };

 axios.post(API_BASE_URL + '/admin/auth/login', data, {
    headers: {
        'Content-Type': 'application/json',
        'accept':'*/*'
    }
}).then(
      response => {
        if (response.data.title === 'success') {
        Swal.fire({
          title: 'Success!',
          text: response.data.message,
          icon: 'success',
          confirmButtonText: 'ok'
      });
      
      localStorage.setItem('token',JSON.stringify(response.data.data));

      navigate('/starter', true);

    }else{
        Swal.fire({
          title: 'Error!',
          text:  response.data.message,
          icon: 'error',
      });
      }
        
        },
      )
  .catch(error => {
      Swal.fire({
        title: 'Error!',
        text:  'Error',
        icon: 'error',
    });
    
  });

}

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
                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label for="exampleEmail">Email</Label>
                    <Input
                      id="exampleEmail"
                      name="email"
                      placeholder="Please Enter Email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}

                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="examplePassword">Password</Label>
                    <Input
                      id="examplePassword"
                      name="password"
                      placeholder="Enter Password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      
                    />
                  </FormGroup>
                  
                  <Input type="submit" value="Submit" name="Submit" placeholder="" />
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
