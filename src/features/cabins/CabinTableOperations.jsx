import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

const CabinTableOperations = () => {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          {
            label: "All",
            value: "all",
          },
          {
            label: "No discount",
            value: "no-discount",
          },
          {
            label: "With discount",
            value: "with-discount",
          },
        ]}
      />
      <SortBy
        options={[
          {
            label: "Sort by name [A-Z]",
            value: "name-asc",
          },
          {
            value: "name-desc",
            label: "Sort by name [Z-A]",
          },
          {
            value: "regularPrice-asc",
            label: "Sort by price [low-high]",
          },
          {
            value: "regularPrice-desc",
            label: "Sort by price [high-low]",
          },
          {
            value: "maxCapacity-asc",
            label: "Sort by maxCapacity [low-high]",
          },
          {
            value: "maxCapacity-desc",
            label: "Sort by maxCapacity [high-low]",
          },
        ]}
      />
    </TableOperations>
  );
};

export default CabinTableOperations;
