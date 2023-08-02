import React from 'react';
import { Input } from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import { FieldValues, useForm } from 'react-hook-form';
import { Cabins } from '../../../types/collection';
import FormRow from '../../ui/FormRow';
import useCabinEdit from './useCabinEdit';
import { useCabinCreate } from './useCabinCreate';

interface Props {
  cabinToEdit?: Cabins;
  setIsEditing: (isEditing: boolean) => void;
}

function CreateCabinForm({ cabinToEdit, setIsEditing }: Props) {
  //if this form is for editing the cabin
  const edit_id = cabinToEdit?.id;

  //getting the query client to change the UI when the data is being inserted.
  const { register, handleSubmit, formState, reset, getValues } = useForm({
    defaultValues: edit_id ? cabinToEdit : {},
  });

  const { editCabin, isEditing } = useCabinEdit();
  const { createCabin, isCreating } = useCabinCreate();

  console.log(formState.errors);
  function onSubmit(data: FieldValues) {
    //checking if it's the image string or FileList
    const image = typeof data.image === 'string' ? data.image : data?.image[0];
    console.log(data);
    if (edit_id) {
      console.log('Ediitting');
      editCabin(
        { newCabinData: { ...data, image: image }, id: edit_id },
        {
          onSuccess: () => {
            reset();
            setIsEditing(false);
          },
        }
      );
    } else {
      createCabin(
        { ...data, image: data?.image[0] },
        {
          onSuccess: () => {
            reset();
          },
        }
      );
    }
  }
  return (
    <Form onSubmit={handleSubmit((data) => onSubmit(data))}>
      <FormRow label='Cabin Name' error={formState.errors.name}>
        <Input
          type='text'
          id='name'
          {...register('name', { required: 'Cabin name cannot be empty!' })}
        />
      </FormRow>

      <FormRow label='Maximum capacity' error={formState.errors.maxCapacity}>
        <Input
          type='number'
          id='maxCapacity'
          {...register('maxCapacity', {
            required: 'Please enter maximum capacity',
            min: {
              value: 1,
              message: 'Minimum 1 person would be staying at the cabin!',
            },
          })}
        />
      </FormRow>

      <FormRow label='Regular Price' error={formState.errors.regularPrice}>
        <Input
          type='number'
          id='regularPrice'
          {...register('regularPrice', {
            required: 'Please enter regular price!',
            min: {
              value: 500,
              message: 'Regular price is always greater than 500',
            },
          })}
        />
      </FormRow>

      <FormRow label='Discount' error={formState.errors.discount}>
        <Input
          type='number'
          id='discount'
          defaultValue={0}
          {...register('discount', {
            required: 'Please provide the discount amount',
            validate: (value) =>
              Number(value) <= Number(getValues().regularPrice) ||
              'Discount should be less that regular price',
          })}
        />
      </FormRow>

      <FormRow
        label='Description for website'
        error={formState.errors.description}
      >
        <Textarea
          type='number'
          id='description'
          defaultValue=''
          {...register('description', {
            required: 'Please provide a description',
          })}
        />
      </FormRow>

      <FormRow label='Cabin Photo'>
        <FileInput
          id='image'
          accept='image/*'
          {...register('image', {
            required: edit_id ? false : 'Please provide a image!',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation='secondary' type='reset'>
          Cancel
        </Button>
        <Button variation='primary' disabled={isCreating}>
          {edit_id
            ? isEditing
              ? 'Editing'
              : 'Edit Cabin'
            : isCreating
            ? 'Adding cabin'
            : 'Add Cabin'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
