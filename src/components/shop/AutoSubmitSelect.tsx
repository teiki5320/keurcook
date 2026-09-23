"use client";

import type { ComponentProps } from "react";

/** <select> qui soumet son formulaire dès qu'on change de valeur. */
export function AutoSubmitSelect(props: ComponentProps<"select">) {
  return <select {...props} onChange={(e) => e.currentTarget.form?.requestSubmit()} />;
}
