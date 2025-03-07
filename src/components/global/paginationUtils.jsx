export const paginationConfig = (rowsPerPage = 10, rowsPerPageOptions = [10, 20, 30, 50, 100]) => {
    return {
      pagination: true,
      paginationPerPage: rowsPerPage, // Default rows per page
      paginationRowsPerPageOptions: rowsPerPageOptions, // Dropdown options
    };
  };
  