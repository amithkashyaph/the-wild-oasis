import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { AddCabin } from "../features/cabins/AddCabin";
import CabinTableCompoundComponent from "../features/cabins/CabinTableCompoundComponent";

function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Sort / Filter</p>
      </Row>
      <Row>
        <CabinTableCompoundComponent />
      </Row>
      <AddCabin />
    </>
  );
}

export default Cabins;
