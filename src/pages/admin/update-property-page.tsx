import { useParams, useOutletContext } from "react-router";
import { useState, useEffect, useRef } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { LoaderCircle } from "lucide-react";

import Form from "@/components/form/form.tsx";
import FileUploadSection from "@/components/admin/property-form/file-upload-section.tsx";
import InfoSection from "@/components/admin/property-form/info-section.tsx";
import LocationSection from "@/components/admin/property-form/location-section.tsx";
import ExtraInfoSection from "@/components/admin/property-form/extra-info-section.tsx";
import Popup from "@/components/popup.tsx";
import StatusCard from "@/components/status-card.tsx";
import NotFoundPage from "../404-page.tsx";

import type {
  AdminContext,
  PropertyFormInputs,
  FormDataValues,
  Property,
  ServerError,
  FormDataObject,
} from "@/types.ts";
import { clearCache } from "@/hooks/use-cached-fetch.ts";
import { fetchJSON, urlToFile } from "@/helper.ts";
const backendURL = String(import.meta.env.VITE_BACKEND_URL);

const UpdatePropertyForm = () => {
  const { id } = useParams();
  const { authToken } = useOutletContext<AdminContext>();
  const { handleSubmit, control, reset, setError } =
    useForm<PropertyFormInputs>();
  const [retryCount, setRetryCount] = useState(0);
  const [isFetching, setIsFetching] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusCode, setStatusCode] = useState<number | null>(null);
  const currentPropertyDataRef = useRef<FormDataObject>({});

  const endpoint = `${backendURL}/api/v1/property/${String(id)}/`;
  const onSubmit = async () => {
    setIsSubmitting(true);
    let inputValues:
      | Record<keyof PropertyFormInputs, FormDataValues>
      | undefined;

    const onSubmitSuccess: SubmitHandler<PropertyFormInputs> = (
      submittedData
    ) => {
      inputValues = submittedData;
    };
    await handleSubmit(onSubmitSuccess)();

    if (!inputValues) return;

    const updatedFields: FormDataObject = {};
    // looks for updated fields by comparing them to their initial value
    Object.entries(inputValues).forEach(([key, value]) => {
      if (key === "extra_media") {
        updatedFields.extra_media = value;
      } else if (currentPropertyDataRef.current[key] !== value) {
        updatedFields[key] = key === "tags" ? JSON.stringify(value) : value;
      }
    });
    return updatedFields;
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    setIsFetching(true);
    void fetchJSON<Property>({
      url: endpoint,
      extraInit: { signal },
      onSuccess: async (data) => {
        // fetch data then convert the images into File objects to pass into File field
        const mainImageFile = await urlToFile(data.main_image);
        const arrayOfUrlToFile = data.extra_media.map((file) =>
          urlToFile(file.media)
        );
        const extraFiles = await Promise.all(arrayOfUrlToFile);
        const fetchedFormValues = {
          ...data,
          main_image: mainImageFile,
          extra_media: extraFiles,
          tags: data.tags,
        };
        reset(fetchedFormValues);
        currentPropertyDataRef.current = fetchedFormValues;
        setIsFetching(false);
      },
      onError: (status, error) => {
        if (status === 600) alert("Error: " + error);
        alert(JSON.stringify(error));
        setStatusCode(status);
        setIsFetching(false);
      },
    });
    return () => {
      controller.abort();
    };
  }, [retryCount, endpoint, reset]);

  if (statusCode === 404) return <NotFoundPage />;

  if (isFetching) return <LoaderCircle className="animate-spin" size="96" />;
  return (
    <Form
      className="p-6"
      url={endpoint}
      method="PATCH"
      headers={{ Authorization: `Bearer ${authToken}` }}
      encType="multipart/form-data"
      onSubmit={onSubmit}
      onSuccess={() => {
        setIsSubmitting(false);
        //Todo remove response.json after guarantee form works
        // clearCache so new property shows on main admin page
        // clears form inputs
        setStatusCode(200);
        clearCache();
      }}
      onError={async (response) => {
        setIsSubmitting(false);
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
          alert(JSON.stringify(data));
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
        disabled={isSubmitting}
        className="bg-black text-white dark:bg-white dark:text-black w-full p-2 text-lg font-medium rounded-lg"
      >
        {isSubmitting ? <LoaderCircle className="animate-spin" /> : "Update"}
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
            message={statusCode <= 299 ? "Property updated successfully" : ""}
            withRetry={Object.keys(currentPropertyDataRef).length < 1}
            onRetry={() => {
              setRetryCount((currentRetryCount) => currentRetryCount + 1);
            }}
          />
        </Popup>
      )}
    </Form>
  );
};

export default UpdatePropertyForm;
