import { useEffect, useState } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { getCabins } from "../services/apiCabins";
import CabinTable from "../features/cabins/CabinTable";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
import Button from "../ui/Button";

function Cabins() {
  const [showForm, setShowForm] = useState(false);
  useEffect(() => {
    getCabins().then((data) => console.log(data));
  }, []);
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Sort / Filter</p>
      </Row>
      <Row>
        <CabinTable />
      </Row>
      <Button onClick={() => setShowForm((showForm) => !showForm)}>
        Show form
      </Button>
      {showForm && <CreateCabinForm />}
    </>
  );
}

export default Cabins;
