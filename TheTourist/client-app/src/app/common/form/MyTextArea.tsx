import { Field, Form, useField } from "formik";
import { Label, TextArea } from "semantic-ui-react";

interface Props {
    placeholder: string;
    name: string;
    rows:number;
    label?: string;
}

export default function MyTextArea(props: Props) {
    const [, meta] = useField(props.name);
    return (
        <Form>
            <label htmlFor={props.name}>{props.label}</label>
            <Field name={props.name}>
                {({ field }: { field: Props }) => (
                    <TextArea
                        {...field}
                        {...props}
                        id={props.name}
                        placeholder={props.placeholder}
                        error={meta.touched && !!meta.error}
                    />
                )}
            </Field>
            {meta.touched && meta.error && (
                <Label basic color='red'>{meta.error}</Label>
            )}
        </Form>
    );
}