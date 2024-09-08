import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import { toast } from "react-hot-toast";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";

export function useUpdateSetting() {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updateSetting } = useMutation({
    mutationFn: (newSetting) => updateSettingApi(newSetting),
    //same as below
    // mutationFn: (newCabin) => createCabin(newCabin),
    onSuccess: () => {
      toast.success("Setting successfully edited");
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
      //   reset();
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, updateSetting };
}
