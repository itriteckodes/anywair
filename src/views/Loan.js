import {
  Card,
  Button,
  CardBody,
  CardTitle,
} from "reactstrap";
import { useState, useEffect,useRef, useCallback} from "react";
import { CardSubtitle, Table } from "reactstrap";

import axios from "axios";
import Swal from "sweetalert2";
import { API_BASE_URL } from "../components/values/strings";

const Loan = () => {
  const [PendingLoans, setLoans] = useState([]);
   const [isSending, setIsSending] = useState(false)
   const isMounted = useRef(true)

   const sendRequest = useCallback(async (type,loanId) => {
     console.log(loanId);
     if(type ==  'approve')
    var API_URL = API_BASE_URL + '/credit/approve/loan/request/' + loanId.toString();
    else
    var API_URL = API_BASE_URL + '/credit/view/loan/' + loanId.toString();

    if (isSending) return
    setIsSending(true)
    // send the actual request
    axios.get(API_URL,{
      headers: {
        'Content-Type': 'application/json',
        'accept': '*/*',
        'Authorization': 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhbnl3YWlyX3N0YWZmIiwicm9sZSI6IkNSRURJVF9PRkZJQ0VSIiwibmFtZSI6IkNSRURJVCBPRkZJQ0VSIiwiaXNzIjoiQW55d2FpciBHcm91cCIsImlkIjoiMTI0NjMwZWItMWFmYi00ZTg3LTkyM2MtZDk1OTVjZGE1YzZlIiwiZXhwIjoxNjQ3MjcyMTY5LCJpYXQiOjE2NDcxODU3NjksImVtYWlsIjoiY3JlZGl0QGFueXdhaXIuY29tIn0.NQPwpukdW86mEhofa9ikImnr_d9XRVtrMDBTAHkleQs'
      }
    }).then(
      response => {
        if (response.data.title === 'success') {
          console.log(response);
          handleResponse(response.data.data);
        } else {
          console.log(response.data);
          Swal.fire({
            title: 'Error!',
            text: response.data.message,
            icon: 'error',
          });
        }
      },
    )
    // once the request is sent, update state again
    if (isMounted.current) // only update if we are still mounted
      setIsSending(false)
  }, [isSending]) 
  useEffect(() => {
    var user = {}

    if (localStorage.getItem('token') != '') {
      user = JSON.parse(localStorage.getItem('token'))
    }
    fetchData();
  }, []);
  const fetchData = async () => {

    axios.post(API_BASE_URL + '/credit/pending/loans', {}, {
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
  const handleResponse = (loans) => {
    const mrows = [];
    for (var i = 0; i < loans.length; i++) {
      mrows.push(createData(loans[i].loanId, loans[i].dailyRate, loans[i].weeklyRate, loans[i].monthlyRate, loans[i].payablePeriod, loans[i].loanDeposit, loans[i].unPaidDeposit, loans[i].loanStatus));
    }
    setLoans(mrows);

  }
  function createData(loanId, dailyRate, weeklyRate, monthlyRate, payPeriod, loanDeposit, unPaidDeposit, loanStatus) {
    return { loanId, dailyRate, weeklyRate, monthlyRate, payPeriod, loanDeposit, unPaidDeposit, loanStatus };
  }


  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">Loans Requests</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            Loan Request applied by Customers
          </CardSubtitle>

          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>Sr no</th>
                <th>Daily Rate</th>

                <th>Weekly Rate</th>
                <th>Monthly Rate</th>
                <th>Payable Period</th>
                <th>Loan Deposit</th>
                <th>Unpaid Deposit</th>
                <th>Loan Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {PendingLoans.map((tdata, index) => (
                <tr key={index} className="border-top">
                  <td>{index + 1}</td>
                  <td>{tdata.dailyRate}</td>
                  <td>{tdata.weeklyRate}</td>
                  <td>{tdata.monthlyRate}</td>
                  <td>{tdata.payPeriod}</td>
                  <td>{tdata.loanDeposit}</td>
                  <td>{tdata.unPaidDeposit}</td>
                  <td>{tdata.loanStatus}</td>
                  <td>
                  <Button  color='success' disabled={isSending} onClick={() => sendRequest('approve',tdata.loanId)}>Approve Loan</Button>
                  <Button  className='m-2' color='primary' disabled={isSending} onClick={() => sendRequest('view',tdata.loanId)}>View</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default Loan;
