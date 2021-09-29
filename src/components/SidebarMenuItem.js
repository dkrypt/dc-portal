import React from "react";
import { Link } from "react-router-dom";

export const SidebarMenuItem = ({ menuItems }) => {
  return (
    <div className="list-group list-group-flush p-0 mt-2">
      {menuItems.map((item, index) => {
        return item.displayItem ? (
          !item.hasSubMenu ? (
            <span className="sidebarMenu" key={index}>
              <Link
                target={item.targetBlank ? "_blank" : ""}
                to={item.targetBlank ? { pathname: item.to } : item.to} //work around for external urls to work in LINK
                className="list-group-item list-group-item-action"
              >
                <img className="img-fluid" alt="" src={item.imgSrc} />
                <span>{item.name}</span>
              </Link>
            </span>
          ) : (
            <span className="sidebarMenu dropright" key={index}>
              <Link
                className="list-group-item list-group-item-action dropdown-toggle"
                to={item.targetBlank ? { pathname: item.to } : item.to}
                target={item.targetBlank ? "_blank" : ""}
                role="button"
                id="dropdownMenuLink"
                aria-expanded="false"
              >
                <img className="img-fluid" alt="" src={item.imgSrc} />
                <span>{item.name}</span>
              </Link>
              <div className="dropdown-menu dropdown-content">
                {item.subMenuItems.map((subItem, subIndex) => {
                  return (
                    <Link
                      className="dropdown-item"
                      key={subIndex}
                      to={
                        subItem.targetBlank
                          ? { pathname: subItem.to }
                          : subItem.to
                      }
                      target={subItem.targetBlank ? "_blank" : ""}
                    >
                      {subItem.name}
                    </Link>
                  );
                })}
              </div>
            </span>
          )
        ) : (
          ""
        );
      })}
    </div>
  );
};
