export const UsersColumns = [
  {
    header: "Avatar",
    accessorKey: "image",
    cell: (props) => <p>{props.getValue()}</p>,
    enableSorting: false,
  },
  {
    header: "First Name",
    accessorKey: "firstName",
    cell: (props) => <p>{props.getValue()}</p>,
    enableSorting: true,
    sortingFn: "alphanumeric",
  },
  {
    header: "Last Name",
    accessorKey: "lastName",
    cell: (props) => <p>{props.getValue()}</p>,
    enableSorting: true,
    sortingFn: "alphanumeric",
  },
  {
    header: "Gender",
    accessorKey: "gender",
    cell: (props) => <p>{props.getValue()}</p>,
    enableSorting: true,
    sortingFn: "alphanumeric",
  },
  {
    header: "Email",
    accessorKey: "email",
    cell: (props) => <p>{props.getValue()}</p>,
    enableSorting: true,
    sortingFn: "alphanumeric",
  },
  {
    header: "Contact Number",
    accessorKey: "contactNumber",
    cell: (props) => <p>{props.getValue()}</p>,
    enableSorting: true,
    sortingFn: "alphanumeric",
  },
  {
    header: "Role",
    accessorKey: "accountType",
    cell: (props) => <p>{props.getValue()}</p>,
    enableSorting: true,
    sortingFn: "alphanumeric",
  },
  {
    header: "Actions",
    accessorKey: "actions",
    cell: (props) => props.getValue(),
    enableSorting: false,
  },
];

export const CategoryColumns = [
  {
    header: "Name",
    accessorKey: "name",
    cell: (props) => <p>{props.getValue()}</p>,
    enableSorting: true,
    sortingFn: "alphanumeric",
  },
  {
    header: "Description",
    accessorKey: "description",
    cell: (props) => <p>{props.getValue()}</p>,
    enableSorting: true,
    sortingFn: "alphanumeric",
  },
  {
    header: "Actions",
    accessorKey: "actions",
    cell: (props) => props.getValue(),
    enableSorting: false,
  },
];

export const CourseTableHeading = [
  "Course Name",
  "Instructor",
  "Category",
  "Total Duration",
  "Total Enrolled",
  "Rating (Avg/Total)",
  "Price",
  "Actions",
];
