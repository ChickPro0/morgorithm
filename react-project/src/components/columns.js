export const COLUMNS = [
  {
    Header: "Id",
    Footer: "Id",
    accessor: "id",
  },
  {
    Header: "Name",
    Footer: "Name",
    accessor: "name",
  },
  {
    Header: "Gender",
    Footer: "Gender",
    accessor: "gender",
  },
  {
    Header: "Age",
    Footer: "Age",
    accessor: "age",
  },
  {
    Header: "Record Time",
    Footer: "Record Time",
    accessor: "record_time",
  },
  {
    Header: "HR",
    Footer: "HR",
    accessor: "HR",
  },
  {
    Header: "O2Sat",
    Footer: "O2Sat",
    accessor: "O2Sat",
  },
  {
    Header: "Temp",
    Footer: "Temp",
    accessor: "Temp",
  },
];

// 헤더 컬럼 그룹화 한 데이터.
export const GROUPED_COLUMNS = [
  {
    Header: "Id",
    Footer: "Id",
    accessor: "id",
  },
  {
    Header: "Patient_info",
    Footer: "Patient_info",
    columns: [
      {
        Header: "Name",
        Footer: "Name",
        accessor: "name",
      },
      {
        Header: "Gender",
        Footer: "Gender",
        accessor: "gender",
      },
      {
        Header: "Age",
        Footer: "Age",
        accessor: "age",
      },
    ],
  },
  {
    Header: "Record Time",
    Footer: "Record Time",
    accessor: "record_time",
  },
  {
    Header: "HR",
    Footer: "HR",
    accessor: "HR",
  },
  {
    Header: "O2Sat",
    Footer: "O2Sat",
    accessor: "O2Sat",
  },
  {
    Header: "Temp",
    Footer: "Temp",
    accessor: "Temp",
  },
];