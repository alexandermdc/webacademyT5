import { Tecnologia } from "./helpersTypes";
export function listTecnologias(techs: Tecnologia[]) {
  const list = techs.map((t) => `<li>${t.name} - ${t.type} - ${t.poweredByNodejs ? "Sim" : "Não"}</li>`);
  return `<ul>${list.join('')}</ul>`;
}