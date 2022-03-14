import { Button,Col, Row, Card, CardTitle, CardBody, CardText } from "reactstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { API_BASE_URL } from "../components/values/strings";

const Dashboard = (props) => {
  const [Dashboard, setValues] = useState([]);

  useEffect(() => {
    var user = {}

    if (localStorage.getItem('token') != '') {
      user = JSON.parse(localStorage.getItem('token'))
    }
    fetchData();
  }, []);
  const fetchData = async () => {
  
    axios.post(API_BASE_URL + '/credit/officer/dashboard', {}, {
      headers: {
        'Content-Type': 'application/json',
        'accept': '*/*',
        'Authorization': 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhbnl3YWlyX3N0YWZmIiwicm9sZSI6IkNSRURJVF9PRkZJQ0VSIiwibmFtZSI6IkNSRURJVCBPRkZJQ0VSIiwiaXNzIjoiQW55d2FpciBHcm91cCIsImlkIjoiMTI0NjMwZWItMWFmYi00ZTg3LTkyM2MtZDk1OTVjZGE1YzZlIiwiZXhwIjoxNjQ3MjcyMTY5LCJpYXQiOjE2NDcxODU3NjksImVtYWlsIjoiY3JlZGl0QGFueXdhaXIuY29tIn0.NQPwpukdW86mEhofa9ikImnr_d9XRVtrMDBTAHkleQs'
      }
    }).then(
      response => {
        if (response.data.title === 'success') {
          handleResponse(response.data.data);
        } else {
          Swal.fire({
            title: 'Error!',
            text: response.data.message,
            icon: 'error',
          });
        }
      },
    )
  }
  const handleResponse = (response) => {
    setValues(response)

  }

  return (
    <div>
      <Row>
        <Col>
          <Card>
            <CardTitle tag="h3" className="border-bottom p-3 mb-0">
              Dashboard
            </CardTitle>
            <CardBody className="">
              <Row>
              <Col md="4" >
                <Card body color="primary" inverse>
                  <CardTitle tag="h5">Pending Approval</CardTitle>
                  <CardText>
                   {Dashboard.countOfPendingApprovals}
                  </CardText>
                 
                </Card>
              </Col>
              <Col md="4" >
                <Card body color="info" inverse>
                  <CardTitle tag="h5">Active Loans</CardTitle>
                  <CardText>
                    {Dashboard.countOfActiveLoans}
                  </CardText>
                 
                </Card>
              </Col>
              <Col md="4">
                <Card body color="danger" inverse>
                  <CardTitle tag="h5">Defaulter</CardTitle>
                  <CardText>
                    {Dashboard.countOfDefaulters}
                  </CardText>
                 
                </Card>
              </Col>
           
              </Row>
              <Row>
              <Col md="4" >
                <Card body color="primary" inverse>
                  <CardTitle tag="h5">Repayment Weekly</CardTitle>
                  <CardText>
                   {Dashboard.totalRepaymentWeekly}
                  </CardText>
                 
                </Card>
              </Col>
              <Col md="4" >
                <Card body color="info" inverse>
                  <CardTitle tag="h5">Repayment Monthly</CardTitle>
                  <CardText>
                    {Dashboard.totalRepaymentMonthly}
                  </CardText>
                 
                </Card>
              </Col>
          
           
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
