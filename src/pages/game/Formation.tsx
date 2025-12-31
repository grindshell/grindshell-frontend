import { createSignal, For, Match, ParentProps, Switch } from "solid-js";

// TODO test data
const unitData: { id: number, name: string, formation?: string, status?: string; }[] = [
  {
    id: 2,
    name: "Adventurer",
    status: "Ok"
  },
  {
    id: 3,
    name: "test",
    formation: "Main"
  }
];

type UnitView = "table" | "detail";

function Formation() {
  const [unitView, setUnitView] = createSignal<UnitView>("table");
  const [unitDetailID, setUnitDetailID] = createSignal(0);

  return (
    <div class="size-full tabs tabs-box">
      <input type="radio" name="formation_tabs" class="tab" aria-label="Units" checked />
      <TabContent>
        <Switch>
          <Match when={unitView() === "table"}>
            <table class="table">
              <thead class="text-base-content">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Formation</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody class="text-base-content">
                <For each={unitData}>
                  {({ id, name, formation, status }) =>
                    <UnitRow
                      onClick={() => {
                        setUnitDetailID(id);
                        setUnitView("detail");
                      }}
                      id={id}
                      name={name}
                      formation={formation}
                      status={status}
                    />
                  }
                </For>
              </tbody>
            </table>
          </Match>
          <Match when={unitView() == "detail"}>
            <UnitDetail
              backButtonHandler={() => setUnitView("table")}
              unitID={unitDetailID()}
            />
          </Match>
        </Switch>
      </TabContent>

      <input type="radio" name="formation_tabs" class="tab" aria-label="Formation" />
      <TabContent>

      </TabContent>
    </div>
  );
}

function TabContent(props: ParentProps) {
  return (
    <div class="tab-content bg-base-100 border-base-content p-6 overflow-auto">
      {props.children}
    </div>
  );
}

type UnitRowProps = {
  onClick: () => void,
  id: number,
  name: string,
  formation?: string;
  status?: string;
};

function UnitRow(props: UnitRowProps) {
  return (
    <tr class="hover:bg-base-300" onClick={() => props.onClick()}>
      <td>{props.id}</td>
      <td>{props.name}</td>
      <td>{props.formation}</td>
      <td>{props.status}</td>
    </tr>
  );
}

type UnitDetailProps = {
  backButtonHandler: () => void,
  unitID: number;
};

function UnitDetail(props: UnitDetailProps) {
  // TODO pull this from ctx in the real impl
  let unit = unitData.find((v) => v.id === props.unitID)!;

  return (
    <div class="flex flex-col">
      <div>
        <button class="btn" onClick={() => props.backButtonHandler()}>Back</button>
      </div>

      <div>
        <h2 class="text-2xl text-center">{unit.name}</h2>
      </div>
    </div>
  );
}

export default Formation;