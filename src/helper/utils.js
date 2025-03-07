import { CallGETAPI } from "./Constants";

export const tableCustomStyles = {
  headCells: {
    style: {
      fontSize: "14px",
      fontWeight: "bold",
      paddingLeft: "8px",
      justifyContent: "left",
      color: "#1e78fd",
    },
  },
  cells: {
    style: {
      fontSize: "14px",
      paddingLeft: "8px",
      justifyContent: "left",
      whiteSpace: "normal",
    },
  },
  columns: {
    style: {
      "&:nth-child(1)": {
        position: "sticky",
        left: "0px",
        zIndex: 100,
        backgroundColor: "#fff",
        //  boxShadow: "0 0 4px 0px #000", // to cover other cells when scrolling horizontally
      },
    },
  },
  container: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: "20px",
    // Add any other custom styles you need
  },
  filterInput: {
    marginRight: "10px",
    // Add any other custom styles for the filter input
  },
};


export const RingGroupOption = [
  {
    title:"Ring all",value: "ringall"
  },
  { 
    title:"Least Recent",value: "leastrecent",
  },
  {
    title:"Fewest Calls",value: "fewestcalls",
  },
  { title:"Random",value: "random", },
  { title:"RR Memory",value: "rrmemory",  },
  { title:"Linear",value: "linear", },
  { title:"Random",value: "wrandom", },
  { title:"Random ordered",value: "rrordered", }

];


export const GetCountry = async()=>{
  const result = await CallGETAPI('api/country-list');
  if(result.data.status){
    return result.data.data;
  }
  return [];
}


export const GetTimeZoneById = async (country_id)=>{
  const result = await CallGETAPI('api/timezone-list?search='+country_id);
  if(result.data.status){
    return result.data.data;
  }
  return [];
}