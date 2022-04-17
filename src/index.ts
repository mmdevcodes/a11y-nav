import './index.css';
import A11YNav from './a11y-nav';
import Prism from "prismjs";

Prism.manual = true;
Prism.highlightAll();

const nav = document.querySelector<HTMLElement>('.a11y-nav');

if (nav) new A11YNav(nav);