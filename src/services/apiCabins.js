import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Create/Edit cabin
  //  Now what we still need to do is actually specify the image path here in this new cabin that we create
  let query = supabase.from("cabins");

  // A. Create new cabin
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);
  // .insert([newcabin])

  // B. Edit already existing cabin
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();
  //if we want data contains info within it need to use select, so if not - data will be empty and we could return it at the end of the function

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be created");
  }

  // 2. If creating cabin is successful then upload an image
  // 2. If that is successful then we upload an image
  // console.log(newCabin.image);
  if (hasImagePath) return data;

  const { data: storageData, error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3. Delete the cabin IF there was an error uploading image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded and the cabin as not created"
    );
  }
  return data;
}
// export async function createEditCabin(newCabin) {
//   const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
//     "/",
//     ""
//   );
//   const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

//   // 1. Create cabin
//   //  Now what we still need to do is actually specify the image path here in this new cabin that we create
//   const { data, error } = await supabase
//     .from("cabins")
//     // .insert([newcabin])
//     .insert([{ ...newCabin, image: imagePath }])
//     .select() //if we want data contains info within it need to use select, so if not - data will be empty and we could return it at the end of the function
//     .single();

//   if (error) {
//     console.error(error);
//     throw new Error("Cabins could not be created");
//   }

//   // 2. If creating cabin is successful then upload an image
//   // 2. If that is successful then we upload an image
//   const { data: storageData, error: storageError } = await supabase.storage
//     .from("cabin-images")
//     .upload(imageName, newCabin.image);
//   // 3. Delete the cabin IF there was an error uploading image
//   if (storageError) {
//     await supabase.from("cabins").delete().eq("id", data.id);
//     console.error(storageError);
//     throw new Error(
//       "Cabin image could not be uploaded and the cabin as not created"
//     );
//   }
//   return data;
// }

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}
