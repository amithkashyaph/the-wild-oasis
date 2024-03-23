import { useState } from "react";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";
import ModalCompoundComponent from "../../ui/ModalCompoundComponent";
import CabinTable from "./CabinTable";

// export const AddCabin = () => {
//   const [isOpenModal, setIsOpenModal] = useState(false);

//   return (
//     <div>
//       <Button onClick={() => setIsOpenModal((isOpenModal) => !isOpenModal)}>
//         Show form
//       </Button>
//       {isOpenModal && (
//         <Modal onClose={() => setIsOpenModal(false)}>
//           <CreateCabinForm onCloseModal={() => setIsOpenModal(false)} />
//         </Modal>
//       )}
//     </div>
//   );
// };

export const AddCabin = () => {
  return (
    <ModalCompoundComponent>
      <ModalCompoundComponent.Open opens="cabin-form">
        <Button>Add new Cabin</Button>
      </ModalCompoundComponent.Open>
      <ModalCompoundComponent.Window name="cabin-form">
        <CreateCabinForm />
      </ModalCompoundComponent.Window>

      <ModalCompoundComponent.Open opens="cabin-table">
        <Button>Display table</Button>
      </ModalCompoundComponent.Open>
      <ModalCompoundComponent.Window name="cabin-table">
        <CabinTable />
      </ModalCompoundComponent.Window>
    </ModalCompoundComponent>
  );
};
