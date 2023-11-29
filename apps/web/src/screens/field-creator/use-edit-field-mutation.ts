import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useRouter } from "next/router";

import { api } from "@app/api";
import { getWarehouseId } from "@app/components/navigation/main-navigation";
import { API_ENDPOINTS } from "@app/constants/api-endpoints";
import { fieldsQueryKey } from "@app/hooks/queries/use-fields-query";
import { useToast } from "@crab-stash/ui";
import type { RJSFSchema } from "@rjsf/utils";
import type { Response } from "types";

export type EditFieldMutationVariables = {
  formData: RJSFSchema;
};

type EditFieldMutationResponse = Response<{ id: string }>;

interface UseEditFieldMutationParams {
  fieldId?: string;
  onSuccess?: (data: EditFieldMutationResponse) => void;
}

export const useEditFieldMutation = ({ fieldId, onSuccess }: UseEditFieldMutationParams) => {
  const router = useRouter();
  const warehouseId = getWarehouseId(router.query);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation<EditFieldMutationResponse, unknown, EditFieldMutationVariables>(
    async (options) => {
      if (!warehouseId || !fieldId) {
        throw new Error("No id");
      }

      const { data } = await api.patch<EditFieldMutationResponse>(
        API_ENDPOINTS.core.fields.edit(warehouseId, fieldId),
        options,
      );

      return data;
    },
    {
      onSuccess: (data) => {
        toast({
          title: "Field updated",
          description: "Field updated successfully",
        });

        onSuccess?.(data);

        queryClient.invalidateQueries({
          queryKey: [fieldsQueryKey, warehouseId],
        });
      },
    },
  );

  return mutation;
};
