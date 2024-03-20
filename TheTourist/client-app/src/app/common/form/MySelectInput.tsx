import { Field, useField } from "formik";
import { Label, Select } from "semantic-ui-react";

interface Props {
    placeholder: string;
    name: string;
    options: { text: string; value: string }[];
    label?: string;
}

export default function MySelectInput(props: Readonly<Props>) {
    const [, meta, helpers] = useField(props.name);
    return (
        <div>
           
            <Field name={props.name}>
                {({ field }: { field: { value: string } }) => (
                    <Select
                        clearable
                        {...field}
                        {...props}
                        options={props.options}
                        value={field.value || ""}
                        id={props.name}
                        placeholder={props.placeholder}
                        error={!!meta.error}
                        onChange={(_event, data) => helpers.setValue(data.value)}
                        onBlur={() => helpers.setTouched(true)}
                    />
                )}
            </Field>
            {meta.touched && meta.error && (
                <Label basic color="red">
                    {meta.error}
                </Label>
            )}
        </div>
    );
}