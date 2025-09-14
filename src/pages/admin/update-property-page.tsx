import { useParams, useOutletContext } from "react-router";
import { useState, useEffect, useRef } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { LoaderCircle } from "lucide-react";

import Form from "@/components/form/form.tsx";
import FileUploadSection from "@/components/admin/property-form/file-upload-section.tsx";
import InfoSection from "@/components/admin/property-form/info-section.tsx";
import LocationSection from "@/components/admin/property-form/location-section.tsx";
import ExtraInfoSection from "@/components/admin/property-form/extra-info-section.tsx";

import type {
    AdminContext,
    PropertyFormInputs,
    FormDataValues,
    Property
} from "@/types.ts";
import { clearCache } from "@/hooks/use-cached-fetch.ts";
import { fetchJSON, urlToFile } from "@/helper.ts";

const backendURL = String(import.meta.env.VITE_BACKEND_URL);

const UpdatePropertyForm = () => {
    const { id } = useParams();
    const { authToken } = useOutletContext<AdminContext>();
    const { handleSubmit, control, reset } = useForm<PropertyFormInputs>();
    const [retryCount, setRetryCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const currentPropertyDataRef = useRef<{ [key: string]: FormDataValues }>(
        {}
    );
    if (typeof id !== "number") return;

    const endpoint = `${backendURL}/api/v1/property/${String(id)}`;
    const onSubmit = async () => {
        let inputValues: PropertyFormInputs | undefined;

        const onSubmitSuccess: SubmitHandler<PropertyFormInputs> = (
            submittedData
        ) => {
            inputValues = submittedData;
        };
        await handleSubmit(onSubmitSuccess)();

        if (!inputValues) return;

        const updatedFields: { [key: string]: FormDataValues } = {};
        // looks for updated fields by comparing them to their initial value
        Object.entries(inputValues).forEach(([key, value]) => {
            if (key === "extra_media") {
                updatedFields.extra_media = value
            } else if (currentPropertyDataRef.current[key] !== value) {
                updatedFields[key] =
                    key === tags ? JSON.stringify(value) : value;
            }
        });
        return updatedFields;
    };

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        setIsLoading(true);
        fetchJSON<Property>({
            url: endpoint,
            extraInit: { signal },
            onSuccess: async (data) => {
                setIsLoading(false);
                // fetch data then convert the images into File objects to pass into File field
                const arrayOfUrlToFile = data.extra_media.map((fileUrl) =>
                    urlToFile(fileUrl)
                );
                const [mainImageFile, ...extraFiles] = await Promise.all([
                    urlToFile(data.main_image),
                    ...arrayOfUrlToFile
                ]);

                const fetchedFormValues = {
                    ...data,
                    main_image: mainImageFile,
                    extra_media: extraFiles,
                    tags: JSON.parse(data.tags)
                };
                reset(fetchedFormValues);
                currentPropertyDataRef.current = fetchedFormValues;
            },
            onError: (status, error) => {
                if (status === 600) {
                    alert("Error: " + error);
                }
                alert(JSON.stringify(error));
            }
        });
        return () => {
            controller.abort();
        };
    }, [retryCount]);

    if (isLoading) return <LoaderCircle size="96" />;
    return (
        <Form
            className="p-6"
            url={endpoint}
            method="PATCH"
            headers={{ Authorization: `Bearer ${authToken}` }}
            encType="multipart/form-data"
            onSubmit={onSubmit}
            onSuccess={async (response) => {
                //Todo remove response.json after guarantee form works
                // clearCache so new property shows on main admin page
                // clears form inputs
                const data = await response.json();
                clearCache();
                alert(JSON.stringify(data));
            }}
            onError={async (response) => {
                //show error message
                if (response instanceof Response) {
                    const data = await response.json();
                    alert(JSON.stringify(data));
                    return;
                }
                alert(response);
            }}
        >
            <FileUploadSection control={control} />
            <InfoSection control={control} />
            <LocationSection control={control} />
            <ExtraInfoSection control={control} />
            <button
                type="submit"
                className="bg-black text-white dark:bg-white dark:text-black w-full p-2 text-lg font-medium rounded-lg"
            >
                Update
            </button>
        </Form>
    );
};

export default UpdatePropertyForm;
