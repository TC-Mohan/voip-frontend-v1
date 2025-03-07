export const campaignreportcolumns = [
    {
      name: "ID",
      selector: "id",
      sortable: true,
      with: "2%",
      cell: (d) => [
        <button type="submit" class="btn btn-sm btn-primary">
          <i class="fa-solid fa-plus"></i>
        </button>,
      ],
    },
    {
      name: "USER NAME",
      selector: "username",
      sortable: true,
      compact: true,
      // cell: (d) => <div style={{ backgroundColor: "rgb(135, 208, 104)", color: 'white', fontWeight: 'bold', padding: '3px' }}>{d.status}</div>
    },
    {
      name: "CAMPAIGN NAME",
      selector: "campaignname",
      sortable: true,
    },
    {
      name: "NUMBER COUNT",
      selector: "numbercount",
      sortable: true,
    },
    {
      name: "CAMPAIGN LIST",
      selector: "campaignlist",
      sortable: true,
        cell: (d) => [
        <button type="submit" class="btn btn-sm btn-primary">
          Download
        </button>,
      ],
    },
    {
      name: "TYPE",
      selector: "type",
      with: "4%",
    },
    {
      name: "CAMPAIGN SUBMIT",
      selector: "campaignsubmit",
    },
    {
        name: "CAMPAIGN REPORT",
        selector: "campaignreport",
        cell: (d) => [
            <button type="submit" class="btn btn-sm btn-primary">
              Download
            </button>,
          ],
      },
   
  ];
  export const campaignreportdata = [
    {
      id: "",
      username: "deepaksingh@",
      campaignname: "demo",
      numbercount: "1",
      campaignlist: "",
      type: "",
      campaignsubmit: "2024-01-10 06:49:04",
      campaignreport: ""
    },
    {
        id: "",
        username: "deepaksingh@",
        campaignname: "demo",
        numbercount: "2",
        campaignlist: "",
        type: "",
        campaignsubmit: "2024-01-10 06:49:04",
        campaignreport: ""
      },
  ];