import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

const FormRow2 = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function CreateCabinForm({ editCabinData = {}, onClose, onCloseModal }) {
  const { id: editCabinId, ...editFormValues } = editCabinData;

  const isEditMode = Boolean(editCabinId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditMode ? editFormValues : {},
  });
  const { errors } = formState;

  const { isCreating, createCabin } = useCreateCabin();

  const { isEditing, editCabin } = useEditCabin();

  const onSubmit = (cabinData) => {
    const image =
      typeof cabinData.image === "string"
        ? cabinData.image
        : cabinData.image[0];

    if (isEditMode) {
      editCabin(
        { newCabin: { ...cabinData, image }, id: editCabinId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    } else {
      createCabin(
        { ...cabinData, image },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    }
  };

  const onError = (errors) => {
    console.log(getValues());
    console.log(errors);
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow errors={errors} label="Cabin Name">
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow errors={errors} label="Maximum capacity">
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Max Capacity should atleast be 1",
            },
          })}
        />
      </FormRow>

      <FormRow errors={errors} label="Regular price">
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 0,
              message: "Cabin price cannot be less than 0",
            },
          })}
        />
      </FormRow>

      <FormRow errors={errors} label="Discount">
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            min: {
              value: 0,
              message: "Discount cannot be less than 0",
            },
            validate: (value) =>
              Number(value) <= Number(getValues().regularPrice) ||
              "Discount cannot be greater than regular price",
          })}
        />
      </FormRow>

      <FormRow errors={errors} label="Description for website">
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow errors={errors} label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditMode ? false : "Please upload a Cabin photo",
          })}
        />
      </FormRow>

      <FormRow2>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          id="cancel"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isCreating} id="addCabin">
          {isEditMode ? "Edit Cabin" : "Add new Cabin"}
        </Button>
      </FormRow2>
    </Form>
  );
}

export default CreateCabinForm;
