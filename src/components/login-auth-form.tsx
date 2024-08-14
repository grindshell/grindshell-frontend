import type { SubmitHandler } from "@modular-forms/solid";
import { createForm } from "@modular-forms/solid";
import * as valibot from "valibot";

import { Button } from "~/components/solidui/button";
import { Grid } from "~/components/solidui/grid";
import { TextField, TextFieldInput, TextFieldLabel } from "~/components/solidui/text-field";
import { IconLoader } from "~/components/solidui/icons";

const LoginSchema = valibot.strictObject({
  username: valibot.pipe(valibot.string(), valibot.trim(), valibot.maxLength(32)),
  password: valibot.pipe(valibot.string(), valibot.trim(), valibot.maxLength(64))
});

type LoginFormData = valibot.InferOutput<typeof LoginSchema>;

const RegisterSchema = valibot.strictObject({
  ...LoginSchema.entries,
  email: valibot.pipe(valibot.string(), valibot.trim(), valibot.email())
});

type RegisterFormData = valibot.InferOutput<typeof RegisterSchema>;

const textFieldClass = "grid gap-2";
const textFieldLabelClass = "text-left"
const spinnerClass = "mr-2 size-4 animate-spin"

export function LoginForm() {
  const [authForm, { Form, Field }] = createForm<LoginFormData>();

  const handleSubmit: SubmitHandler<LoginFormData> = () => {
    // TODO stub
    return new Promise((resolve) => setTimeout(resolve, 1000));
  }

  return (
    <div class="grid">
      <Form onSubmit={handleSubmit}>
        <Grid class="gap-4">
          <Field name="username">
            {
              (_, props) => (
                <TextField class={textFieldClass}>
                  <TextFieldLabel class={textFieldLabelClass}>Username</TextFieldLabel>
                  <TextFieldInput {...props} type="text" placeholder="Username"></TextFieldInput>
                </TextField>
              )
            }
          </Field>
          <Field name="password">
            {
              (_, props) => (
                <TextField class={textFieldClass}>
                  <TextFieldLabel class={textFieldLabelClass}>Password</TextFieldLabel>
                  <TextFieldInput {...props} type="text" placeholder="Password"></TextFieldInput>
                </TextField>
              )
            }
          </Field>
          <Button type="submit" disabled={authForm.submitting}>
            {(authForm.submitting && <IconLoader class={spinnerClass} />) || "Login"}
          </Button>
        </Grid>
      </Form>
    </div>
  );
}

export function RegisterForm() {
  const [authForm, { Form, Field }] = createForm<RegisterFormData>();

  const handleSubmit: SubmitHandler<RegisterFormData> = () => {
    // TODO stub
    return new Promise((resolve) => setTimeout(resolve, 1000));
  }

  return (
    <div class="grid">
      <Form onSubmit={handleSubmit}>
        <Grid class="gap-4">
          <Field name="email">
            {
              (_, props) => (
                <TextField class={textFieldClass}>
                  <TextFieldLabel class={textFieldLabelClass}>Email</TextFieldLabel>
                  <TextFieldInput {...props} type="text" placeholder="your@email.com"></TextFieldInput>
                </TextField>
              )
            }
          </Field>
          <Field name="username">
            {
              (_, props) => (
                <TextField class={textFieldClass}>
                  <TextFieldLabel class={textFieldLabelClass}>Username</TextFieldLabel>
                  <TextFieldInput {...props} type="text" placeholder="Username"></TextFieldInput>
                </TextField>
              )
            }
          </Field>
          <Field name="password">
            {
              (_, props) => (
                <TextField class={textFieldClass}>
                  <TextFieldLabel class={textFieldLabelClass}>Password</TextFieldLabel>
                  <TextFieldInput {...props} type="text" placeholder="Password"></TextFieldInput>
                </TextField>
              )
            }
          </Field>
          <Button type="submit" disabled={authForm.submitting}>
            {(authForm.submitting && <IconLoader class={spinnerClass} />) || "Register"}
          </Button>
        </Grid>
      </Form>
    </div>
  )
}
