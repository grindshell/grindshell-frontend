/* @refresh reload */
import { render } from "solid-js/web";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/solidui/card";
import { TextField, TextFieldInput, TextFieldLabel } from "./components/solidui/text-field";

function VerifyAccount() {
  return (
    <>
      <div class="container relative h-screen flex flex-col items-center justify-center">
        <div class="p-2">
          <Card>
            <CardHeader>
              <CardTitle class="text-lg text-center">Verify account</CardTitle>
              <CardDescription>Enter your verification code below to verify your account.</CardDescription>
            </CardHeader>

            <CardContent>
              <TextField>
                <TextFieldLabel>Verification code</TextFieldLabel>
                <TextFieldInput type="text"></TextFieldInput>
              </TextField>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}

render(() => <VerifyAccount />, document.getElementById("root") as HTMLElement);
