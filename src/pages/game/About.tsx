import { For } from "solid-js";

type Item = {
  title: string,
  desc: string,
  url: string;
};

const ITEMS: Item[] = [
  {
    title: "Source",
    desc: "Client (the thing you're using right now) source code.",
    url: "https://github.com/grindshell/grindshell-frontend"
  },
  {
    title: "SolidJS",
    desc: "UI framework.",
    url: "https://github.com/solidjs/solid"
  },
  {
    title: "Tailwind CSS",
    desc: "CSS stylng.",
    url: "https://github.com/tailwindlabs/tailwindcss"
  },
  {
    title: "daisyUI",
    desc: "Premade Tailwind CSS components.",
    url: "https://github.com/saadeghi/daisyui"
  },
  {
    title: "heroicons",
    desc: "Various SVG icons.",
    url: "https://heroicons.com/"
  },
  {
    title: "corvu",
    desc: "Resizable panels.",
    url: "https://github.com/corvudev/corvu/"
  },
  {
    title: "Tauri",
    desc: "Desktop versions of this client.",
    url: "https://github.com/tauri-apps/tauri"
  },
  {
    title: "Daisy UI Admin Dashboard Template - Dashwind",
    desc: "UI reference for creating this client.",
    url: "https://github.com/robbins23/daisyui-admin-dashboard-template"
  }
];

function About() {
  return (
    <div class="size-full">
      <For each={ITEMS}>
        {({ title, desc, url }) =>
          <>
            <div>
              <h2 class="text-2xl hover:underline"><a target="_blank" href={url}>{title}</a></h2>
              <p>{desc}</p>
            </div>
            <div class="divider"></div>
          </>
        }
      </For>
    </div>
  );
}

export default About;