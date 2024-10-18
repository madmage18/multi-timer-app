import { useRef } from "react";
import DOMPurify from "dompurify";
// import sanitizeHtml from "sanitize-html";
import Button from "./shared/Button.tsx";
import Form, { FormHandle } from "./shared/Form.tsx";
import Input from "./shared/Input.tsx";
import { useTimersContext } from "../store/timers-context.tsx";

const sanitizeNumber = (value: string) => {
  const sanitizedValue = parseFloat(value);
  return isNaN(sanitizedValue) ? 0 : sanitizedValue;
};

export default function AddTimer() {
  const form = useRef<FormHandle>(null);
  const { addTimer } = useTimersContext();

  function handleSaveTimer(data: unknown) {
    const extractedData = data as { name: string; duration: string };

    // method calls a dispatch. Adds new timer to Timer[]
    addTimer({
      isCompleted: false,
      // below values sanitized
      name: DOMPurify.sanitize(extractedData.name, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] }),
      duration: sanitizeNumber(extractedData.duration),
    });

    form.current?.clear();
  }

  return (
    <Form ref={form} onSave={handleSaveTimer} id="add-timer">
      <Input type="text" label="Name" id="name" />
      <Input type="number" label="Duration (# of seconds)" id="duration" />
      <p>
        <Button>Add Timer</Button>
      </p>
    </Form>
  );
}
