import React from "react";
import { useFormikContext } from "formik";

import AppButton from "../AppButton";

function SubmitButton({ title, style, textStyle}) {
  const { handleSubmit } = useFormikContext();

  return <AppButton title={title} onPress={handleSubmit} style={style} textStyle={textStyle} />;
}

export default SubmitButton;
