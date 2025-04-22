import React from "react";
import {
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBContainer,
  MDBNavbar,
} from "mdb-react-ui-kit";

export default function Dashboard() {
    return (
        <MDBNavbar expand='lg' light bgColor='light'>
          <MDBContainer fluid>
            <MDBBreadcrumb>
              <MDBBreadcrumbItem>
                <a href='#'>Home</a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem>
                <a href='#'>Library</a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem active>
                <a href='#'>Data</a>
              </MDBBreadcrumbItem>
            </MDBBreadcrumb>
          </MDBContainer>
        </MDBNavbar>
      );
    }