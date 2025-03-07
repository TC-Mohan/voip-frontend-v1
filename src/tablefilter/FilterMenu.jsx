// import * as React from "react";
// import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
// import {
//   GridComponent,
//   ColumnsDirective,
//   ColumnDirective,
//   Page,
//   Sort,
//   Filter,
//   Inject,
// } from "@syncfusion/ej2-react-grids";
// // import { orderDataSource } from './data';
// function FilterMenu() {
//   let gridInstance;
//   const filterType = [
//     { text: "Menu", value: "Menu" },
//     { text: "Checkbox", value: "CheckBox" },
//     { text: "Excel", value: "Excel" },
//   ];
//   const filterSettings = { type: "Menu" };
//   const fields = { text: "text", value: "value" };
//   const format = { type: "datetime", format: "M/d/y hh:mm a" };
//   function onChange(sel) {
//     gridInstance.filterSettings.type = sel.itemData.value;
//     gridInstance.clearFiltering();
//   }
//   return (
//     <div className="control-pane">
//       <div className="control-section row">
//         <div style={{ padding: "14px" }}>
//           <DropDownListComponent
//             id="ddlelement"
//             dataSource={filterType}
//             fields={fields}
//             change={onChange.bind(this)}
//             index={0}
//             popupHeight="250px"
//             width="200px"
//           />
//         </div>
//         <GridComponent
//           allowSorting={true}
//           allowPaging={true}
//           ref={(grid) => (gridInstance = grid)}
//           pageSettings={{ pageSize: 10, pageCount: 5 }}
//           allowFiltering={true}
//           filterSettings={filterSettings}
//         >
//           <ColumnsDirective>
//             <ColumnDirective
//               field="OrderID"
//               headerText="Order ID"
//               width="120"
//               textAlign="Right"
//             ></ColumnDirective>
//             <ColumnDirective
//               field="CustomerName"
//               headerText="Customer Name"
//               width="150"
//             ></ColumnDirective>
//             <ColumnDirective
//               field="OrderDate"
//               headerText="Order Date"
//               width="130"
//               format={format}
//               textAlign="Right"
//             />
//             <ColumnDirective
//               field="Freight"
//               headerText="Freight"
//               width="120"
//               format="C2"
//               textAlign="Right"
//             />
//             <ColumnDirective
//               field="ShipCountry"
//               headerText="Ship Country"
//               width="150"
//             ></ColumnDirective>
//           </ColumnsDirective>
//           <Inject services={[Filter, Page, Sort]} />
//         </GridComponent>
//       </div>
//     </div>
//   );
// }

// export default FilterMenu;
