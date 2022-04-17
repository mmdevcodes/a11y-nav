import './index.css';
interface A11YNavOptions {
    animate?: boolean;
    duration?: number;
    useArrowKeys?: boolean;
    closeOnBlur?: boolean;
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
    options: A11YNavOptions;
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
    private getMenuDepthFromEl;
    private getMenuFromEl;
    private getControlFromEl;
    private getFocusableFromEl;
    private getControls;
    private getFocusables;
    destroy(): void;
}
export {};
