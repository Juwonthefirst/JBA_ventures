import { api } from "@/api-client";
import type {
  AdminContext,
  FormDataObject,
  Property,
  PropertyFormInputs,
  ServerError,
} from "@/types";
import {
  useMutation,
  type MutationFunctionContext,
} from "@tanstack/react-query";
import axios from "axios";
import {
  useForm,
  type DefaultValues,
  type SubmitHandler,
} from "react-hook-form";
import { useOutletContext } from "react-router";

interface Props {
  url: string;
  method: "post" | "patch";
  defaultValues?: DefaultValues<PropertyFormInputs>;
  onSuccess?: (
    data: Property,
    context: MutationFunctionContext,
    variables: {
      formData: FormDataObject;
    }
  ) => Promise<void> | void;
}

const useMutatingForm = ({ method, defaultValues, onSuccess, url }: Props) => {
  const { authToken } = useOutletContext<AdminContext>();
  const { handleSubmit, control, reset, setError, watch } =
    useForm<PropertyFormInputs>({
      defaultValues,
    });

  const mutation = useMutation({
    mutationFn: ({ formData }: { formData: FormDataObject }) =>
      api[method]<Property>(url, formData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "multipart/form-data",
        },
        formSerializer: { indexes: true },
      }).then((res) => res.data),

    onSuccess: (data, varaibles, onMutateResult, context) => {
      void onMutateResult;
      void onSuccess?.(data, context, varaibles);
    },

    onError: (error) => {
      if (
        axios.isAxiosError<ServerError>(error) &&
        error.response?.status === 400
      ) {
        const errorData = error.response.data;
        Object.entries(errorData).forEach(([name, value]) => {
          setError(name as keyof ServerError, {
            type: "server",
            message: value[0],
          });
        });
      }
    },
  });

  const verifySubmit = async (callback: (data: PropertyFormInputs) => void) => {
    let inputValues: PropertyFormInputs | undefined;

    const onSubmitSuccess: SubmitHandler<PropertyFormInputs> = (
      submittedData
    ) => {
      inputValues = submittedData;
    };
    await handleSubmit(onSubmitSuccess)();
    if (!inputValues) return;
    callback(inputValues);
  };
  return {
    verifySubmit,
    control,
    reset,
    watch,
    isSubmitting: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isFailed: mutation.isError,
    error: mutation.error,
    submit: mutation.mutate,
    clearState: mutation.reset,
  };
};

export default useMutatingForm;
