import {
    Card,
    Button,
    CardBody,
    CardTitle,
  } from "reactstrap";
  import { useState, useEffect } from "react";
  import { CardSubtitle, Table } from "reactstrap";
  import axios from "axios";
  import Swal from "sweetalert2";
  import { API_BASE_URL } from "../components/values/strings";
import { Api } from "../helper/Helper";
  
  const ApprovedLoan = (props) => {
    const [ApprovedLoans, setLoans] = useState([]);
    useEffect(() => {
      var user = {}
  
      if (localStorage.getItem('token') != '') {
        user = JSON.parse(localStorage.getItem('token'))
      }
     
      fetchData()
    }, []);
   const fetchData = async() => {
    var response = await Api('/credit/approved/loans','post',{})

    handleResponse(response)
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
            <CardTitle tag="h5">Approved Loans</CardTitle>
            {/* <CardSubtitle className="mb-2 text-muted" tag="h6">
              Loan  by Customers
            </CardSubtitle> */}
  
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
                  {/* <th>Action</th> */}
                </tr>
              </thead>
              <tbody>
                {ApprovedLoans.map((tdata, index) => (
                  <tr key={index} className="border-top">
                    <td>{index + 1}</td>
                    <td>{tdata.dailyRate}</td>
                    <td>{tdata.weeklyRate}</td>
                    <td>{tdata.monthlyRate}</td>
                    <td>{tdata.payPeriod}</td>
                    <td>{tdata.loanDeposit}</td>
                    <td>{tdata.unPaidDeposit}</td>
                    <td>{tdata.loanStatus}</td>
                    {/* <td>
                    <Button onc color='success'>Approve Loan</Button>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </div>
    );
  };
  
  export default ApprovedLoan;
  