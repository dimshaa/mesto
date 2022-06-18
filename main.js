(()=>{"use strict";function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var e=function(){function e(t){var n,r;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),r=function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))},(n="_handleResponse")in this?Object.defineProperty(this,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):this[n]=r,this._baseUrl=t.baseUrl,this._cohortId=t.cohortId,this._token=t.token}var n,r;return n=e,(r=[{key:"getUserInfo",value:function(){var t=this;return fetch("".concat(this._baseUrl,"/").concat(this._cohortId,"/users/me"),{headers:{authorization:this._token}}).then((function(e){return t._handleResponse(e)}))}},{key:"setUserInfo",value:function(t){var e=this;return fetch("".concat(this._baseUrl,"/").concat(this._cohortId,"/users/me"),{method:"PATCH",headers:{authorization:this._token,"Content-Type":"application/json"},body:JSON.stringify({name:t.name,about:t.about})}).then((function(t){return e._handleResponse(t)}))}},{key:"getInitialCards",value:function(){var t=this;return fetch("".concat(this._baseUrl,"/").concat(this._cohortId,"/cards"),{headers:{authorization:this._token}}).then((function(e){return t._handleResponse(e)}))}},{key:"uploadCard",value:function(t){var e=this;return fetch("".concat(this._baseUrl,"/").concat(this._cohortId,"/cards"),{method:"POST",headers:{authorization:this._token,"Content-Type":"application/json"},body:JSON.stringify({name:t.name,link:t.link})}).then((function(t){return e._handleResponse(t)}))}},{key:"deleteCard",value:function(t){var e=this;return fetch("".concat(this._baseUrl,"/").concat(this._cohortId,"/cards/").concat(t),{method:"DELETE",headers:{authorization:this._token,"Content-Type":"application/json"}}).then((function(t){return e._handleResponse(t)}))}},{key:"likeCard",value:function(t,e){var n,r=this;return n=e?"DELETE":"PUT",fetch("".concat(this._baseUrl,"/").concat(this._cohortId,"/cards/").concat(t,"/likes"),{method:n,headers:{authorization:this._token,"Content-Type":"application/json"}}).then((function(t){return r._handleResponse(t)}))}},{key:"changeAvatar",value:function(t){var e=this;return fetch("".concat(this._baseUrl,"/").concat(this._cohortId,"/users/me/avatar"),{method:"PATCH",headers:{authorization:this._token,"Content-Type":"application/json"},body:JSON.stringify({avatar:t.avatar})}).then((function(t){return e._handleResponse(t)}))}}])&&t(n.prototype,r),Object.defineProperty(n,"prototype",{writable:!1}),e}();function n(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var r=function(){function t(e,n,r,o,i,a){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._name=e.name,this._link=e.link,this._ownerId=e.owner._id,this._cardId=e._id,this._likes=e.likes,this._userId=a,this._cardTemplate=n,this._handleCardClick=r,this._handleCardDelete=o,this._handleCardLike=i}var e,r;return e=t,(r=[{key:"_getTemplate",value:function(){return document.querySelector(this._cardTemplate).content.querySelector(".card").cloneNode(!0)}},{key:"_isOwner",value:function(){return this._userId===this._ownerId}},{key:"hasLike",value:function(){var t=this;return this._likes.find((function(e){return e._id===t._userId}))}},{key:"getCardId",value:function(){return this._cardId}},{key:"renderCard",value:function(){return this._card=this._getTemplate(),this._cardCaption=this._card.querySelector(".card__caption"),this._cardImage=this._card.querySelector(".card__image"),this._cardLikeBtn=this._card.querySelector(".card__like-btn"),this._cardLikeCounter=this._card.querySelector(".card__like-counter"),this._cardDeleteBtn=this._card.querySelector(".card__delete-btn"),this._cardLikeCounter.textContent=this._likes.length,this._cardCaption.textContent=this._name,this._cardImage.src=this._link,this._cardImage.alt=this._name,this._isOwner()||this._cardDeleteBtn.classList.add("card__delete-btn_hidden"),this.showLikes(this._likes),this._setEventListeners(),this._card}},{key:"showLikes",value:function(t){this._likes=t,this._cardLikeCounter.textContent=this._likes.length,this.hasLike()?this._cardLikeBtn.classList.add("card__like-btn_active"):this._cardLikeBtn.classList.remove("card__like-btn_active")}},{key:"deleteCard",value:function(){this._card.remove()}},{key:"_setEventListeners",value:function(){var t=this;this._cardImage.addEventListener("click",(function(){t._handleCardClick()})),this._cardLikeBtn.addEventListener("click",(function(){t._handleCardLike()})),this._cardDeleteBtn.addEventListener("click",(function(){t._isOwner()&&t._handleCardDelete()}))}}])&&n(e.prototype,r),Object.defineProperty(e,"prototype",{writable:!1}),t}();function o(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var i=function(){function t(e,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._formSelector=e.formSelector,this._inputSelector=e.inputSelector,this._submitButtonClass=e.submitButtonSelector,this._inactiveButtonClass=e.inactiveButtonClass,this._inputErrorClass=e.inputErrorClass,this._form=n,this._submitButton=this._form.querySelector(this._submitButtonClass),this._inputList=this._form.querySelectorAll(this._inputSelector)}var e,n;return e=t,(n=[{key:"_toggleSubmitButton",value:function(){this._submitButton.disabled=!this._form.checkValidity(),this._submitButton.classList.toggle(this._inactiveButtonClass,!this._form.checkValidity())}},{key:"_showInputError",value:function(t){this._form.querySelector("#".concat(t.id,"-error")).textContent=t.validationMessage,t.classList.add(this._inputErrorClass)}},{key:"_hideInputError",value:function(t){this._form.querySelector("#".concat(t.id,"-error")).textContent="",t.classList.remove(this._inputErrorClass)}},{key:"_validateInput",value:function(t){t.validity.valid?this._hideInputError(t):this._showInputError(t),this._toggleSubmitButton()}},{key:"_setEventListeners",value:function(){var t=this;this._form.addEventListener("input",(function(e){t._validateInput(e.target)}))}},{key:"enableValidation",value:function(){this._setEventListeners(),this._toggleSubmitButton()}},{key:"resetValidation",value:function(){var t=this;this._toggleSubmitButton(),this._inputList.forEach((function(e){t._hideInputError(e)}))}}])&&o(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function a(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var u=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._popup=document.querySelector(e),this._handleEscClose=this._handleEscClose.bind(this)}var e,n;return e=t,(n=[{key:"open",value:function(){this._popup.classList.add("popup_opened"),window.addEventListener("keydown",this._handleEscClose)}},{key:"close",value:function(){this._popup.classList.remove("popup_opened"),window.removeEventListener("keydown",this._handleEscClose)}},{key:"setEventListeners",value:function(){var t=this;this._popup.addEventListener("click",(function(e){(e.target.classList.contains("popup__close-btn")||e.target===e.currentTarget)&&t.close()}))}},{key:"_handleEscClose",value:function(t){"Escape"===t.key&&this.close()}}])&&a(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function c(t){return c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},c(t)}function s(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function l(){return l="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,n){var r=f(t,e);if(r){var o=Object.getOwnPropertyDescriptor(r,e);return o.get?o.get.call(arguments.length<3?t:n):o.value}},l.apply(this,arguments)}function f(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=d(t)););return t}function p(t,e){return p=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},p(t,e)}function h(t,e){if(e&&("object"===c(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}function d(t){return d=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},d(t)}var _=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&p(t,e)}(a,t);var e,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=d(r);if(o){var n=d(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return h(this,t)});function a(t){var e,n=t.formSubmitter,r=t.popupSelector;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,a),(e=i.call(this,r))._form=e._popup.querySelector(".popup__form"),e._inputList=e._form.querySelectorAll(".popup__input"),e._submitButton=e._form.querySelector(".popup__submit-btn"),e._formSubmitter=n,e}return e=a,(n=[{key:"_getInputValues",value:function(){var t=this;return this._inputData={},this._inputList.forEach((function(e){t._inputData[e.name]=e.value})),this._inputData}},{key:"setEventListeners",value:function(){var t=this;l(d(a.prototype),"setEventListeners",this).call(this),this._form.addEventListener("submit",(function(e){e.preventDefault(),t._formSubmitter(t._getInputValues()),t._form.reset()}))}},{key:"close",value:function(){l(d(a.prototype),"close",this).call(this),this._form.reset()}},{key:"renderButtonText",value:function(t){this._submitButton.textContent=t}}])&&s(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),a}(u);function y(t){return y="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},y(t)}function b(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function v(){return v="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,n){var r=m(t,e);if(r){var o=Object.getOwnPropertyDescriptor(r,e);return o.get?o.get.call(arguments.length<3?t:n):o.value}},v.apply(this,arguments)}function m(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=w(t)););return t}function k(t,e){return k=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},k(t,e)}function g(t,e){if(e&&("object"===y(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}function w(t){return w=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},w(t)}var S=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&k(t,e)}(a,t);var e,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=w(r);if(o){var n=w(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return g(this,t)});function a(t){var e;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,a),(e=i.call(this,t))._image=e._popup.querySelector(".popup__card-image"),e._caption=e._popup.querySelector(".popup__card-caption"),e}return e=a,(n=[{key:"open",value:function(t){var e=t.name,n=t.link;this._image.src=n,this._image.alt=e,this._caption.textContent=e,v(w(a.prototype),"open",this).call(this)}}])&&b(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),a}(u);function O(t){return O="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},O(t)}function C(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function E(){return E="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,n){var r=j(t,e);if(r){var o=Object.getOwnPropertyDescriptor(r,e);return o.get?o.get.call(arguments.length<3?t:n):o.value}},E.apply(this,arguments)}function j(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=P(t)););return t}function L(t,e){return L=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},L(t,e)}function I(t,e){if(e&&("object"===O(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}function P(t){return P=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},P(t)}var B=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&L(t,e)}(a,t);var e,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=P(r);if(o){var n=P(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return I(this,t)});function a(t){var e,n=t.deleteFunction,r=t.popupSelector;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,a),(e=i.call(this,r))._form=e._popup.querySelector(".popup__form"),e._submitButton=e._form.querySelector(".popup__submit-btn"),e._deleteFunction=n,e}return e=a,(n=[{key:"open",value:function(t){E(P(a.prototype),"open",this).call(this),this._card=t}},{key:"setEventListeners",value:function(){var t=this;E(P(a.prototype),"setEventListeners",this).call(this),this._form.addEventListener("submit",(function(e){e.preventDefault(),t._deleteFunction(t._card)}))}},{key:"renderButtonText",value:function(t){this._submitButton.textContent=t}}])&&C(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),a}(u);function T(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var R=function(){function t(e,n){var r=e.renderer;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._renderer=r,this._container=document.querySelector(n)}var e,n;return e=t,(n=[{key:"addItem",value:function(t){this._container.prepend(t)}},{key:"renderItems",value:function(t){var e=this;t.forEach((function(t){e._renderer(t)}))}}])&&T(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function q(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var x=function(){function t(e){var n=e.usernameSelector,r=e.userbioSelector,o=e.avatarSelector;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._username=document.querySelector(n),this._userbio=document.querySelector(r),this._avatar=document.querySelector(o)}var e,n;return e=t,(n=[{key:"getUserInfo",value:function(){return this._user={},this._user.username=this._username.textContent,this._user.userbio=this._userbio.textContent,this._user.avatar=this._avatar.src,this._user}},{key:"setUserInfo",value:function(t){var e=t.name,n=t.about,r=t.avatar,o=t._id;this._username.textContent=e,this._userbio.textContent=n,this._avatar.src=r,this._id=o}},{key:"getUserId",value:function(){return this._id}}])&&q(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}(),U=document.querySelector(".profile"),D=U.querySelector(".profile__edit-btn"),V=U.querySelector(".profile__add-btn"),z=U.querySelector(".profile__avatar-wrapper"),N=document.querySelector(".popup_type_profile-edit").querySelector(".popup__form"),A=document.querySelector(".popup_type_card-add").querySelector(".popup__form"),F=document.querySelector(".popup_type_avatar-edit").querySelector(".popup__form"),J={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__submit-btn",inactiveButtonClass:"popup__submit-btn_disabled",inputErrorClass:"popup__input_type_error"};function H(t){var e=new r(t,"#card-template",(function(){Y.open({name:t.name,link:t.link})}),(function(){$.open(e)}),(function(){M.likeCard(e.getCardId(),e.hasLike()).then((function(t){return e.showLikes(t.likes)})).catch((function(t){return console.log(t)}))}),K.getUserId());return e.renderCard()}var M=new e({baseUrl:"https://mesto.nomoreparties.co/v1",cohortId:"cohort-43",token:"c4f0f8b8-a52c-4e71-bc8a-938ca58bb704"}),G=new R({renderer:function(t){var e=H(t);G.addItem(e)}},".cards__list"),K=new x({usernameSelector:".profile__username",userbioSelector:".profile__userbio",avatarSelector:".profile__avatar"});M.getInitialCards().then((function(t){G.renderItems(t.reverse())})).catch((function(t){return console.log(t)})),M.getUserInfo().then((function(t){K.setUserInfo(t)})).catch((function(t){return console.log(t)}));var Q=new i(J,N),W=new i(J,A),X=new i(J,F),Y=new S(".popup_type_card-view"),Z=new _({formSubmitter:function(t){Z.renderButtonText("Сохранение..."),M.uploadCard({name:t.cardName,link:t.cardUrl}).then((function(t){var e=H(t);G.addItem(e)})).then((function(){return Z.close()})).catch((function(t){return console.log(t)})).finally((function(){return Z.renderButtonText("Сохранить")}))},popupSelector:".popup_type_card-add"}),$=new B({deleteFunction:function(t){$.renderButtonText("Удаление..."),M.deleteCard(t.getCardId()).then((function(){return t.deleteCard()})).then((function(){return $.close()})).catch((function(t){return console.log(t)})).finally((function(){return $.renderButtonText("Да")}))},popupSelector:".popup_type_confirm"}),tt=new _({formSubmitter:function(t){tt.renderButtonText("Сохранение..."),M.setUserInfo({name:t.userName,about:t.userBio}).then((function(t){return K.setUserInfo(t)})).then((function(){return tt.close()})).catch((function(t){return console.log(t)})).finally((function(){return tt.renderButtonText("Сохранить")}))},popupSelector:".popup_type_profile-edit"}),et=new _({formSubmitter:function(t){et.renderButtonText("Сохранение..."),M.changeAvatar({avatar:t.avatarUrl}).then((function(t){return K.setUserInfo(t)})).then((function(){return et.close()})).catch((function(t){return console.log(t)})).finally((function(){return et.renderButtonText("Сохранить")}))},popupSelector:".popup_type_avatar-edit"});D.addEventListener("click",(function(){var t=K.getUserInfo();N.userName.value=t.username,N.userBio.value=t.userbio,Q.resetValidation(),tt.open()})),z.addEventListener("click",(function(){X.resetValidation(),et.open()})),V.addEventListener("click",(function(){W.resetValidation(),Z.open()})),Q.enableValidation(),W.enableValidation(),X.enableValidation(),Y.setEventListeners(),Z.setEventListeners(),tt.setEventListeners(),$.setEventListeners(),et.setEventListeners()})();
//# sourceMappingURL=main.js.map