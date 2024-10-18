import {
  type ComponentPropsWithoutRef,
  type FormEvent,
  forwardRef,
  useRef,
  useImperativeHandle,
} from "react";

type FormProps = ComponentPropsWithoutRef<"form"> & {
  onSave: (value: unknown) => void;
};

export type FormHandle = { clear: () => void };

const Form = forwardRef<FormHandle, FormProps>(function Form(
  { onSave, children, ...otherProps },
  ref
) {
  const form = useRef<HTMLFormElement>(null);
  // hook exposes API in this Form component. requires usimg forwardedref.
  useImperativeHandle(ref, () => {
    return {
      // method made availble outside the component
      clear() {
        console.log("clearing");
        form.current?.reset();
      },
    };
  });


  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);
    onSave(data);
  }

  return (
    <form onSubmit={handleSubmit} {...otherProps} ref={form}>
      {children}
    </form>
  );
});

export default Form;
