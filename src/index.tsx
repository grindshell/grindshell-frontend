/* @refresh reload */
import { render, Portal } from "solid-js/web";
import { onMount } from "solid-js";
import "./app.css";

import { IconTerminal } from "./components/solidui/icons";
import { LoginForm, RegisterForm } from "~/components/login-auth-form";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./components/solidui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/solidui/tabs";

function Index() {
  // TODO testing
  // onMount(() => {
  //   window.location.assign("game");
  // });

  return (
    <div class="container relative lg:h-screen items-center justify-center lg:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div class="relative h-full flex flex-col bg-muted p-6 text-white">
        <div class="absolute inset-0 bg-zinc-900" />
        <div class="relative z-20 flex items-center text-lg font-medium">
          <IconTerminal class="mr-2 size-6" />
          Grindshell
        </div>
        <div class="relative z-20 mt-6">
          <p id="flavor-text" class="text-md italic">
            The world is a ruined husk. Urban sprawl has turned into urban decay,
            and yet life persists underneath the ashes of civilizations past.
            <br />
            <br />
            Grind out a place for yourself or be emtombed inside the shell of humanity.
          </p>
          <br />
          <p class="text-lg">
            Features:
          </p>
          <ol class="list-disc pl-4">
            <li>Idle in a text-based persistent browser game</li>
            <li>Grind for experience and materials in a player-driven economy</li>
            <li>Organize into guilds and subguilds with other players</li>
            <li>Chat with others using an in-game chat system</li>
          </ol>
        </div>
        <div class="relative z-20 mt-auto">
          <Table>
            <TableCaption>Stats</TableCaption>
            <TableBody>
              <TableRow>
                <TableCell>Players online</TableCell>
                <TableCell>0</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Current paradox</TableCell>
                <TableCell>0</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <footer class="z-20 mt-2">
          <p class="text-sm text-center text-muted-foreground">
            A game by <a
              href="https://github.com/you-win"
              target="_blank"
              class="hover:text-white underline hover:no-underline"
            >youwin</a>.
          </p>
          <button onClick={() => window.location.assign("game.html")}>game</button>
          <button onClick={() => window.location.assign("not-found")}>not found</button>
        </footer>
      </div>

      <div class="p-2">
        <div class="mx-auto flex w-full flex-col justify-center space-y-2 lg:w-[350px]">
          <div class="flex flex-col space-y-2 text-center">
            <Tabs defaultValue="login">
              <TabsList class="w-full grid grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <Portal mount={document.getElementById("auth-portal") as HTMLElement}>
                  <LoginForm />
                </Portal>
              </TabsContent>
              <TabsContent value="register">
                <Portal mount={document.getElementById("auth-portal") as HTMLElement}>
                  <RegisterForm />
                </Portal>
              </TabsContent>
            </Tabs>
          </div>
          <div id="auth-portal" class="lg:min-h-72"></div>
        </div>
      </div>

      {/* <div class="p-2">
          <div class="mx-auto flex w-full flex-col justify-center space-y-6 lg:w-[350px]">
            <div class="flex flex-col space-y-2 text-center">
              <h1 class="text-2xl font-semibold tracking-tight">Create an account</h1>
              <p class="text-sm text-muted-foreground">
                Enter your email below to create your account
              </p>
            </div>
            <LoginForm />
            <p class="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <a href="/terms" class="underline underline-offset-4 hover:text-primary">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="/privacy" class="underline underline-offset-4 hover:text-primary">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div> */}

    </div>
  )
}

render(() => <Index />, document.getElementById("root") as HTMLElement);
