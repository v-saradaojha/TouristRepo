import {  Field, useField } from "formik";
import { Label } from "semantic-ui-react";
import ReactDatePicker, { ReactDatePickerProps } from "react-datepicker";


export default function MyTextInput(props: Readonly<Partial<ReactDatePickerProps>>) {
    const [, meta, helpers] = useField(props.name!);
    return (
      <div>
            
            <Field name={props.name}>
                {({ field }: { field: ReactDatePickerProps }) => (
                    <ReactDatePicker
                        {...field}
                        {...props}
                        selected={(field.value && new Date(field.value)) || null}
                        id={props.name}
                        onChange={value => helpers.setValue(value)}
                    />
                )}
            </Field>
            {meta.touched && meta.error && (
                <Label basic color='red'>{meta.error}</Label>
            )}
       </div>
    );
}