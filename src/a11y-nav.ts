import "./a11y-nav.css";

interface A11YNavOptions {
  animate?: boolean;
  duration?: number;
  useArrowKeys?: boolean;
  closeOnBlur?: boolean;
  bodyClass?: string | boolean;
  focusOnOpen?: boolean;
}

interface Control {
  el: HTMLButtonElement;
  menu: Menu;
}

interface Menu {
  el: HTMLElement;
  id: string;
  control: Control;
  hadTabIndex: boolean;
}

export default class A11YNav {
  nav: HTMLElement;
  options: Required<A11YNavOptions>;
  controls: Control[];
  menus: Menu[];
  focusables: HTMLElement[];

  constructor(element: HTMLElement, options?: A11YNavOptions) {
    this.nav = element;
    this.options = {
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
    };
    this.controls = this.getControls();
    this.menus = this.controls.map((control) => control.menu);
    this.focusables = this.getFocusables();

    // Set user-inputted options if available
    this.options = { ...this.options, ...options };

    // Bind event handlers
    this.onButtonClick = this.onButtonClick.bind(this);
    this.onButtonKeyDown = this.onButtonKeyDown.bind(this);
    this.onFocusableKeyDown = this.onFocusableKeyDown.bind(this);
    this.onBlur = this.onBlur.bind(this);

    this.init();
  }

  private init(): void {
    this.controls.forEach((control) => {
      // set initial properties
      control.menu.el.classList.add("a11y-nav-menu");
      control.menu.el.setAttribute("tabindex", "-1");

      // Attach event listeners
      control.el.addEventListener("click", this.onButtonClick);
      control.el.addEventListener("keydown", this.onButtonKeyDown);

      // Open menu if aria-expanded is true on page load
      if (control.el.getAttribute("aria-expanded") === "true") {
        this.openMenu(control.menu, true);
      }
    });

    this.focusables.forEach((focusable) => {
      focusable.addEventListener("keydown", this.onFocusableKeyDown);
    });

    if (this.options.closeOnBlur) {
      this.nav.addEventListener("focusout", this.onBlur);
    }
  }

  private onButtonClick(event: MouseEvent): void {
    const button = event.currentTarget as HTMLButtonElement;
    const control = this.controls.find((control) => control.el === button);
    const isOpen = control?.el.getAttribute("aria-expanded") === "true";

    if (control?.menu) {
      this.toggleMenu(control.menu, !isOpen);
    }
  }

  private onButtonKeyDown(event: KeyboardEvent): void {
    const control = this.getControlFromEl(event.target as HTMLButtonElement);

    if (!control) return;

    const hasMenuOpen = control.el.getAttribute("aria-expanded") === "true";

    if (event.key === "Escape") {
      if (hasMenuOpen) {
        this.closeMenu(control.menu);
      } else {
        const closestMenuEl =
          control.el.closest<HTMLElement>(".a11y-nav-active");

        if (closestMenuEl) {
          const menu = this.getMenuFromEl(closestMenuEl);

          if (menu) {
            menu.control.el.focus();
            this.closeMenu(menu);
          } else {
            this.focusables[0].focus();
            this.closeAllMenus();
          }
        } else {
          this.focusables[0].focus();
          this.closeAllMenus();
        }
      }
    } else if (event.key === "ArrowDown" && hasMenuOpen) {
      event.preventDefault();
      control.menu.el.querySelector<HTMLElement>("a, button")?.focus();
    } else {
      const sameLevelFocusables = this.focusables.filter(
        (focusable) =>
          this.getMenuDepthFromEl(focusable) ===
          this.getMenuDepthFromEl(control.el)
      );
      const currentIndex = sameLevelFocusables.findIndex(
        (focusable) => focusable === control.el
      );

      if (this.options.useArrowKeys) {
        this.controlFocusByKey(
          event,
          sameLevelFocusables.map((focusable) => focusable),
          currentIndex
        );
      }
    }
  }

  private onFocusableKeyDown(event: KeyboardEvent): void {
    const el = event.target as HTMLButtonElement;
    const focusable = this.getFocusableFromEl(el);

    if (!focusable) {
      return;
    }
    // Let onButtonKeyDown handle the rest
    else if (this.controls.find((control) => control.el === focusable)) {
      return;
    } else if (event.key === "Escape") {
      const closestMenuEl = focusable.closest<HTMLElement>(".a11y-nav-active");

      if (closestMenuEl) {
        const menu = this.getMenuFromEl(closestMenuEl);

        if (menu) {
          menu.control.el.focus();
          this.closeMenu(menu);
        } else {
          this.focusables[0].focus();
          this.closeAllMenus();
        }
      } else {
        this.focusables[0].focus();
        this.closeAllMenus();
      }
    }

    const sameLevelFocusables = this.focusables.filter(
      (f) => this.getMenuDepthFromEl(f) === this.getMenuDepthFromEl(focusable)
    );
    const currentIndex = sameLevelFocusables.findIndex((f) => f === focusable);

    if (this.options.useArrowKeys) {
      this.controlFocusByKey(
        event,
        sameLevelFocusables.map((f) => f),
        currentIndex
      );
    }
  }

  private onBlur(event: FocusEvent): void {
    const menuContainsFocus = this.nav.contains(
      event.relatedTarget as HTMLElement
    );

    if (
      !menuContainsFocus &&
      !!this.nav.querySelector<HTMLElement>(".a11y-nav-active")
    ) {
      this.closeAllMenus();
    }
  }

  private controlFocusByKey(
    event: KeyboardEvent,
    els: HTMLElement[],
    currentIndex: number
  ): void {
    switch (event.key) {
      case "ArrowUp":
      case "ArrowLeft":
        event.preventDefault();
        if (currentIndex > -1) {
          const prevIndex = Math.max(0, currentIndex - 1);
          els[prevIndex].focus();
        }
        break;
      case "ArrowDown":
      case "ArrowRight":
        event.preventDefault();
        if (currentIndex > -1) {
          const nextIndex = Math.min(els.length - 1, currentIndex + 1);
          els[nextIndex].focus();
        }
        break;
    }
  }

  private toggleMenu(menu: Menu, show: boolean): void {
    if (show) {
      this.openMenu(menu);
    } else {
      this.closeMenu(menu);
    }
  }

  private openMenu(menu: Menu, forceNoFocus = false): void {
    // Close all other menus on the same level
    this.menus.forEach((otherMenu) => {
      if (
        otherMenu.el !== menu.el &&
        otherMenu.el.classList.contains("a11y-nav-active") &&
        this.getMenuDepthFromEl(otherMenu.el) ===
          this.getMenuDepthFromEl(menu.el)
      ) {
        this.closeMenu(otherMenu);
      }
    });

    // Assign classes/properties
    menu.el.classList.add("a11y-nav-active");
    menu.control.el.setAttribute("aria-expanded", "true");
    menu.el.parentElement?.classList.add("a11y-nav-child-open");
    if (
      typeof this.options.bodyClass === "string" &&
      this.options.bodyClass.length > 0
    ) {
      document.body.classList.add(this.options.bodyClass);
    }

    if (this.options.animate) {
      menu.el.classList.add("a11y-nav-animate-in");

      if (!forceNoFocus && this.options.focusOnOpen) {
        setTimeout(() => {
          menu.el.focus();
        }, this.options.duration);
      }
    } else {
      if (!forceNoFocus && this.options.focusOnOpen) {
        menu.el.focus();
      }
    }
  }

  private closeMenu(menu: Menu): void {
    // Skip this if it's already closed
    if (!menu.el.classList.contains("a11y-nav-active")) return;
    
    // Close all children menus currently open first
    menu.el
      .querySelectorAll<HTMLElement>(".a11y-nav-menu")
      .forEach((childMenuEl) => {
        const childMenu = this.getMenuFromEl(childMenuEl);

        if (childMenu) this.closeMenu(childMenu);
      });

    // Checks if any other menus are open on other levels
    const hasOtherOpenMenus = this.menus.some(
      (m) => m.el.classList.contains("a11y-nav-active") && m.el !== menu.el
    );

    // Set classes/properties
    if (typeof this.options.bodyClass === "string" && !hasOtherOpenMenus) {
      document.body.classList.remove(this.options.bodyClass);
    }
    menu.control.el.setAttribute("aria-expanded", "false");

    if (this.options.animate) {
      menu.el.classList.remove("a11y-nav-animate-in");
      menu.el.classList.add("a11y-nav-animate-out");

      setTimeout(() => {
        menu.el.classList.remove("a11y-nav-active");
        menu.el.classList.remove("a11y-nav-animate-out");
        menu.el.parentElement?.classList.remove("a11y-nav-child-open");
      }, this.options.duration);
    } else {
      menu.el.classList.remove("a11y-nav-active");
      menu.el.parentElement?.classList.remove("a11y-nav-child-open");
    }
  }

  public closeAllMenus(): void {
    this.menus.forEach((menu) => {
      this.closeMenu(menu);
    });
    
    if (typeof this.options.bodyClass === "string") {
      document.body.classList.remove(this.options.bodyClass);
    }
  }

  /** Get the menu depth of an element */
  private getMenuDepthFromEl(element: HTMLElement): number {
    let level = 0;
    let parent = element.parentElement;

    while (parent && parent !== this.nav) {
      if (parent.classList.contains("a11y-nav-menu") || parent === this.nav) {
        level++;
      }
      parent = parent.parentElement;
    }

    return level;
  }

  private getMenuFromEl(element: HTMLElement): Menu | null {
    return this.menus.find((menu) => menu.el === element) ?? null;
  }

  private getControlFromEl(element: HTMLElement): Control | null {
    return this.controls.find((control) => control.el === element) ?? null;
  }

  private getFocusableFromEl(element: HTMLElement): HTMLElement | null {
    return this.focusables.find((focusable) => focusable === element) ?? null;
  }

  private getControls(): Control[] {
    return Array.from(
      this.nav.querySelectorAll<HTMLButtonElement>(
        "button[aria-expanded][aria-controls]"
      )
    )
      .map((element) => {
        const id = element.getAttribute("aria-controls");
        const menu = document.getElementById(id ?? "");

        if (menu) {
          const control: Control = {
            el: element,
            menu: {
              el: menu,
              id: menu.id,
              hadTabIndex: menu.hasAttribute("tabindex"),
            },
          } as Control;

          control.menu.control = control;

          return control;
        } else {
          return null;
        }
      })
      .flatMap((control) => (control ? [control] : []));
  }

  private getFocusables(): HTMLElement[] {
    return Array.from(this.nav.querySelectorAll<HTMLElement>("a, button"));
  }

  public destroy(): void {
    this.closeAllMenus();

    this.controls.forEach((control) => {
      control.menu.el.classList.remove("a11y-nav-menu");
      if (!control.menu.hadTabIndex) {
        control.menu.el.removeAttribute("tabindex");
      }

      control.el.removeEventListener("click", this.onButtonClick);
      control.el.removeEventListener("keydown", this.onButtonKeyDown);
    });

    this.focusables.forEach((focusable) => {
      focusable.removeEventListener("keydown", this.onFocusableKeyDown);
    });

    this.nav.removeEventListener("focusout", this.onBlur);
  }
}
