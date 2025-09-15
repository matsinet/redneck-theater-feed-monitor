import Navigo from "navigo";
import html from "html-literal";
import * as views from "./views";

console.dir(views);

const router = new Navigo("/", { hash: true });

function render(viewName = 'media') {
  console.info("viewName", viewName);
  const view = views[viewName];

  console.dir(view);
  console.info(view.render(view.state));
  document.querySelector('.tab-container').innerHTML = html`
    ${view.render(view.state)}
  `;
}

router
  .on({
    "/": (match) => {
      console.dir(match);
      render();
    },
    "/:tabName": (match) => {
      console.info("tabName", match.hashString);
      render(match.hashString);
    },
  })
  .resolve();
