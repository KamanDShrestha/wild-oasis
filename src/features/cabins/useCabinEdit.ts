import {
  QueryClient,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { FieldValues } from 'react-hook-form';
import { createEditCabin } from '../../services/apiCabins';
import { toast } from 'react-hot-toast';

export default function useCabinEdit() {
  const queryClient = useQueryClient();
  const { mutate: editCabin, isLoading: isEditing } = useMutation<
    void,
    unknown,
    { newCabinData: FieldValues; id: number | undefined }
  >({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: async () => {
      toast.success('Cabin is successfully edited.');
      await queryClient.invalidateQueries(['cabins']);
    },
    onError: () => {
      toast.error('Cabin cannot be edited. Please try again!');
    },
  });

  return { editCabin, isEditing };
}
