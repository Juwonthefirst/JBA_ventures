import Form from "@/components/form/form.tsx";
import InputField from "@/components/form/input-field.tsx";

const CreatePropertyForm = () => {
    return (
        <div className="p-4">
            <Form className="p-2">
                <InputField label="Address" />
                <InputField label="Price" inputType="number"/>
            </Form>
        </div>
    );
};

export default CreatePropertyForm;
