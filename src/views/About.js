import DataTable from "react-data-table-component";
import { Row, Col, Card, CardBody, CardTitle, Button } from "reactstrap";
import { useState, useEffect, useMemo } from "react";
import styled from "styled-components";

const About = () => {
  // var dt = require( 'datatables.net' )();
  const data = [
    { id: 1, title: "DataTable in ReactJS", year: "2021" },
    { id: 1, title: "DataTable in y", year: "2021" },
    { id: 1, title: "DataTable in ReactJS", year: "2021" },
    { id: 1, title: "DataTable in ReactJS", year: "2021" },
    { id: 1, title: "DataTable in ReactJS", year: "2021" },
    { id: 1, title: "DataTable in ReactJS", year: "2021" },
    { id: 1, title: "DataTable in ReactJS", year: "2021" },
    { id: 1, title: "DataTable in ReactJS", year: "2021" },
    { id: 1, title: "DataTable in ReactJS", year: "2021" },
    { id: 1, title: "DataTable in ReactJS", year: "2021" },
    { id: 1, title: "DataTable in ReactJS", year: "2021" },
    { id: 1, title: "DataTable in ReactJS", year: "2021" },
    { id: 1, title: "DataTable in ReactJS", year: "2021" },
    { id: 1, title: "DataTable in ReactJS", year: "2021" },
    { id: 1, title: "DataTable in ReactJS", year: "2021" },
    { id: 1, title: "DataTable in ReactJS", year: "2021" },
    { id: 1, title: "DataTable in ReactJS", year: "2021" },
    { id: 1, title: "DataTable in ReactJS", year: "2021" },
    { id: 1, title: "DataTable in ReactJS", year: "2021" },
    { id: 1, title: "DataTable in ReactJS", year: "2021" },
    { id: 1, title: "DataTable in ReactJS", year: "2021" },
    { id: 1, title: "DataTable in ReactJS", year: "2021" },
  ];
  const columns = [
    {
      name: "Title",
      selector: row => row.title,
      sortable: true,
    },
    {
      name: "Year",
      selector: row => row.year,
      sortable: true,
      
    },
    {
      name: "Year",
      selector: "year",
      sortable: row => row.year,
      
    },
    {
      name: "Year",
      selector: "year",
      sortable: row => row.year,
      
    },
    {
      name: "Year",
      selector: "year",
      sortable: row => row.year,
      
    },
  ];
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const filteredItems = data.filter(
    (item) =>
      item.title && item.title.toLowerCase().includes(filterText.toLowerCase())
  );
  const TextField = styled.input`
  	height: 32px;
  	width: 200px;
  	border-radius: 3px;
  	border-top-left-radius: 5px;
  25	border-bottom-left-radius: 5px;
  	border-top-right-radius: 0;
  	border-bottom-right-radius: 0;
  	border: 1px solid #e5e5e5;
  	padding: 0 32px 0 16px;
  
  	&:hover {
  		cursor: pointer;
  	}
  `;

  const ClearButton = styled(Button)`
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    height: 34px;
    width: 32px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  const FilterComponent = ({ filterText, onFilter, onClear }) => (
    <>
      <TextField
        id="search"
        type="text"
        placeholder="Filter By Name"
        aria-label="Search Input"
        value={filterText}
        onChange={onFilter}
      />
      <ClearButton type="button" onClick={onClear}>
        X
      </ClearButton>
    </>
  );
  const subHeaderComponentMemo = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);
  return (
    <DataTable
      title="YourBlogCoach"
      columns={columns}
      data={filteredItems}
      pagination
      paginationResetDefaultPage={resetPaginationToggle}
      subHeader
      subHeaderComponent={subHeaderComponentMemo}
      persistTableHead
    ></DataTable>
  );
};

export default About;
