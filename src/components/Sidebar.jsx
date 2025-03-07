// import React, { useState, useEffect } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import Input from "@mui/material/Input";
// import CircularProgress from "@mui/material/CircularProgress"; // MUI Loader for loading effect

// const Sidebar = ({ openNav }) => {
//   const [selectedTab, setSelectedTab] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [loading, setLoading] = useState(false); // Loading state
//   const { pathname } = useLocation();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (loading) {
//       const timeout = setTimeout(() => {
//         setLoading(false); // Stop loading once the location changes after a short delay
//       }, 500); // Adjust this timeout as needed (500ms should be enough)

//       return () => clearTimeout(timeout);
//     }
//   }, [pathname, loading]);

//   const handleSearchChange = (event) => {
//     setSearchQuery(event.target.value);
//   };

//   const handleNavClick = (to) => {
//     setLoading(true); // Start loading when navigation occurs
//     setSelectedTab(to);
    
//     // Simulate a slight delay for navigation to show loader
//     setTimeout(() => {
//       navigate(to);
//     }, 300); // Adjust this timeout as needed
//   };

//   const renderNavLink = (to, label, icon) => (
//     <div
//       className={`nav-link ${selectedTab === to ? "selected" : ""}`}
//       onClick={() => handleNavClick(to)}
//     >
//       {icon && <i className={`${icon}`} />}
//       <span>{label}</span>
//     </div>
//   );

//   const renderSubNav = (title, links, icon) => {
//     if (title === "Whatsapp Campaign") {
//       return (
//         <li className="nav-item" key={title}>
//           <a
//             className="nav-link collapsed"
//             data-bs-toggle="collapse"
//             href={`#Whatapp-nav`}
//           >
//             {icon && <i className={`${icon}`} />}
//             <span>{title}</span>
//             <i className="bi bi-chevron-down ms-auto" />
//           </a>
//           <ul
//             id={`Whatapp-nav`}
//             className="nav-content collapse"
//             data-bs-parent="#sidebar-nav"
//           >
//             {links.map((link, index) => (
//               <li key={index}>
//                 {renderNavLink(link.to, link.label, link.icon)}
//               </li>
//             ))}
//           </ul>
//         </li>
//       );
//     } else if (title === "SMS Marketing") {
//       return (
//         <li className="nav-item" key={title}>
//           <a
//             className="nav-link collapsed"
//             data-bs-toggle="collapse"
//             href={`#activities-nav`}
//           >
//             {icon && <i className={`${icon}`} />}
//             <span>{title}</span>
//             <i className="bi bi-chevron-down ms-auto" />
//           </a>
//           <ul
//             id={`activities-nav`}
//             className="nav-content collapse"
//             data-bs-parent="#sidebar-nav"
//           >
//             {links.map((link, index) => (
//               <li key={index}>
//                 {renderNavLink(link.to, link.label, link.icon)}
//               </li>
//             ))}
//           </ul>
//         </li>
//       );
//     } else if (title === "SMS Manage") {
//       return (
//         <li className="nav-item" key={title}>
//           <a
//             className="nav-link collapsed"
//             data-bs-toggle="collapse"
//             href={`#sms-nav`}
//           >
//             {icon && <i className={`${icon}`} />}
//             <span>{title}</span>
//             <i className="bi bi-chevron-down ms-auto" />
//           </a>
//           <ul
//             id={`sms-nav`}
//             className="nav-content collapse"
//             data-bs-parent="#sidebar-nav"
//           >
//             {links.map((link, index) => (
//               <li key={index}>
//                 {renderNavLink(link.to, link.label, link.icon)}
//               </li>
//             ))}
//           </ul>
//         </li>
//       );
//     }

//     return (
//       <li className="nav-item" key={title}>
//         <a
//           className="nav-link collapsed"
//           data-bs-toggle="collapse"
//           href={`#${title.toLowerCase()}-nav`}
//         >
//           {icon && <i className={`${icon}`} />}
//           <span>{title}</span>
//           <i className="bi bi-chevron-down ms-auto" />
//         </a>
//         <ul
//           id={`${title.toLowerCase()}-nav`}
//           className="nav-content collapse"
//           data-bs-parent="#sidebar-nav"
//         >
//           {links.map((link, index) => (
//             <li key={index}>{renderNavLink(link.to, link.label, link.icon)}</li>
//           ))}
//         </ul>
//       </li>
//     );
//   };

//   const navigationItems = [
//     { to: "/dashboard", label: "Dashboard", icon: "bi-grid" },
//     {
//       title: "Reporting",
//       links: [
//         { to: "/report-list", label: "Report", icon: "bi-circle" },
//         { to: "/live-calls", label: "Live Calls", icon: "bi-circle" },
//       ],
//       icon: "bi-menu-button-wide",
//     },
//     {
//       title: "Numbers",
//       links: [
//         { to: "/purchase-number-list", label: "Purchase Number List", icon: "bi-circle" },
//         { to: "/block-number", label: "Manage Block Numbers", icon: "bi-circle" },
//       ],
//       icon: "bi-journal-text",
//     },
//     { to: "/publishers", label: "Publishers", icon: "bi-person" },
//     {
//       title: "Targets",
//       links: [
//         { to: "/manage-buyers", label: "Manage Buyers", icon: "bi-circle" },
//         { to: "/create-targets", label: "Create Targets", icon: "bi-circle" },
//         { to: "/manage-targets", label: "Manage Targets", icon: "bi-circle" },
//       ],
//       icon: "bi-bar-chart",
//     },
//     {
//       title: "Campaigns",
//       links: [
//         { to: "/create-campaigns", label: "Create Campaigns", icon: "bi-circle" },
//         { to: "/manage-campaigns", label: "Manage Campaigns", icon: "bi-circle" },
//       ],
//       icon: "bi-layout-text-window-reverse",
//     },
//     {
//       title: "Phone",
//       links: [
//         { to: "/calls", label: "Calls", icon: "bi-circle" },
//         { to: "/dial-pad", label: "Dial Pad", icon: "bi-circle" },
//         { to: "/manage-users", label: "Manage Users", icon: "bi-circle" },
//         { to: "/ring-group", label: "Ring Group", icon: "bi-circle" },
//         { to: "/call-history", label: "Call History", icon: "bi-circle" },
//       ],
//       icon: "fa-brands fa-square-whatsapp",
//     },
//     {
//       title: "Settings",
//       links: [{ to: "/profile", label: "Profile", icon: "bi-circle" }],
//       icon: "fa-solid fa-gear",
//     },
//     { to: "/support", label: "Support", icon: "fa-solid fa-circle-info" },
//   ];

//   // Filtered navigation items based on search query
//   const filteredNavItems = navigationItems
//     .map((item) => {
//       if (item.title) {
//         const filteredSubLinks = item.links.filter((link) =>
//           link.label.toLowerCase().includes(searchQuery.toLowerCase())
//         );
//         if (filteredSubLinks.length > 0) {
//           return {
//             ...item,
//             links: filteredSubLinks,
//           };
//         } else {
//           return null; // Hide the main item if none of its sub-items match
//         }
//       } else if (item.label.toLowerCase().includes(searchQuery.toLowerCase())) {
//         return item;
//       } else {
//         return null; // Hide individual items that don't match
//       }
//     })
//     .filter(Boolean); // Remove null items

//   const ariaLabel = { "aria-label": "description" };

//   return (
//     <>
//       {loading && (
//         <div className="loading-overlay">
//           <CircularProgress /> {/* MUI CircularProgress as the loading spinner */}
//         </div>
//       )}

//       <aside id="sidebar" className={`sidebar ${openNav ? "active" : ""}`}>
//         <Input
//           fullWidth
//           placeholder="Search..."
//           inputProps={ariaLabel}
//           value={searchQuery}
//           onChange={handleSearchChange}
//           style={{ marginBottom: "15px" }}
//         />

//         <ul className="sidebar-nav" id="sidebar-nav">
//           {filteredNavItems.map((item, index) => (
//             <React.Fragment key={index}>
//               {item.title ? (
//                 renderSubNav(item.title, item.links, item.icon)
//               ) : (
//                 <li key={item.to}>
//                   {renderNavLink(item.to, item.label, item.icon)}
//                 </li>
//               )}
//             </React.Fragment>
//           ))}
//         </ul>
//       </aside>

//       <style jsx="true">
//         {`
//           .loading-overlay {
//             position: fixed;
//             top: 0;
//             left: 0;
//             right: 0;
//             bottom: 0;
//             display: flex;
//             justify-content: center;
//             align-items: center;
//             background: rgba(255, 255, 255, 0.7);
//             z-index: 9999;
//           }
//         `}
//       </style>
//     </>
//   );
// };

// export default Sidebar;


import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Input from "@mui/material/Input";
import CircularProgress from "@mui/material/CircularProgress";
import { DecryptToken } from "../helper/Constants";

const Sidebar = ({ openNav }) => {
  const [selectedTab, setSelectedTab] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState(null);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      const timeout = setTimeout(() => {
        setLoading(false);
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [pathname, loading]);

  useEffect(() => {
    const userToken = localStorage.getItem("psx_token");
    const decodedToken = DecryptToken(userToken);
    setUserType(decodedToken?.user_type);
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleNavClick = (to) => {
    setLoading(true);
    setSelectedTab(to);
    
    setTimeout(() => {
      navigate(to);
    }, 300);
  };

  const renderNavLink = (to, label, icon) => (
    <div
      className={`nav-link ${selectedTab === to ? "selected" : ""}`}
      onClick={() => handleNavClick(to)}
    >
      {icon && <i className={`${icon}`} />}
      <span>{label}</span>
    </div>
  );

  const renderSubNav = (title, links, icon) => {
    const collapseId = title.toLowerCase().replace(/\s+/g, '-');
    
    return (
      <li className="nav-item" key={title}>
        <a
          className="nav-link collapsed"
          data-bs-toggle="collapse"
          href={`#${collapseId}-nav`}
        >
          {icon && <i className={`${icon}`} />}
          <span>{title}</span>
          <i className="bi bi-chevron-down ms-auto" />
        </a>
        <ul
          id={`${collapseId}-nav`}
          className="nav-content collapse"
          data-bs-parent="#sidebar-nav"
        >
          {links.map((link, index) => (
            <li key={index}>
              {renderNavLink(link.to, link.label, link.icon)}
            </li>
          ))}
        </ul>
      </li>
    );
  };

  // Special navigation items for user_type 3
  const userType3Navigation = [
    { to: "/calls", label: "Calls", icon: "fa-solid fa-tachometer-alt", allowedUserTypes: [3] },
    { to: "/purchase-number-list", label: "Purchase Number List", icon: "fa-solid fa-list-alt", allowedUserTypes: [3] },
    { to: "/block-number", label: "Manage Block Numbers", icon: "fa-solid fa-ban", allowedUserTypes: [3] },
    { to: "/dial-pad", label: "Dial Pad", icon: "fa-solid fa-phone", allowedUserTypes: [3] },
    { to: "/manage-users", label: "Manage Users", icon: "fa-solid fa-users", allowedUserTypes: [3] },
    { to: "/ring-group", label: "Ring Group", icon: "fa-solid fa-ring", allowedUserTypes: [3] },
    { to: "/call-history", label: "Call History", icon: "fa-solid fa-history", allowedUserTypes: [3] },
    { to: "/profile", label: "Settings", icon: "fa-solid fa-gear", allowedUserTypes: [3] },
    { to: "/support", label: "Support", icon: "fa-solid fa-life-ring", allowedUserTypes: [3] }
  ];

  // Original navigation items for other user types
  const defaultNavigationItems = [
    { to: "/dashboard", label: "Dashboard", icon: "bi-grid", allowedUserTypes: [1, 2, 3, 4] },
    {
      title: "Reporting",
      links: [
        { to: "/report-list", label: "Report", icon: "bi-circle" },
        { to: "/live-calls", label: "Live Calls", icon: "bi-circle" },
      ],
      icon: "bi-menu-button-wide",
      allowedUserTypes: [1, 2, 4]
    },
    {
      title: "Numbers",
      links: [
        { to: "/purchase-number-list", label: "Purchase Number List", icon: "bi-circle" },
        { to: "/block-number", label: "Manage Block Numbers", icon: "bi-circle" },
      ],
      icon: "bi-journal-text",
      allowedUserTypes: [1, 2, 3, 4]
    },
    { to: "/publishers", label: "Publishers", icon: "bi-person", allowedUserTypes: [1, 2, 4] },
    {
      title: "Targets",
      links: [
        { to: "/manage-buyers", label: "Manage Buyers", icon: "bi-circle" },
        { to: "/create-targets", label: "Create Targets", icon: "bi-circle" },
        { to: "/manage-targets", label: "Manage Targets", icon: "bi-circle" },
      ],
      icon: "bi-bar-chart",
      allowedUserTypes: [1, 2, 4]
    },
    {
      title: "Campaigns",
      links: [
        { to: "/create-campaigns", label: "Create Campaigns", icon: "bi-circle" },
        { to: "/manage-campaigns", label: "Manage Campaigns", icon: "bi-circle" },
      ],
      icon: "bi-layout-text-window-reverse",
      allowedUserTypes: [1, 2, 4]
    },
    {
      title: "Phone",
      links: [
        { to: "/calls", label: "Calls", icon: "bi-circle" },
        { to: "/dial-pad", label: "Dial Pad", icon: "bi-circle" },
        { to: "/manage-users", label: "Manage Users", icon: "bi-circle" },
        { to: "/ring-group", label: "Ring Group", icon: "bi-circle" },
        { to: "/call-history", label: "Call History", icon: "bi-circle" },
      ],
      icon: "fa-brands fa-square-whatsapp",
      allowedUserTypes: [1, 2, 3]
    },
    {
      title: "Settings",
      links: [{ to: "/profile", label: "Profile", icon: "bi-circle" }],
      icon: "fa-solid fa-gear",
      allowedUserTypes: [1, 2, 3, 4]
    },
    { to: "/support", label: "Support", icon: "fa-solid fa-circle-info", allowedUserTypes: [1, 2, 3, 4] }
  ];

  const navigationItems = userType === 3 ? userType3Navigation : defaultNavigationItems;

  const filteredNavItems = navigationItems
    .filter(item => {
      if (!userType) return true;

      if (item.title) {
        const filteredSubLinks = item.links?.filter(link => 
          item.allowedUserTypes.includes(userType)
        );
        
        return filteredSubLinks?.length > 0;
      }
      
      return item.allowedUserTypes.includes(userType);
    })
    .map(item => {
      if (item.title) {
        const filteredSubLinks = item.links.filter(link => 
          link.label.toLowerCase().includes(searchQuery.toLowerCase())
        );
        return filteredSubLinks.length > 0 ? { ...item, links: filteredSubLinks } : null;
      }
      return item.label.toLowerCase().includes(searchQuery.toLowerCase()) ? item : null;
    })
    .filter(Boolean);

  return (
    <>
      {/* {loading && (
        <div className="loading-overlay">
          <CircularProgress />
        </div>
      )} */}

      <aside id="sidebar" className={`sidebar ${openNav ? "active" : ""}`}>
        <Input
          fullWidth
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
          style={{ marginBottom: "15px" }}
        />

        <ul className="sidebar-nav" id="sidebar-nav">
          {filteredNavItems.map((item, index) => (
            <React.Fragment key={index}>
              {item.title ? (
                renderSubNav(item.title, item.links, item.icon)
              ) : (
                <li key={item.to}>
                  {renderNavLink(item.to, item.label, item.icon)}
                </li>
              )}
            </React.Fragment>
          ))}
        </ul>
      </aside>

      {/* <style jsx="true">
        {`
          .loading-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            background: rgba(255, 255, 255, 0.7);
            z-index: 9999;
          }
        `}
      </style> */}
    </>
  );
};

export default Sidebar;