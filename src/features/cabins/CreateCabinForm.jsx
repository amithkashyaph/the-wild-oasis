import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

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

function CreateCabinForm() {
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState;
  const queryClient = useQueryClient();
  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: (cabinData) => createCabin(cabinData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      toast.success("Cabin created successfully");
      reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (cabinData) => {
    mutate(cabinData);
  };

  const onError = (errors) => {
    console.log(errors);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow errors={errors} labelName="Cabin Name" name="name">
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow errors={errors} labelName="Maximum capacity" name="maxCapacity">
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

      <FormRow errors={errors} labelName="Regular price" name="regularPrice">
        <Input
          type="number"
          name="regularPrice"
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

      <FormRow errors={errors} labelName="Discount" name="discount">
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
            max: {
              value: getValues().regularPrice,
              message: "Discount can be maximum of regular price",
            },
            validate: (value) =>
              value <= getValues().regularPrice ||
              "Discount cannot be greater than regular price",
          })}
        />
      </FormRow>

      <FormRow
        errors={errors}
        labelName="Description for website"
        name="description"
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow errors={errors} labelName="Cabin photo" name="image">
        <FileInput id="image" accept="image/*" />
      </FormRow>

      <FormRow2>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" id="cancel">
          Cancel
        </Button>
        <Button disabled={isCreating} id="addCabin">
          Add cabin
        </Button>
      </FormRow2>
    </Form>
  );
}

export default CreateCabinForm;
