import { isAxiosError } from "axios";
import { LoaderCircle } from "lucide-react";

import Form from "@/components/form/form.tsx";
import FileUploadSection from "@/components/admin/property-form/file-upload-section.tsx";
import InfoSection from "@/components/admin/property-form/info-section.tsx";
import LocationSection from "@/components/admin/property-form/location-section.tsx";
import ExtraInfoSection from "@/components/admin/property-form/extra-info-section.tsx";
import Popup from "@/components/popup.tsx";
import StatusCard from "@/components/status-card.tsx";

import type { PropertyFormInputs } from "@/types.ts";
import useMutatingForm from "@/hooks/use-mutating-form";

const CreatePropertyForm = () => {
  const form = useMutatingForm({
    url: "/property/",
    method: "post",
    defaultValues: {
      extra_media: [],
      description: "",
      benefits: [],
      address: "",
      state: " ",
      lga: " ",
      price: 0,
      type: "",
      offer: "",
      tags: {},
    },
    onSuccess(data, context) {
      context.client.setQueryData(["property", data.id], () => data);
      void context.client.invalidateQueries({ queryKey: ["properties"] });
      form.reset();
    },
  });

  const onSubmit = (inputValues: PropertyFormInputs) => {
    const uploadedData = {
      ...inputValues,
      tags: JSON.stringify(inputValues.tags),
    };

    form.submit({
      formData: uploadedData,
    });
  };

  return (
    <Form onSubmit={() => form.verifySubmit(onSubmit)}>
      <FileUploadSection control={form.control} />
      <InfoSection control={form.control} />
      <LocationSection control={form.control} watch={form.watch} />
      <ExtraInfoSection control={form.control} />
      <button
        type="submit"
        disabled={form.isSubmitting}
        className="flex justify-center items-center bg-black text-white dark:bg-white dark:text-black w-full p-2 text-lg font-medium rounded-lg"
      >
        {form.isSubmitting ? (
          <LoaderCircle className="animate-spin" />
        ) : (
          "Create"
        )}
      </button>
      {form.isFailed &&
        isAxiosError(form.error) &&
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
          <StatusCard status={201} message="Property created successfully" />
        </Popup>
      )}
    </Form>
  );
};

export default CreatePropertyForm;
