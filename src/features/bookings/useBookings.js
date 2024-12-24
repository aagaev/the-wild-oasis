import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBookings() {
  //Update version of useBookings

  const [searchParams] = useSearchParams();

  //Filter
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };
  // { field: "totalPrice", value: 5000, method: "gte" };

  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ["bookings", filter],
    queryFn: () => getBookings({ filter }),
  });
  return { isLoading, error, bookings };
}

// export function useBookings() { // First version
//   const {
//     isLoading,
//     data: bookings,
//     error,
//   } = useQuery({
//     queryKey: ["bookings"],
//     queryFn: getBookings,
//   });
//   return { isLoading, error, bookings };
// }
