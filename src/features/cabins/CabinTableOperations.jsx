import Filter from "../../ui/Filter";
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
    </TableOperations>
  );
};

export default CabinTableOperations;
