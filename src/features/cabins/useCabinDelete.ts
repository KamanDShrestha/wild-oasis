import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { deleteCabin } from '../../services/apiCabins';

export default function useCabinDelete() {
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: deleteThisCabin } = useMutation({
    mutationFn: function (id: number) {
      return deleteCabin(id);
    },
    onSuccess: () => {
      toast.success('Cabin is deleted successfully.');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
    },
    onError: (err: Error) => {
      toast.error("Cabin can't be deleted");
      console.log(err.message);
    },
  });
  return { isDeleting, deleteThisCabin };
}
