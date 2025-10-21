import { useParams } from "react-router";
import { useEffect, useRef, useState } from "react";
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
  PropertyFormInputs,
  FormDataValues,
  FormDataObject,
  Property,
} from "@/types.ts";
import axios from "axios";
import useMutatingForm from "@/hooks/use-mutating-form.ts";
import { useQuery } from "@tanstack/react-query";
import { propertyIdQueryOPtion } from "@/queryOptions.ts";
import { urlToFile } from "@/helper.ts";

const UpdatePropertyForm = () => {
  const { id } = useParams();
  const [isLoadingProperty, setIsLoadingProperty] = useState(true);

  const propertyQuery = useQuery({
    ...propertyIdQueryOPtion(String(id)),
    staleTime: Infinity,
  });
  const form = useMutatingForm({
    url: `/property/${String(id)}/`,
    method: "patch",
    onSuccess(data, context) {
      context.client.setQueryData<Property>(["property", data.id], () => data);
      void context.client.invalidateQueries({ queryKey: ["properties"] });
    },
  });
  const currentPropertyDataRef = useRef<FormDataObject>({});

  const onSubmit = (
    inputValues: Record<keyof PropertyFormInputs, FormDataValues>
  ) => {
    const updatedFields: FormDataObject = {};
    // looks for updated fields by comparing them to their initial value

    Object.entries(inputValues).forEach(([key, value]) => {
      if (key === "extra_media") {
        updatedFields.extra_media = value;
      } else if (currentPropertyDataRef.current[key] !== value) {
        updatedFields[key] = key === "tags" ? JSON.stringify(value) : value;
      }
    });
    form.submit({ formData: updatedFields });
  };

  useEffect(() => {
    if (propertyQuery.data && isLoadingProperty) {
      void (async () => {
        const propertyData = propertyQuery.data;
        const mainImageFile = await urlToFile(propertyData.main_image);
        const arrayOfUrlToFile = propertyData.extra_media.map((file) =>
          urlToFile(file.media)
        );
        const extraFiles = await Promise.all(arrayOfUrlToFile);
        const fetchedFormValues = {
          ...propertyData,
          main_image: mainImageFile,
          extra_media: extraFiles,
          tags: propertyData.tags,
        };
        form.reset(fetchedFormValues);
        currentPropertyDataRef.current = fetchedFormValues;
        setIsLoadingProperty(false);
      })();
    }
  }, [propertyQuery.data, form, isLoadingProperty]);

  if (
    propertyQuery.isError &&
    axios.isAxiosError(propertyQuery.error) &&
    propertyQuery.error.response?.status === 404
  )
    return <NotFoundPage />;

  if (isLoadingProperty)
    return (
      <div className="bg-[url('/images/light-loading.gif')] dark:bg-[url('/images/loading.gif')] h-[calc(100svh/2)] w-[calc(100svw*0.75)] bg-center bg-no-repeat mx-auto mt-12"></div>
    );

  return (
    <Form onSubmit={() => form.verifySubmit(onSubmit)}>
      <FileUploadSection control={form.control} />
      <InfoSection control={form.control} />
      <LocationSection control={form.control} watch={form.watch} />
      <ExtraInfoSection control={form.control} />
      <button
        type="submit"
        disabled={form.isSubmitting}
        className="bg-black text-white dark:bg-white dark:text-black w-full p-2 text-lg font-medium rounded-lg flex justify-center items-center"
      >
        {form.isSubmitting ? (
          <LoaderCircle className="animate-spin" />
        ) : (
          "Update"
        )}
      </button>
      {form.isFailed &&
        axios.isAxiosError(form.error) &&
        form.error.response?.status !== 400 && (
          <Popup
            open={form.isFailed}
            onClose={() => {
              form.clearState();
            }}
          >
            <StatusCard status={form.error.response?.status || 600} />
          </Popup>
        )}

      {form.isSuccess && (
        <Popup
          open={form.isSuccess}
          onClose={() => {
            form.clearState();
          }}
        >
          <StatusCard status={200} message="Property updated successfully" />
        </Popup>
      )}
    </Form>
  );
};

export default UpdatePropertyForm;
