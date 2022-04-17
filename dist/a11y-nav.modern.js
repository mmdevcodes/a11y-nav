function e(){return e=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var s=arguments[t];for(var n in s)Object.prototype.hasOwnProperty.call(s,n)&&(e[n]=s[n])}return e},e.apply(this,arguments)}class t{constructor(t,s){this.nav=void 0,this.options=void 0,this.controls=void 0,this.menus=void 0,this.focusables=void 0,this.nav=t,this.options={animate:!0,duration:300,useArrowKeys:!0,closeOnBlur:!0},this.controls=this.getControls(),this.menus=this.controls.map(e=>e.menu),this.focusables=this.getFocusables(),this.options=e({},this.options,s),this.onButtonClick=this.onButtonClick.bind(this),this.onButtonKeyDown=this.onButtonKeyDown.bind(this),this.onFocusableKeyDown=this.onFocusableKeyDown.bind(this),this.onBlur=this.onBlur.bind(this),this.init()}init(){this.controls.forEach(e=>{e.menu.el.classList.add("a11y-nav-menu"),e.menu.el.setAttribute("tabindex","-1"),e.el.setAttribute("aria-expanded","false"),e.el.addEventListener("click",this.onButtonClick),e.el.addEventListener("keydown",this.onButtonKeyDown)}),this.focusables.forEach(e=>{e.addEventListener("keydown",this.onFocusableKeyDown)}),this.options.closeOnBlur&&this.nav.addEventListener("focusout",this.onBlur)}onButtonClick(e){const t=e.currentTarget,s=this.controls.find(e=>e.el===t),n="true"===(null==s?void 0:s.el.getAttribute("aria-expanded"));null!=s&&s.menu&&this.toggleMenu(s.menu,!n)}onButtonKeyDown(e){const t=this.getControlFromEl(e.target);if(!t)return;const s="true"===t.el.getAttribute("aria-expanded");if("Escape"===e.key)if(s)this.closeMenu(t.menu);else{const e=t.el.closest(".a11y-nav-active");if(e){const t=this.getMenuFromEl(e);t?(t.control.el.focus(),this.closeMenu(t)):(this.focusables[0].focus(),this.closeAllMenus())}else this.focusables[0].focus(),this.closeAllMenus()}else if("ArrowDown"===e.key&&s){var n;e.preventDefault(),null==(n=t.menu.el.querySelector("a, button"))||n.focus()}else{const s=this.focusables.filter(e=>this.getMenuDepthFromEl(e)===this.getMenuDepthFromEl(t.el)),n=s.findIndex(e=>e===t.el);this.options.useArrowKeys&&this.controlFocusByKey(e,s.map(e=>e),n)}}onFocusableKeyDown(e){const t=this.getFocusableFromEl(e.target);if(!t)return;if(this.controls.find(e=>e.el===t))return;if("Escape"===e.key){const e=t.closest(".a11y-nav-active");if(e){const t=this.getMenuFromEl(e);t?(t.control.el.focus(),this.closeMenu(t)):(this.focusables[0].focus(),this.closeAllMenus())}else this.focusables[0].focus(),this.closeAllMenus()}const s=this.focusables.filter(e=>this.getMenuDepthFromEl(e)===this.getMenuDepthFromEl(t)),n=s.findIndex(e=>e===t);this.options.useArrowKeys&&this.controlFocusByKey(e,s.map(e=>e),n)}onBlur(e){!this.nav.contains(e.relatedTarget)&&this.nav.querySelector(".a11y-nav-active")&&this.closeAllMenus()}controlFocusByKey(e,t,s){switch(e.key){case"ArrowUp":case"ArrowLeft":e.preventDefault(),s>-1&&t[Math.max(0,s-1)].focus();break;case"ArrowDown":case"ArrowRight":e.preventDefault(),s>-1&&t[Math.min(t.length-1,s+1)].focus()}}toggleMenu(e,t){t?this.openMenu(e):this.closeMenu(e)}openMenu(e){var t;this.menus.forEach(t=>{t!==e&&this.getMenuDepthFromEl(t.el)===this.getMenuDepthFromEl(e.el)&&this.closeMenu(t)}),e.el.classList.add("a11y-nav-active"),e.control.el.setAttribute("aria-expanded","true"),null==(t=e.el.parentElement)||t.classList.add("a11y-nav-child-open"),document.body.classList.add("a11y-nav-menu-open"),this.options.animate&&e.el.classList.add("a11y-nav-animate-in")}closeMenu(e){var t;e.el.querySelectorAll(".a11y-nav-menu").forEach(e=>{const t=this.getMenuFromEl(e);t&&this.closeMenu(t)}),document.body.classList.remove("a11y-nav-menu-open"),e.control.el.setAttribute("aria-expanded","false"),this.options.animate?(e.el.classList.remove("a11y-nav-animate-in"),e.el.classList.add("a11y-nav-animate-out"),setTimeout(()=>{var t;e.el.classList.remove("a11y-nav-active"),e.el.classList.remove("a11y-nav-animate-out"),null==(t=e.el.parentElement)||t.classList.remove("a11y-nav-child-open")},this.options.duration)):(e.el.classList.remove("a11y-nav-active"),null==(t=e.el.parentElement)||t.classList.remove("a11y-nav-child-open"))}closeAllMenus(){this.menus.forEach(e=>{this.closeMenu(e)})}getMenuDepthFromEl(e){let t=0,s=e.parentElement;for(;s&&s!==this.nav;)(s.classList.contains("a11y-nav-menu")||s===this.nav)&&t++,s=s.parentElement;return t}getMenuFromEl(e){var t;return null!=(t=this.menus.find(t=>t.el===e))?t:null}getControlFromEl(e){var t;return null!=(t=this.controls.find(t=>t.el===e))?t:null}getFocusableFromEl(e){var t;return null!=(t=this.focusables.find(t=>t===e))?t:null}getControls(){return Array.from(this.nav.querySelectorAll("button[aria-expanded][aria-controls]")).map(e=>{const t=e.getAttribute("aria-controls"),s=document.getElementById(null!=t?t:"");if(s){const t={el:e,menu:{el:s,id:s.id,hadTabIndex:s.hasAttribute("tabindex")}};return t.menu.control=t,t}return null}).flatMap(e=>e?[e]:[])}getFocusables(){return Array.from(this.nav.querySelectorAll("a, button"))}destroy(){this.closeAllMenus(),this.controls.forEach(e=>{e.menu.el.classList.remove("a11y-nav-menu"),e.menu.hadTabIndex||e.menu.el.removeAttribute("tabindex"),e.el.removeEventListener("click",this.onButtonClick),e.el.removeEventListener("keydown",this.onButtonKeyDown)}),this.focusables.forEach(e=>{e.removeEventListener("keydown",this.onFocusableKeyDown)}),this.nav.removeEventListener("focusout",this.onBlur)}}export{t as default};
