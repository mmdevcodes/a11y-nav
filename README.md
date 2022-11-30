# A11Y Nav

Library for accessible navigations. https://mmahandev.github.io/a11y-nav/

Currently a work in progress, but it has bare minimum functionality needed for production use. Will be adding features as I need them.

## Install

Using npm:

```bash
npm install a11y-nav
```

Using browser:

```html
<!-- In the <head> -->
<link rel="stylesheet" href="//unpkg.com/a11y-nav@latest/dist/a11y-nav.css" />

<!-- End of <body> -->
<script src="//unpkg.com/a11y-nav@latest/dist/a11y-nav.umd.js"></script>
```

## Usage

Build your standard UL/LI navigation and give all menus a `<button>` with an `aria-expanded` and `aria-controls` attribute. Point the ID to the menu element. Example: 

```html
<ul class="a11y-nav">
  <li>
    <button aria-expanded="false" aria-controls="id_here">First Level Item</button>
    <ul id="id_here">
      <li>
        <button aria-expanded="false" aria-controls="id_here_2">Second Level Item</button>
        <ul id="id_here_2">
            <li><a href="#">Example Inner Link 1</a></li>
            <li><a href="#">Example Inner Link 2</a></li>
        </ul>
      </li>
      <li><a href="#">Example Link</a></li>
    </ul>
  </li>
</ul>
```

Then initialize A11YNav. The `options` is an optional parameter:

```js
const nav = new A11YNav(document.querySelector(".a11y-nav"), options);
```

## Options

```js
// Default options:
{
  // adds delay for toggling menu open/close animation classes
  animate: true,
  // amount of time in ms for menu open/close animation
  duration: 300,
  // Enables use of arrow keys to navigate menus
  useArrowKeys: true,
  // Enables closing of menus when focus leaves the nav
  closeOnBlur: true,
  // Class to add to body when a menu is open. If false, no class is added.
  bodyClass: "a11y-nav-menu-open",
  // Focus menu that just opened
  focusOnOpen: true,
}
```

## Methods

```js
// Example use of the 'destroy' method.
nav.destroy();
```

| Method         | Description                                               |
| -------------  | --------------------------------------------------------- |
| destroy        | Removes everything that the A11YNav created in the DOM    |
| closeAllMenus  | Closes all currently opened menus                         |

## Events

```js
// Example use of the 'afterOpen' event
const navEl = document.querySelector(".a11y-nav");

navEl.addEventListener("afterOpen", function (e) {
  console.log(e.detail.menu);
});

const a11yNav = new A11YNav(navEl);
```

| Event         | Detail                              | Description                         |
| ------------- | ----------------------------------- | ----------------------------------- |
| init          | a11yNav                             | Fires after nav initialization      |
| beforeOpen    | a11yNav, menu                       | Fires before menu open              |
| afterOpen     | a11yNav, menu                       | Fires after menu open               |
| beforeClose   | a11yNav, menu                       | Fires before menu close             |
| afterClose    | a11yNav, menu                       | Fires after menu close              |
| destroy       | a11yNav                             | Fires after the nav is destroyed    |

Events listeners should be added before initializing the nav if possible. For example `init` will require it.

## Browser support

Currently works in all browsers except IE 11 until I figure out how to correctly polyfill the UMD build.