
import React from "react";
import { Container, Nav, NavItem, NavLink } from "reactstrap";

function Footer() {
  return (
    <footer className="footer">
      <Container fluid>
        <Nav>
          <NavItem>
            <NavLink href=" ">
             PILOTS
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="">
              Impact Llama
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="">
              PILOT_TEAM
            </NavLink>
          </NavItem>
        </Nav>
        <div className="copyright">
          © {new Date().getFullYear()} made with{" "}
          <i className="tim-icons icon-heart-2" /> by{" "}
          <a
            href="https://www.creative-tim.com/?ref=bdr-user-archive-footer"
            target="_blank"
          >
            Impact Llama
          </a>{" "}
         
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
