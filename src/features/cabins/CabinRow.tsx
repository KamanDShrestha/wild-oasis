import styled from 'styled-components';
import { useState } from 'react';
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
  font-family: 'Sono';
`;

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`;

import React from 'react';
import { Cabins } from '../../../types/collection';
import { formatCurrency } from '../../utils/helpers';
import Button from '../../ui/Button';
import { deleteCabin } from '../../services/apiCabins';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import CreateCabinForm from './CreateCabinForm';
import { useCabinCreate } from './useCabinCreate';
import useCabinDelete from './useCabinDelete';
interface Props {
  cabin: Cabins;
}

const CabinRow = ({ cabin }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const { deleteThisCabin, isDeleting } = useCabinDelete();
  return (
    <>
      <TableRow role='row'>
        <Img src={cabin.image || undefined} />
        <Cabin>{cabin.name}</Cabin>
        <div>Fits upto {cabin.maxCapacity} people</div>
        <Price>{formatCurrency(cabin.regularPrice as number)}</Price>
        <Discount>
          {!cabin.discount ? '--' : formatCurrency(cabin.discount as number)}
        </Discount>
        <div>
          <Button
            variation='secondary'
            size='small'
            onClick={() => deleteThisCabin(cabin.id)}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting' : 'Delete'}
          </Button>
          <Button
            variation='secondary'
            size='small'
            onClick={() => setIsEditing((isEditing) => !isEditing)}
            disabled={isDeleting}
          >
            {isDeleting ? 'Close' : 'Edit'}
          </Button>
        </div>
      </TableRow>
      {isEditing && (
        <CreateCabinForm cabinToEdit={cabin} setIsEditing={setIsEditing} />
      )}
    </>
  );
};

export default CabinRow;
