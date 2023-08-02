import { useQuery } from '@tanstack/react-query';
import { getCabins } from '../../services/apiCabins';
import { Cabins } from '../../../types/collection';

export function useCabins() {
  const {
    data: cabins,
    isLoading,
    error,
  } = useQuery<Cabins[], Error>({
    queryKey: ['cabins'],
    queryFn: getCabins,
  });
  return { cabins, isLoading, error };
}
