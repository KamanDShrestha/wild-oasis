import supabase from './supabase';

export async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.log('Cabins could not be found');
    throw new Error('Cabins could not be found');
  }

  return data;
}

export async function deleteCabin(id: number) {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id);
  if (error) {
    console.log('Cabins could not be deleted');
    throw new Error('Cabins could not be deleted');
  }
  return data;
}
