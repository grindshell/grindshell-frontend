import TextInput from "@/components/TextInput";
import { createEffect, createSignal, Match, ParentProps, Setter, Switch } from "solid-js";

type Page = "login" | "register" | "forgot-password";

function LoginRegister() {
  const [currentPage, setCurrentPage] = createSignal<Page>("login");

  const year = new Date().getFullYear();

  return (
    <div class="min-h-full flex flex-col items-center justify-between">
      <div class="h-full md:m-10 flex items-center">
        <div class="card mx-auto w-full max-w-5xl shadow-xl">
          <div class="grid grid-cols-1 md:grid-cols-2 bg-base-200 rounded-xl">
            <Descriptor />

            <Switch>
              <Match when={currentPage() === "login"}>
                <Login setCurrentPage={setCurrentPage} />
              </Match>
              <Match when={currentPage() === "register"}>
                <Register setCurrentPage={setCurrentPage} />
              </Match>
              <Match when={currentPage() === "forgot-password"}>
                <ForgotPassword setCurrentPage={setCurrentPage} />
              </Match>
            </Switch>
          </div>
        </div>
      </div>
      <div class="divider"></div>
      <footer class="footer text-xs justify-center pb-2 sticky top-full">
        Copyright Grindshell {year}
      </footer>
    </div>
  );
}

function Descriptor() {
  // TODO server stats?

  return (
    <div class="hero min-h-full rounded-l-xl bg-base-300">
      <div class="hero-content py-12">
        <div class="max-w-md">
          <h1 class="text-3xl text-center font-bold">Grindshell</h1>
          <div class="text-center mt-12">A world fractured and society lost under the ruins of before. Lead your group of explorers to find what's left.</div>
        </div>
      </div>
    </div>
  );
}

type TemplateProps = ParentProps & {
  title: string,
  titleWarning?: string,
  onClick: (e: Event) => void,
  switchTarget?: Page,
  switchText?: string,
  setCurrentPage?: Setter<Page>,
  canSubmit: boolean;
};

function Template(props: TemplateProps) {
  return (
    <div class="py-24 px-10">
      <h2 class="text-2xl font-semibold text-center">{props.title}</h2>
      <div class="my-4">
        {props.children}
      </div>
      <button type="button" class="btn btn-primary w-full mt-2" onClick={props.onClick} disabled={!props.canSubmit}>Submit</button>
      {
        props.switchText &&
        props.switchTarget &&
        props.setCurrentPage &&
        <div>
          <div class="divider my-4"></div>
          <div
            class="text-center hover:cursor-pointer"
            onClick={() => props.setCurrentPage?.(props.switchTarget!)}
          >
            {props.switchText}
          </div>
        </div>
      }
    </div>
  );
}

type ChangePageProps = {
  setCurrentPage: Setter<Page>;
};

function Login(props: ChangePageProps) {
  const [username, setUsername] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [canSubmit, setCanSubmit] = createSignal(false);

  const [usernameError, setUsernameError] = createSignal<string | undefined>();

  createEffect(() => {
    setUsernameError(validateUsername(username()));
    setCanSubmit(usernameError() === undefined && password().length >= 10);

    if (import.meta.env.VITE_UI_DEV) {
      console.log("ui dev mode detected, allowing submit");
      setCanSubmit(true);
    }
  });

  const submit = (e: Event) => {
    e.preventDefault();

    if (import.meta.env.VITE_UI_DEV) {
      window.location.replace("game.html");
      return;
    }

    if (!import.meta.env.VITE_API_ENDPOINT) {
      console.error("currently in debug mode");
      return;
    }

    console.log(`${username()}:${password()}`);
  };

  return (
    <Template title="Login" onClick={submit} switchTarget="register" switchText="No account? Register!" setCurrentPage={props.setCurrentPage} canSubmit={canSubmit()}>
      <TextInput legend="Username" placeholder="Username" errText={usernameError()} onInput={(e) => setUsername(e.target.value)} />
      <TextInput type="password" legend="Password" placeholder="Password" onInput={(e) => setPassword(e.target.value)} />
      <div class="text-right text-primary hover:cursor-pointer" onClick={() => props.setCurrentPage("forgot-password")}>Forgot password?</div>
    </Template>
  );
}

function Register(props: ChangePageProps) {
  const [email, setEmail] = createSignal("");
  const [username, setUsername] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [canSubmit, setCanSubmit] = createSignal(false);

  const [emailError, setEmailError] = createSignal<string | undefined>();
  const [usernameError, setUsernameError] = createSignal<string | undefined>();
  const [passwordError, setPasswordError] = createSignal<string | undefined>();

  createEffect(() => {
    setEmailError(validateEmail(email()));
    setUsernameError(validateUsername(username()));
    setPasswordError(validatePassword(password()));

    setCanSubmit(emailError() === undefined && usernameError() === undefined && passwordError() === undefined && password().length >= 10);
  });

  const submit = (e: Event) => {
    e.preventDefault();

    if (!import.meta.env.VITE_API_ENDPOINT) {
      console.log("currently in debug mode");
      return;
    }
  };

  return (
    <Template title="Register" onClick={submit} switchTarget="login" switchText="Already have an account? Login!" setCurrentPage={props.setCurrentPage} canSubmit={canSubmit()}>
      <TextInput legend="Email" placeholder="your@email.address" errText={emailError()} onInput={(e) => setEmail(e.target.value)} />
      <TextInput legend="Username" placeholder="Username" errText={usernameError()} onInput={(e) => setUsername(e.target.value)} />
      <TextInput type="password" legend="Password" placeholder="Password" errText={passwordError()} onInput={(e) => setPassword(e.target.value)} />
    </Template>
  );
}

function ForgotPassword(props: ChangePageProps) {
  const [email, setEmail] = createSignal("");
  const [canSubmit, setCanSubmit] = createSignal(false);

  const [emailError, setEmailError] = createSignal<string | undefined>();

  createEffect(() => {
    setEmailError(validateEmail(email()));
    setCanSubmit(emailError() === undefined && email().length !== 0);
    console.log(email());
  });

  const submit = (e: Event) => {
    if (emailError() !== undefined || email().length === 0) {
      return;
    }

    e.preventDefault();
  };

  return (
    <Template title="Forgot Password" onClick={submit} canSubmit={canSubmit()}>
      <button class="btn mb-2" onClick={() => props.setCurrentPage("login")}>Back</button>
      <TextInput type="email" legend="Email" errText={emailError()} placeholder="your@email.address" onInput={(e) => setEmail(e.target.value)} />
    </Template>
  );
}

function validateUsername(username: string): string | undefined {
  if (username.length === 0) {
    return;
  }

  if (username.length < 3) {
    return "Username must be at least 3 characters long.";
  }
  if (username.includes(" ")) {
    return "Username may not include spaces.";
  }
  if (!/^[a-zA-Z0-9]*$/.test(username)) {
    return "Username must only use english alphanumeric characters.";
  }

  return;
}

function validateEmail(email: string): string | undefined {
  if (email.length === 0) {
    return;
  }

  if (!email.includes("@")) {
    return "Invalid email.";
  }
  const split = email.split("@");
  if (split.length != 2) {
    return "Invalid email.";
  }
  const ident = split[0];
  const domain = split[1];

  if (ident.length < 1) {
    return "Invalid email.";
  }

  const domainSplit = domain.split(".");
  if (domainSplit.length < 2 || domainSplit[0].length < 1 || domainSplit[1].length < 1) {
    return "Invalid email domain.";
  }

  return;
}

function validatePassword(password: string): string | undefined {
  if (password.length === 0) {
    return;
  }

  if (password.length < 10) {
    return "Password must be at least 10 characters long.";
  }

  return;
}

export default LoginRegister;
