import { FieldValues } from 'react-hook-form';
import { Cabins } from '../../types/collection';
import supabase, { supabaseUrl } from './supabase';

export async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.log('Cabins could not be found');
    throw new Error('Cabins could not be found');
  }

  return data;
}

//reusing this function for both creating as well as editing the cabin
export async function createEditCabin(newCabin?: any, id?: number) {
  console.log('helloooo', newCabin);
  console.log(newCabin.image);
  const alreadyImage = typeof newCabin.image === 'string';

  //first of all, create a cabin and then upload the image onto it
  //getting the unique image name
  const imageName = `${Math.random()}-${newCabin.image.name}`.replace('/', '');

  //getting the image path to the bucket
  const imagePath = alreadyImage
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabins/${imageName}`;

  //providing a query to reuse the cabins
  let query;
  //create a cabin
  if (!id) {
    console.log('creating');
    query = supabase.from('cabins').insert([{ ...newCabin, image: imagePath }]);
  }

  //editing the cabin
  if (id) {
    console.log('editting');
    query = supabase
      .from('cabins')
      .update({ ...newCabin, image: imagePath })
      .eq('id', id);
  }
  console.log(query);
  const { data, error } = await query.select().single();

  if (error) {
    console.log('Cabins could not be created');
    throw new Error('Cabins could not be created');
  }

  if (!alreadyImage) {
    //upload the image to the bucket
    const { error: storageError } = await supabase.storage
      .from('cabins')
      .upload(imageName, newCabin.image);

    //if storage error when uploading image

    if (storageError) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      await supabase.from('cabins').delete().eq('id', data.id);
      console.log(storageError);
      throw new Error(
        'Cabin image cannot be uploaded and cabin is not created as well'
      );
    }
  }
  //editing the cabin
}

export async function deleteCabin(id: number) {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id);
  if (error) {
    console.log('Cabins could not be deleted');
    throw new Error('Cabins could not be deleted');
  }
  return data;
}
