import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useCreateCabin } from "./useCreateCabin";
import ModalCompoundComponent from "../../ui/ModalCompoundComponent";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { Table } from "../../ui/Table";
import Menus from "../../ui/Menus";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

const CabinRow = ({ cabin }) => {
  const [showEditForm, setShowEditForm] = useState(false);
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { isCreating, createCabin } = useCreateCabin();

  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
  } = cabin;

  const handleCreateDuplicateCabin = () => {
    createCabin({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
    });
  };

  return (
    <Table.Row>
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div>Fits upto {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash</span>
      )}
      <div>
        <button onClick={handleCreateDuplicateCabin}>
          <HiSquare2Stack />
        </button>
        <ModalCompoundComponent>
          <ModalCompoundComponent.Open opens="edit-cabin">
            <button
              onClick={() => setShowEditForm((showForm) => !showForm)}
              disabled={isDeleting}
            >
              <HiPencil />
            </button>
          </ModalCompoundComponent.Open>
          <ModalCompoundComponent.Window name="edit-cabin">
            <CreateCabinForm editCabinData={cabin} />
          </ModalCompoundComponent.Window>
          <ModalCompoundComponent.Open opens="delete-cabin">
            <button disabled={isDeleting}>
              <HiTrash />
            </button>
          </ModalCompoundComponent.Open>
          <ModalCompoundComponent.Window name="delete-cabin">
            <ConfirmDelete
              resourceName="cabins"
              disabled={isDeleting}
              onConfirm={() => deleteCabin(cabinId)}
            />
          </ModalCompoundComponent.Window>
        </ModalCompoundComponent>
        <Menus.Menu>
          <Menus.Toggle id={cabin.id} />
          <Menus.List id={cabin.id}>
            <Menus.Button>Duplicate</Menus.Button>
            <Menus.Button>Edit</Menus.Button>
            <Menus.Button>Delete</Menus.Button>
          </Menus.List>
        </Menus.Menu>
      </div>
    </Table.Row>
  );
};

export default CabinRow;
