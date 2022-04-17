function e(){return e=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},e.apply(this,arguments)}module.exports=/*#__PURE__*/function(){function t(t,n){this.nav=void 0,this.options=void 0,this.controls=void 0,this.menus=void 0,this.focusables=void 0,this.nav=t,this.options={animate:!0,duration:300,useArrowKeys:!0,closeOnBlur:!0},this.controls=this.getControls(),this.menus=this.controls.map(function(e){return e.menu}),this.focusables=this.getFocusables(),this.options=e({},this.options,n),this.onButtonClick=this.onButtonClick.bind(this),this.onButtonKeyDown=this.onButtonKeyDown.bind(this),this.onFocusableKeyDown=this.onFocusableKeyDown.bind(this),this.onBlur=this.onBlur.bind(this),this.init()}var n=t.prototype;return n.init=function(){var e=this;this.controls.forEach(function(t){t.menu.el.classList.add("a11y-nav-menu"),t.menu.el.setAttribute("tabindex","-1"),t.el.setAttribute("aria-expanded","false"),t.el.addEventListener("click",e.onButtonClick),t.el.addEventListener("keydown",e.onButtonKeyDown)}),this.focusables.forEach(function(t){t.addEventListener("keydown",e.onFocusableKeyDown)}),this.options.closeOnBlur&&this.nav.addEventListener("focusout",this.onBlur)},n.onButtonClick=function(e){var t=e.currentTarget,n=this.controls.find(function(e){return e.el===t}),o="true"===(null==n?void 0:n.el.getAttribute("aria-expanded"));null!=n&&n.menu&&this.toggleMenu(n.menu,!o)},n.onButtonKeyDown=function(e){var t=this,n=this.getControlFromEl(e.target);if(n){var o="true"===n.el.getAttribute("aria-expanded");if("Escape"===e.key)if(o)this.closeMenu(n.menu);else{var s=n.el.closest(".a11y-nav-active");if(s){var i=this.getMenuFromEl(s);i?(i.control.el.focus(),this.closeMenu(i)):(this.focusables[0].focus(),this.closeAllMenus())}else this.focusables[0].focus(),this.closeAllMenus()}else if("ArrowDown"===e.key&&o){var r;e.preventDefault(),null==(r=n.menu.el.querySelector("a, button"))||r.focus()}else{var l=this.focusables.filter(function(e){return t.getMenuDepthFromEl(e)===t.getMenuDepthFromEl(n.el)}),u=l.findIndex(function(e){return e===n.el});this.options.useArrowKeys&&this.controlFocusByKey(e,l.map(function(e){return e}),u)}}},n.onFocusableKeyDown=function(e){var t=this,n=this.getFocusableFromEl(e.target);if(n&&!this.controls.find(function(e){return e.el===n})){if("Escape"===e.key){var o=n.closest(".a11y-nav-active");if(o){var s=this.getMenuFromEl(o);s?(s.control.el.focus(),this.closeMenu(s)):(this.focusables[0].focus(),this.closeAllMenus())}else this.focusables[0].focus(),this.closeAllMenus()}var i=this.focusables.filter(function(e){return t.getMenuDepthFromEl(e)===t.getMenuDepthFromEl(n)}),r=i.findIndex(function(e){return e===n});this.options.useArrowKeys&&this.controlFocusByKey(e,i.map(function(e){return e}),r)}},n.onBlur=function(e){!this.nav.contains(e.relatedTarget)&&this.nav.querySelector(".a11y-nav-active")&&this.closeAllMenus()},n.controlFocusByKey=function(e,t,n){switch(e.key){case"ArrowUp":case"ArrowLeft":e.preventDefault(),n>-1&&t[Math.max(0,n-1)].focus();break;case"ArrowDown":case"ArrowRight":e.preventDefault(),n>-1&&t[Math.min(t.length-1,n+1)].focus()}},n.toggleMenu=function(e,t){t?this.openMenu(e):this.closeMenu(e)},n.openMenu=function(e){var t,n=this;this.menus.forEach(function(t){t!==e&&n.getMenuDepthFromEl(t.el)===n.getMenuDepthFromEl(e.el)&&n.closeMenu(t)}),e.el.classList.add("a11y-nav-active"),e.control.el.setAttribute("aria-expanded","true"),null==(t=e.el.parentElement)||t.classList.add("a11y-nav-child-open"),document.body.classList.add("a11y-nav-menu-open"),this.options.animate&&e.el.classList.add("a11y-nav-animate-in")},n.closeMenu=function(e){var t,n=this;e.el.querySelectorAll(".a11y-nav-menu").forEach(function(e){var t=n.getMenuFromEl(e);t&&n.closeMenu(t)}),document.body.classList.remove("a11y-nav-menu-open"),e.control.el.setAttribute("aria-expanded","false"),this.options.animate?(e.el.classList.remove("a11y-nav-animate-in"),e.el.classList.add("a11y-nav-animate-out"),setTimeout(function(){var t;e.el.classList.remove("a11y-nav-active"),e.el.classList.remove("a11y-nav-animate-out"),null==(t=e.el.parentElement)||t.classList.remove("a11y-nav-child-open")},this.options.duration)):(e.el.classList.remove("a11y-nav-active"),null==(t=e.el.parentElement)||t.classList.remove("a11y-nav-child-open"))},n.closeAllMenus=function(){var e=this;this.menus.forEach(function(t){e.closeMenu(t)})},n.getMenuDepthFromEl=function(e){for(var t=0,n=e.parentElement;n&&n!==this.nav;)(n.classList.contains("a11y-nav-menu")||n===this.nav)&&t++,n=n.parentElement;return t},n.getMenuFromEl=function(e){var t;return null!=(t=this.menus.find(function(t){return t.el===e}))?t:null},n.getControlFromEl=function(e){var t;return null!=(t=this.controls.find(function(t){return t.el===e}))?t:null},n.getFocusableFromEl=function(e){var t;return null!=(t=this.focusables.find(function(t){return t===e}))?t:null},n.getControls=function(){return Array.from(this.nav.querySelectorAll("button[aria-expanded][aria-controls]")).map(function(e){var t=e.getAttribute("aria-controls"),n=document.getElementById(null!=t?t:"");if(n){var o={el:e,menu:{el:n,id:n.id,hadTabIndex:n.hasAttribute("tabindex")}};return o.menu.control=o,o}return null}).flatMap(function(e){return e?[e]:[]})},n.getFocusables=function(){return Array.from(this.nav.querySelectorAll("a, button"))},n.destroy=function(){var e=this;this.closeAllMenus(),this.controls.forEach(function(t){t.menu.el.classList.remove("a11y-nav-menu"),t.menu.hadTabIndex||t.menu.el.removeAttribute("tabindex"),t.el.removeEventListener("click",e.onButtonClick),t.el.removeEventListener("keydown",e.onButtonKeyDown)}),this.focusables.forEach(function(t){t.removeEventListener("keydown",e.onFocusableKeyDown)}),this.nav.removeEventListener("focusout",this.onBlur)},t}();
