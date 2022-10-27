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
    constructor(element: HTMLElement, options?: A11YNavOptions);
    private init;
    private onButtonClick;
    private onButtonKeyDown;
    private onFocusableKeyDown;
    private onBlur;
    private controlFocusByKey;
    private toggleMenu;
    private openMenu;
    private closeMenu;
    closeAllMenus(): void;
    /** Get the menu depth of an element */
    private getMenuDepthFromEl;
    private getMenuFromEl;
    private getControlFromEl;
    private getFocusableFromEl;
    private getControls;
    private getFocusables;
    destroy(): void;
}
export {};
