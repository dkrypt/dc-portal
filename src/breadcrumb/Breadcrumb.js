import React from "react";
import { Breadcrumb } from "react-bootstrap";
import { Route, Link } from "react-router-dom";

import "./breadcrumb.css";

export default function SimpleBreadcrumbs(props) {
  function capitalizeFirstLetter(str) {
    var splitStr = str.toLowerCase().split(" ");
    for (var i = 0; i < splitStr.length; i++) {
      // You do not need to check if i is larger than splitStr length, as your for does that for you
      // Assign it back to the array
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    // Directly return the joined string
    return splitStr.join(" ");
  }

  return (
    <Route>
      {({ location }) => {
        const pathnames = location.pathname.split("/").filter((x) => x);
        return (
          <Breadcrumb aria-label="Breadcrumb">
            
              <Breadcrumb.Item active={pathnames.length === 0 ? "active" : ""}><Link to="/">Dashboard</Link></Breadcrumb.Item>

            {pathnames.map((value, index) => {
              const lastItem = pathnames.length - 1;
              const to = `/${pathnames.slice(0, index + 1)}`;
              const pathValue = value.replace(/-/gm, " ");
              const path = capitalizeFirstLetter(pathValue);
              return index === lastItem ? (
                <Breadcrumb.Item key={index} active>{path}</Breadcrumb.Item>
              ) : (
                <Breadcrumb.Item key={index}><Link to={to}>{path}</Link></Breadcrumb.Item>
              );
            })}
          </Breadcrumb>
        );
      }}
    </Route>
  );
}
