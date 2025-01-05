import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useChecking() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
      }),
    onSuccess: (data) => {
      //that's the thing we could use, so then data is a entity that has returned from mutationFn or updateBooking
      toast.success(`Booking #${data.id} successfully checked in`);
      queryClient.invalidateQueries({ active: true }); // or as below use queryKey
      navigate("/");
    },
    onError: () => toast.error(`There was an error while checking in`),
  });

  return { checkin, isCheckingIn };
}

// function useEditCabin() {
//   const queryClient = useQueryClient();

//   const { isLoading: isEditing, mutate: editCabin } = useMutation({
//     mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id), //same as below
//     // mutationFn: (newCabin) => createCabin(newCabin),
//     onSuccess: () => {
//       toast.success("Cabin successfully edited");
//       queryClient.invalidateQueries({
//         queryKey: ["cabins"],
//       });
//       //   reset();
//     },
//     onError: (err) => toast.error(err.message),
//   });

//   return { isEditing, editCabin };
// }
