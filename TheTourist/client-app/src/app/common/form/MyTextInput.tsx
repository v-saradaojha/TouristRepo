import { Field, useField } from "formik";
import { Input, Label } from "semantic-ui-react";

interface Props {
    placeholder: string;
    name: string;
    label?: string;
}

export default function MyTextInput(props: Readonly<Props>) {
    const [, meta] = useField(props.name);
    return (
        <div>          
            <Field name={props.name}>
                {({ field }: { field: Props }) => (
                    <Input
                        {...field}
                        {...props}
                        id={props.name}
                        //placeholder={props.placeholder}
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