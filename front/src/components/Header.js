import React from "react";
import { Icon, Nav } from "rsuite";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Nav appearance="tabs">
      <Link to={"/players-list"}>
        <Nav.Item icon={<Icon icon="home" />}>FIFA 21</Nav.Item>
      </Link>
      <Link to={"/players-list"}>
        <Nav.Item>Player list</Nav.Item>
      </Link>
      <Link to={"/players-search-by-team"}>
        <Nav.Item>Search by team</Nav.Item>
      </Link>
    </Nav>
  );
};

export default Header;
