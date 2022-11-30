import A11YNav from './a11y-nav';
import Prism from "prismjs";
import './index.css';

Prism.manual = true;
Prism.highlightAll();

const mainNav = document.querySelector<HTMLElement>('.main-nav');
const railNav = document.querySelector<HTMLElement>('.rail-nav');

mainNav?.addEventListener("init", ((event: CustomEvent) => {
  console.log(event.detail)
}) as EventListener);

mainNav?.addEventListener("beforeOpen", ((event: CustomEvent) => {
  console.log(event.detail)
}) as EventListener);

mainNav?.addEventListener("afterClose", ((event: CustomEvent) => {
  console.log(event)
}) as EventListener);

if (mainNav) new A11YNav(mainNav);
if (railNav) new A11YNav(railNav);