import { useOutletContext } from "react-router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";

import Form from "@/components/form/form.tsx";
import FileUploadSection from "@/components/admin/property-form/file-upload-section.tsx";
import InfoSection from "@/components/admin/property-form/info-section.tsx";
import LocationSection from "@/components/admin/property-form/location-section.tsx";
import ExtraInfoSection from "@/components/admin/property-form/extra-info-section.tsx";
import Popup from "@/components/popup.tsx";
import StatusCard from "@/components/status-card.tsx";

import type { AdminContext, PropertyFormInputs, ServerError } from "@/types.ts";
import { clearCache } from "@/hooks/use-cached-fetch.ts";

const backendURL = String(import.meta.env.VITE_BACKEND_URL);

const CreatePropertyForm = () => {
  const { authToken } = useOutletContext<AdminContext>();
  const { control, handleSubmit, reset, setError } =
    useForm<PropertyFormInputs>({
      defaultValues: {
        extra_media: [],
        description: "",
        benefits: [],
        address: "",
        state: "",
        lga: "",
        price: 0,
        type: undefined,
        offer: undefined,
        tags: {},
      },
    });
  const [isLoading, setIsLoading] = useState(false);
  const [statusCode, setStatusCode] = useState<number | null>(null);

  const onSubmit = async () => {
    let inputValues: PropertyFormInputs | undefined;

    const onSubmitSuccess: SubmitHandler<PropertyFormInputs> = (
      submittedData
    ) => {
      inputValues = submittedData;
    };
    await handleSubmit(onSubmitSuccess)();

    if (!inputValues) {
      setIsLoading(false);
      return;
    }

    return {
      ...inputValues,
      tags: JSON.stringify(inputValues.tags),
    };
  };

  return (
    <Form
      className="p-6"
      url={backendURL + "/api/v1/property/"}
      headers={{ Authorization: `Bearer ${authToken}` }}
      encType="multipart/form-data"
      onSubmit={() => {
        setIsLoading(true);
        return onSubmit();
      }}
      onSuccess={() => {
        setIsLoading(false);
        // clearCache so new property shows on main admin page
        // clears form inputs

        setStatusCode(200);
        clearCache();
        reset();
      }}
      onError={async (response) => {
        setIsLoading(false);
        //show error message
        const errorStatusCode =
          response instanceof Response ? response.status : 600;

        if (errorStatusCode === 400 && response instanceof Response) {
          const data = (await response.json()) as ServerError;
          Object.entries(data).forEach(([name, value]) => {
            setError(name as keyof ServerError, {
              type: "server",
              message: value[0],
            });
          });

          return;
        }
        setStatusCode(errorStatusCode);
        alert(response);
      }}
    >
      <FileUploadSection control={control} />
      <InfoSection control={control} />
      <LocationSection control={control} />
      <ExtraInfoSection control={control} />
      <button
        type="submit"
        disabled={isLoading}
        className="flex justify-center items-center bg-black text-white dark:bg-white dark:text-black w-full p-2 text-lg font-medium rounded-lg"
      >
        {isLoading ? <LoaderCircle className="animate-spin" /> : "Create"}
      </button>
      {statusCode && (
        <Popup
          open={Boolean(statusCode)}
          onClose={() => {
            setStatusCode(null);
          }}
        >
          <StatusCard
            status={statusCode}
            message={statusCode <= 299 ? "Property created successfully" : ""}
          />
        </Popup>
      )}
    </Form>
  );
};

export default CreatePropertyForm;
