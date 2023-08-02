import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEditCabin } from '../../services/apiCabins';
import { toast } from 'react-hot-toast';

export function useCabinCreate() {
  const queryClient = useQueryClient();
  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: async () => {
      toast.success('New cabin is successfully created');
      await queryClient.invalidateQueries(['cabins']);
    },
    onError: () => {
      toast.error('New cabin cannot be created. Please try again!');
    },
  });
  return { createCabin, isCreating };
}
