import { Field, useField } from "formik";
import { Label, TextArea } from "semantic-ui-react";

interface Props {
    placeholder: string;
    name: string;
    rows:number;
    label?: string;
}

export default function MyTextArea(props: Readonly<Props>) {
    const [, meta] = useField(props.name);
    return (
       <div>
        
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
        </div>
    );
}