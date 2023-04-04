!function(){"use strict";var e=class{constructor(e,t){this._inputSelector=e.inputSelector,this._submitButtonSelector=e.submitButtonSelector,this._inactiveButtonClass=e.inactiveButtonClass,this._inputErrorClass=e.inputErrorClass,this._errorClass=e.errorClass,this._form=t}_showInputError(e){const t=this._form.querySelector(`#${e.id}-error`);e.classList.add(this._inputErrorClass),t.textContent=e.validationMessage,t.classList.add(this._errorClass)}_hideInputError(e){const t=this._form.querySelector(`#${e.id}-error`);e.classList.remove(this._inputErrorClass),t.textContent="",t.classList.remove(this._errorClass)}_toggleButtonState(){this._hasInvalidInput()?this.disableButton():this._enableButton()}_hasInvalidInput(){return!this._inputList.every((e=>e.validity.valid))}_checkInputValidity(e){e.validity.valid?this._hideInputError(e):this._showInputError(e)}disableButton(){this._submitButton.classList.add(this._inactiveButtonClass),this._submitButton.disabled=!0}_enableButton(){this._submitButton.classList.remove(this._inactiveButtonClass),this._submitButton.disabled=!1}_setEventListeners(){this._inputList=[...this._form.querySelectorAll(this._inputSelector)],this._submitButton=this._form.querySelector(this._submitButtonSelector),this.disableButton(),this._inputList.forEach((e=>{e.addEventListener("input",(t=>{this._checkInputValidity(e),this._toggleButtonState()}))}))}enableValidation(){this._form.addEventListener("submit",(e=>{e.preventDefault()})),this._setEventListeners()}};class t{constructor(e){let{popupSelector:t}=e;var s,n,r;s=this,r=e=>{"Escape"===e.key&&this.close()},(n=function(e){var t=function(e,t){if("object"!=typeof e||null===e)return e;var s=e[Symbol.toPrimitive];if(void 0!==s){var n=s.call(e,"string");if("object"!=typeof n)return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"==typeof t?t:String(t)}(n="_handleEscClose"))in s?Object.defineProperty(s,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):s[n]=r,this._popupElement=document.querySelector(t)}open(){this._popupElement.classList.add("modal_opened"),document.addEventListener("keydown",this._handleEscClose)}close(){this._popupElement.classList.remove("modal_opened"),document.removeEventListener("keydown",this._handleEscClose)}setEventListeners(){this._popupElement.querySelector(".modal__button-reset").addEventListener("click",(()=>this.close())),this._popupElement.addEventListener("click",(e=>{e.target.matches(".modal")&&this.close()}))}}class s extends t{constructor(e,t){super({popupSelector:e}),this._popupForm=this._popupElement.querySelector(".modal__form"),this._submitCallback=t}_getInputValues(){const e=this._popupForm.querySelectorAll(".modal__input"),t={};return e.forEach((e=>{t[e.name]=e.value})),t}setEventListeners(){this._popupForm.addEventListener("submit",(()=>{this._submitCallback(this._getInputValues()),this.close()})),super.setEventListeners()}close(){this._popupForm.reset(),super.close()}}const n=document.querySelector(".profile__edit-button"),r=document.querySelector("#profile-popup"),o=r.querySelector(".modal__form"),i=(r.querySelector(".modal__button-reset"),document.querySelector("#name")),l=document.querySelector("#description"),a=(document.querySelector(".profile__title"),document.querySelector(".profile__description"),document.querySelector(".profile__add-button")),c=document.querySelector("#add-card-popup"),u=(c.querySelector(".modal__button-reset"),c.querySelector(".modal__form")),_=(document.querySelector("#title"),document.querySelector("#image"),document.querySelector("#picture-popup"),document.querySelector(".cards__list"),{inputSelector:".modal__input",submitButtonSelector:".modal__button",inactiveButtonClass:"modal__button_disabled",inputErrorClass:"modal__input_type_error",errorClass:"popup__error_visible"}),d=new e(_,o),m=new e(_,u);d.enableValidation(),m.enableValidation();const p=new class extends t{open(e){let{link:t,name:s}=e;const n=this._popupElement.querySelector(".modal__image-clicked"),r=this._popupElement.querySelector(".modal__image-text");n.src=t,r.alt=s,r.textContent=s,super.open()}}({popupSelector:"#picture-popup"});p.setEventListeners();const h=e=>new class{constructor(e,t,s){this._text=e.name,this._link=e.link,this._cardSelector=t,this._handleCardClick=s}_setEventListeners(){this._element.querySelector(".card__like-button").addEventListener("click",(()=>this._handleLikeButton())),this._element.querySelector(".card__trash-button").addEventListener("click",(()=>this._handleTrashButton())),this._element.querySelector(".card__image").addEventListener("click",(()=>this._handleCardClick({name:this._text,link:this._link})))}_handleLikeButton(){this._element.querySelector(".card__like-button").classList.toggle("card__like-button_active")}_handleTrashButton(){this._element.remove(),this._element=null}_getTemplate(){return document.querySelector(this._cardSelector).content.querySelector(".card").cloneNode(!0)}getView(){this._element=this._getTemplate(),this._setEventListeners();const e=this._element.querySelector(".card__image"),t=this._element.querySelector(".card__text");return e.src=this._link,e.alt=this._text,t.textContent=this._text,this._element}}(e,".template",(e=>{p.open(e)})).getView(),v=new class{constructor(e,t){let{items:s,renderer:n}=e;this._items=s,this._renderer=n,this._container=document.querySelector(t)}renderItems(){this._items.forEach((e=>{const t=this._renderer(e);this.addItem(t)}))}addItem(e){this._container.prepend(e)}}({items:[{name:"Yosemite Valley",link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg"},{name:"Lake Louise",link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg"},{name:"Bald Mountains",link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg"},{name:"Latemar",link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg"},{name:"Vanoise National Park",link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg"},{name:"Lago di Braies",link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg"}],renderer:h},".cards__list");v.renderItems();const S=new s("#profile-popup",(e=>{y.setUserInfo(e.name,e.description),d.disableButton()})),b=new s("#add-card-popup",(e=>{const t=h({name:e.title,link:e.image});v.addItem(t)})),y=new class{constructor(e){let{nameSelector:t,jobSelector:s}=e;this._nameElement=document.querySelector(t),this._jobElement=document.querySelector(s)}getUserInfo(){return{name:this._nameElement.textContent,description:this._jobElement.textContent}}setUserInfo(e,t){this._nameElement.textContent=e,this._jobElement.textContent=t}}({nameSelector:".profile__title",jobSelector:".profile__description"});b.setEventListeners(),S.setEventListeners(),a.addEventListener("click",(()=>{b.open(),m.disableButton()})),n.addEventListener("click",(()=>{S.open();const e=y.getUserInfo();i.value=e.name,l.value=e.description,m.disableButton()}))}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFvQitELElBQ3pELE1BQU1LLEVBQU90QyxFQUFXLENBQUVyQixLQUFNc0QsRUFBWU0sTUFBTzVDLEtBQU1zQyxFQUFZTyxRQUNyRXJCLEVBQWVVLFFBQVFTLEVBQUssSUFHeEJKLEVBQWMsSUl0RkwsTUFDYjFILFlBQVc2QyxHQUFnQyxJQUEvQixhQUFFb0YsRUFBWSxZQUFFQyxHQUFhckYsRUFDdkMxQyxLQUFLZ0ksYUFBZWhGLFNBQVNqQyxjQUFjK0csR0FDM0M5SCxLQUFLaUksWUFBY2pGLFNBQVNqQyxjQUFjZ0gsRUFDNUMsQ0FFQUcsY0FLRSxNQUppQixDQUNmbEUsS0FBTWhFLEtBQUtnSSxhQUFhN0csWUFDeEJzRyxZQUFhekgsS0FBS2lJLFlBQVk5RyxZQUdsQyxDQUVBcUcsWUFBWXhELEVBQU1tRSxHQUNoQm5JLEtBQUtnSSxhQUFhN0csWUFBYzZDLEVBQ2hDaEUsS0FBS2lJLFlBQVk5RyxZQUFjZ0gsQ0FDakMsR0pxRStCLENBQy9CTCxhQUFjLGtCQUNkQyxZQUFhLDBCQUdmTCxFQUFhdEUsb0JBQ2JpRSxFQUFnQmpFLG9CQUVoQm9CLEVBQWlCbkMsaUJBQWlCLFNBQVMsS0FDekNxRixFQUFhekUsT0FDYjZCLEVBQWlCckQsZUFBZSxJQUVsQzBDLEVBQWtCOUIsaUJBQWlCLFNBQVMsS0FDMUNnRixFQUFnQnBFLE9BQ2hCLE1BQU1tRixFQUFXYixFQUFZVyxjQUM3QjVELEVBQVVMLE1BQVFtRSxFQUFTcEUsS0FDM0JPLEVBQVNOLE1BQVFtRSxFQUFTWCxZQUMxQjNDLEVBQWlCckQsZUFBZSxHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcHJhY3RpY3VtLy4vc3JjL2NvbXBvbmVudHMvRm9ybVZhbGlkYXRvci5qcyIsIndlYnBhY2s6Ly9wcmFjdGljdW0vLi9zcmMvY29tcG9uZW50cy9Qb3B1cC5qcyIsIndlYnBhY2s6Ly9wcmFjdGljdW0vLi9zcmMvY29tcG9uZW50cy9Qb3B1cFdpdGhGb3JtLmpzIiwid2VicGFjazovL3ByYWN0aWN1bS8uL3NyYy91dGlscy9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vcHJhY3RpY3VtLy4vc3JjL3BhZ2VzL2luZGV4LmpzIiwid2VicGFjazovL3ByYWN0aWN1bS8uL3NyYy9jb21wb25lbnRzL1BvcHVwV2l0aEltYWdlLmpzIiwid2VicGFjazovL3ByYWN0aWN1bS8uL3NyYy9jb21wb25lbnRzL0NhcmQuanMiLCJ3ZWJwYWNrOi8vcHJhY3RpY3VtLy4vc3JjL2NvbXBvbmVudHMvU2VjdGlvbi5qcyIsIndlYnBhY2s6Ly9wcmFjdGljdW0vLi9zcmMvY29tcG9uZW50cy9Vc2VySW5mby5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBGb3JtVmFsaWRhdG9yIHtcclxuICBjb25zdHJ1Y3RvcihzZXR0aW5ncywgZm9ybUVsZW1lbnQpIHtcclxuICAgIHRoaXMuX2lucHV0U2VsZWN0b3IgPSBzZXR0aW5ncy5pbnB1dFNlbGVjdG9yO1xyXG4gICAgdGhpcy5fc3VibWl0QnV0dG9uU2VsZWN0b3IgPSBzZXR0aW5ncy5zdWJtaXRCdXR0b25TZWxlY3RvcjtcclxuICAgIHRoaXMuX2luYWN0aXZlQnV0dG9uQ2xhc3MgPSBzZXR0aW5ncy5pbmFjdGl2ZUJ1dHRvbkNsYXNzO1xyXG4gICAgdGhpcy5faW5wdXRFcnJvckNsYXNzID0gc2V0dGluZ3MuaW5wdXRFcnJvckNsYXNzO1xyXG4gICAgdGhpcy5fZXJyb3JDbGFzcyA9IHNldHRpbmdzLmVycm9yQ2xhc3M7XHJcblxyXG4gICAgdGhpcy5fZm9ybSA9IGZvcm1FbGVtZW50O1xyXG4gIH1cclxuXHJcbiAgX3Nob3dJbnB1dEVycm9yKGlucHV0RWwpIHtcclxuICAgIGNvbnN0IGVycm9yTWVzc2FnZUVsID0gdGhpcy5fZm9ybS5xdWVyeVNlbGVjdG9yKGAjJHtpbnB1dEVsLmlkfS1lcnJvcmApO1xyXG4gICAgaW5wdXRFbC5jbGFzc0xpc3QuYWRkKHRoaXMuX2lucHV0RXJyb3JDbGFzcyk7XHJcbiAgICBlcnJvck1lc3NhZ2VFbC50ZXh0Q29udGVudCA9IGlucHV0RWwudmFsaWRhdGlvbk1lc3NhZ2U7XHJcbiAgICBlcnJvck1lc3NhZ2VFbC5jbGFzc0xpc3QuYWRkKHRoaXMuX2Vycm9yQ2xhc3MpO1xyXG4gIH1cclxuXHJcbiAgX2hpZGVJbnB1dEVycm9yKGlucHV0RWwpIHtcclxuICAgIGNvbnN0IGVycm9yTWVzc2FnZUVsID0gdGhpcy5fZm9ybS5xdWVyeVNlbGVjdG9yKGAjJHtpbnB1dEVsLmlkfS1lcnJvcmApO1xyXG4gICAgaW5wdXRFbC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuX2lucHV0RXJyb3JDbGFzcyk7XHJcbiAgICBlcnJvck1lc3NhZ2VFbC50ZXh0Q29udGVudCA9IFwiXCI7XHJcbiAgICBlcnJvck1lc3NhZ2VFbC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuX2Vycm9yQ2xhc3MpO1xyXG4gIH1cclxuXHJcbiAgX3RvZ2dsZUJ1dHRvblN0YXRlKCkge1xyXG4gICAgaWYgKHRoaXMuX2hhc0ludmFsaWRJbnB1dCgpKSB7XHJcbiAgICAgIHRoaXMuZGlzYWJsZUJ1dHRvbigpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5fZW5hYmxlQnV0dG9uKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBfaGFzSW52YWxpZElucHV0KCkge1xyXG4gICAgcmV0dXJuICF0aGlzLl9pbnB1dExpc3QuZXZlcnkoKGlucHV0RWwpID0+IGlucHV0RWwudmFsaWRpdHkudmFsaWQpO1xyXG4gIH1cclxuXHJcbiAgX2NoZWNrSW5wdXRWYWxpZGl0eShpbnB1dEVsKSB7XHJcbiAgICBpZiAoIWlucHV0RWwudmFsaWRpdHkudmFsaWQpIHtcclxuICAgICAgdGhpcy5fc2hvd0lucHV0RXJyb3IoaW5wdXRFbCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLl9oaWRlSW5wdXRFcnJvcihpbnB1dEVsKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGRpc2FibGVCdXR0b24oKSB7XHJcbiAgICB0aGlzLl9zdWJtaXRCdXR0b24uY2xhc3NMaXN0LmFkZCh0aGlzLl9pbmFjdGl2ZUJ1dHRvbkNsYXNzKTtcclxuICAgIHRoaXMuX3N1Ym1pdEJ1dHRvbi5kaXNhYmxlZCA9IHRydWU7XHJcbiAgfVxyXG5cclxuICBfZW5hYmxlQnV0dG9uKCkge1xyXG4gICAgdGhpcy5fc3VibWl0QnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5faW5hY3RpdmVCdXR0b25DbGFzcyk7XHJcbiAgICB0aGlzLl9zdWJtaXRCdXR0b24uZGlzYWJsZWQgPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIF9zZXRFdmVudExpc3RlbmVycygpIHtcclxuICAgIHRoaXMuX2lucHV0TGlzdCA9IFsuLi50aGlzLl9mb3JtLnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5faW5wdXRTZWxlY3RvcildO1xyXG4gICAgdGhpcy5fc3VibWl0QnV0dG9uID0gdGhpcy5fZm9ybS5xdWVyeVNlbGVjdG9yKHRoaXMuX3N1Ym1pdEJ1dHRvblNlbGVjdG9yKTtcclxuICAgIHRoaXMuZGlzYWJsZUJ1dHRvbigpO1xyXG4gICAgdGhpcy5faW5wdXRMaXN0LmZvckVhY2goKGlucHV0RWwpID0+IHtcclxuICAgICAgaW5wdXRFbC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKGUpID0+IHtcclxuICAgICAgICB0aGlzLl9jaGVja0lucHV0VmFsaWRpdHkoaW5wdXRFbCk7XHJcbiAgICAgICAgdGhpcy5fdG9nZ2xlQnV0dG9uU3RhdGUoKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGVuYWJsZVZhbGlkYXRpb24oKSB7XHJcbiAgICB0aGlzLl9mb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKGUpID0+IHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLl9zZXRFdmVudExpc3RlbmVycygpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRm9ybVZhbGlkYXRvcjtcclxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9wdXAge1xyXG4gIGNvbnN0cnVjdG9yKHsgcG9wdXBTZWxlY3RvciB9KSB7XHJcbiAgICB0aGlzLl9wb3B1cEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHBvcHVwU2VsZWN0b3IpO1xyXG4gIH1cclxuXHJcbiAgb3BlbigpIHtcclxuICAgIHRoaXMuX3BvcHVwRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwibW9kYWxfb3BlbmVkXCIpO1xyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgdGhpcy5faGFuZGxlRXNjQ2xvc2UpO1xyXG4gIH1cclxuXHJcbiAgY2xvc2UoKSB7XHJcbiAgICB0aGlzLl9wb3B1cEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcIm1vZGFsX29wZW5lZFwiKTtcclxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIHRoaXMuX2hhbmRsZUVzY0Nsb3NlKTtcclxuICB9XHJcblxyXG4gIF9oYW5kbGVFc2NDbG9zZSA9IChldnQpID0+IHtcclxuICAgIGlmIChldnQua2V5ID09PSBcIkVzY2FwZVwiKSB7XHJcbiAgICAgIHRoaXMuY2xvc2UoKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBzZXRFdmVudExpc3RlbmVycygpIHtcclxuICAgIGNvbnN0IG1vZGFsQnV0dG9uUmVzZXQgPSB0aGlzLl9wb3B1cEVsZW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgXCIubW9kYWxfX2J1dHRvbi1yZXNldFwiXHJcbiAgICApO1xyXG4gICAgbW9kYWxCdXR0b25SZXNldC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gdGhpcy5jbG9zZSgpKTtcclxuXHJcbiAgICB0aGlzLl9wb3B1cEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldnQpID0+IHtcclxuICAgICAgaWYgKGV2dC50YXJnZXQubWF0Y2hlcyhcIi5tb2RhbFwiKSkge1xyXG4gICAgICAgIHRoaXMuY2xvc2UoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCBQb3B1cCBmcm9tIFwiLi9Qb3B1cC5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9wdXBXaXRoRm9ybSBleHRlbmRzIFBvcHVwIHtcclxuICBjb25zdHJ1Y3Rvcihwb3B1cFNlbGVjdG9yLCBzdWJtaXRDYWxsYmFjaykge1xyXG4gICAgc3VwZXIoeyBwb3B1cFNlbGVjdG9yIH0pO1xyXG4gICAgdGhpcy5fcG9wdXBGb3JtID0gdGhpcy5fcG9wdXBFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWxfX2Zvcm1cIik7XHJcbiAgICB0aGlzLl9zdWJtaXRDYWxsYmFjayA9IHN1Ym1pdENhbGxiYWNrO1xyXG4gIH1cclxuXHJcbiAgX2dldElucHV0VmFsdWVzKCkge1xyXG4gICAgY29uc3QgaW5wdXRzID0gdGhpcy5fcG9wdXBGb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoXCIubW9kYWxfX2lucHV0XCIpO1xyXG4gICAgY29uc3QgaW5wdXRPYmplY3QgPSB7fTtcclxuICAgIGlucHV0cy5mb3JFYWNoKChpbnB1dCkgPT4ge1xyXG4gICAgICBpbnB1dE9iamVjdFtpbnB1dC5uYW1lXSA9IGlucHV0LnZhbHVlO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gaW5wdXRPYmplY3Q7XHJcbiAgfVxyXG5cclxuICBzZXRFdmVudExpc3RlbmVycygpIHtcclxuICAgIHRoaXMuX3BvcHVwRm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsICgpID0+IHtcclxuICAgICAgdGhpcy5fc3VibWl0Q2FsbGJhY2sodGhpcy5fZ2V0SW5wdXRWYWx1ZXMoKSk7XHJcbiAgICAgIHRoaXMuY2xvc2UoKTtcclxuICAgIH0pO1xyXG4gICAgc3VwZXIuc2V0RXZlbnRMaXN0ZW5lcnMoKTtcclxuICB9XHJcblxyXG4gIGNsb3NlKCkge1xyXG4gICAgdGhpcy5fcG9wdXBGb3JtLnJlc2V0KCk7XHJcbiAgICBzdXBlci5jbG9zZSgpO1xyXG4gIH1cclxufVxyXG4iLCJleHBvcnQgY29uc3QgaW5pdGlhbENhcmRzID0gW1xyXG4gIHtcclxuICAgIG5hbWU6IFwiWW9zZW1pdGUgVmFsbGV5XCIsXHJcbiAgICBsaW5rOiBcImh0dHBzOi8vcHJhY3RpY3VtLWNvbnRlbnQuczMudXMtd2VzdC0xLmFtYXpvbmF3cy5jb20vc29mdHdhcmUtZW5naW5lZXIvYXJvdW5kLXByb2plY3QveW9zZW1pdGUuanBnXCIsXHJcbiAgfSxcclxuICB7XHJcbiAgICBuYW1lOiBcIkxha2UgTG91aXNlXCIsXHJcbiAgICBsaW5rOiBcImh0dHBzOi8vcHJhY3RpY3VtLWNvbnRlbnQuczMudXMtd2VzdC0xLmFtYXpvbmF3cy5jb20vc29mdHdhcmUtZW5naW5lZXIvYXJvdW5kLXByb2plY3QvbGFrZS1sb3Vpc2UuanBnXCIsXHJcbiAgfSxcclxuICB7XHJcbiAgICBuYW1lOiBcIkJhbGQgTW91bnRhaW5zXCIsXHJcbiAgICBsaW5rOiBcImh0dHBzOi8vcHJhY3RpY3VtLWNvbnRlbnQuczMudXMtd2VzdC0xLmFtYXpvbmF3cy5jb20vc29mdHdhcmUtZW5naW5lZXIvYXJvdW5kLXByb2plY3QvYmFsZC1tb3VudGFpbnMuanBnXCIsXHJcbiAgfSxcclxuICB7XHJcbiAgICBuYW1lOiBcIkxhdGVtYXJcIixcclxuICAgIGxpbms6IFwiaHR0cHM6Ly9wcmFjdGljdW0tY29udGVudC5zMy51cy13ZXN0LTEuYW1hem9uYXdzLmNvbS9zb2Z0d2FyZS1lbmdpbmVlci9hcm91bmQtcHJvamVjdC9sYXRlbWFyLmpwZ1wiLFxyXG4gIH0sXHJcbiAge1xyXG4gICAgbmFtZTogXCJWYW5vaXNlIE5hdGlvbmFsIFBhcmtcIixcclxuICAgIGxpbms6IFwiaHR0cHM6Ly9wcmFjdGljdW0tY29udGVudC5zMy51cy13ZXN0LTEuYW1hem9uYXdzLmNvbS9zb2Z0d2FyZS1lbmdpbmVlci9hcm91bmQtcHJvamVjdC92YW5vaXNlLmpwZ1wiLFxyXG4gIH0sXHJcbiAge1xyXG4gICAgbmFtZTogXCJMYWdvIGRpIEJyYWllc1wiLFxyXG4gICAgbGluazogXCJodHRwczovL3ByYWN0aWN1bS1jb250ZW50LnMzLnVzLXdlc3QtMS5hbWF6b25hd3MuY29tL3NvZnR3YXJlLWVuZ2luZWVyL2Fyb3VuZC1wcm9qZWN0L2xhZ28uanBnXCIsXHJcbiAgfSxcclxuXTtcclxuXHJcbmV4cG9ydCBjb25zdCBwcm9maWxlRWRpdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgXCIucHJvZmlsZV9fZWRpdC1idXR0b25cIlxyXG4pO1xyXG5leHBvcnQgY29uc3QgcHJvZmlsZVBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9maWxlLXBvcHVwXCIpO1xyXG5leHBvcnQgY29uc3QgcHJvZmlsZUZvcm1FbGVtZW50ID0gcHJvZmlsZVBvcHVwLnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWxfX2Zvcm1cIik7XHJcbmV4cG9ydCBjb25zdCBwcm9maWxlQnV0dG9uUmVzZXQgPSBwcm9maWxlUG9wdXAucXVlcnlTZWxlY3RvcihcclxuICBcIi5tb2RhbF9fYnV0dG9uLXJlc2V0XCJcclxuKTtcclxuZXhwb3J0IGNvbnN0IG5hbWVJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbmFtZVwiKTtcclxuZXhwb3J0IGNvbnN0IGpvYklucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkZXNjcmlwdGlvblwiKTtcclxuZXhwb3J0IGNvbnN0IHByb2ZpbGVOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9maWxlX190aXRsZVwiKTtcclxuZXhwb3J0IGNvbnN0IHByb2ZpbGVKb2IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2ZpbGVfX2Rlc2NyaXB0aW9uXCIpO1xyXG5leHBvcnQgY29uc3QgcHJvZmlsZUFkZEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZmlsZV9fYWRkLWJ1dHRvblwiKTtcclxuXHJcbmV4cG9ydCBjb25zdCBhZGRDYXJkUG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FkZC1jYXJkLXBvcHVwXCIpO1xyXG5leHBvcnQgY29uc3QgYWRkQ2FyZFBvcHVwUmVzZXRCdXR0b24gPSBhZGRDYXJkUG9wdXAucXVlcnlTZWxlY3RvcihcclxuICBcIi5tb2RhbF9fYnV0dG9uLXJlc2V0XCJcclxuKTtcclxuZXhwb3J0IGNvbnN0IGFkZENhcmRQb3B1cEZvcm0gPSBhZGRDYXJkUG9wdXAucXVlcnlTZWxlY3RvcihcIi5tb2RhbF9fZm9ybVwiKTtcclxuZXhwb3J0IGNvbnN0IHRpdGxlSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3RpdGxlXCIpO1xyXG5leHBvcnQgY29uc3QgaW1hZ2VJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjaW1hZ2VcIik7XHJcblxyXG5leHBvcnQgY29uc3QgcGljdHVyZVBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwaWN0dXJlLXBvcHVwXCIpO1xyXG5leHBvcnQgY29uc3QgY2FyZHNMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkc19fbGlzdFwiKTtcclxuZXhwb3J0IGNvbnN0IHZhbGlkYXRpb25TZXR0aW5ncyA9IHtcclxuICBpbnB1dFNlbGVjdG9yOiBcIi5tb2RhbF9faW5wdXRcIixcclxuICBzdWJtaXRCdXR0b25TZWxlY3RvcjogXCIubW9kYWxfX2J1dHRvblwiLFxyXG4gIGluYWN0aXZlQnV0dG9uQ2xhc3M6IFwibW9kYWxfX2J1dHRvbl9kaXNhYmxlZFwiLFxyXG4gIGlucHV0RXJyb3JDbGFzczogXCJtb2RhbF9faW5wdXRfdHlwZV9lcnJvclwiLFxyXG4gIGVycm9yQ2xhc3M6IFwicG9wdXBfX2Vycm9yX3Zpc2libGVcIixcclxufTtcclxuIiwiaW1wb3J0IEZvcm1WYWxpZGF0b3IgZnJvbSBcIi4uL2NvbXBvbmVudHMvRm9ybVZhbGlkYXRvci5qc1wiO1xyXG5pbXBvcnQgQ2FyZCBmcm9tIFwiLi4vY29tcG9uZW50cy9DYXJkLmpzXCI7XHJcbmltcG9ydCBQb3B1cFdpdGhGb3JtIGZyb20gXCIuLi9jb21wb25lbnRzL1BvcHVwV2l0aEZvcm0uanNcIjtcclxuaW1wb3J0IFVzZXJJbmZvIGZyb20gXCIuLi9jb21wb25lbnRzL1VzZXJJbmZvLmpzXCI7XHJcbmltcG9ydCBcIi4uL3BhZ2VzL2luZGV4LmNzc1wiO1xyXG5pbXBvcnQge1xyXG4gIGluaXRpYWxDYXJkcyxcclxuICBwcm9maWxlRWRpdEJ1dHRvbixcclxuICBwcm9maWxlUG9wdXAsXHJcbiAgcHJvZmlsZUZvcm1FbGVtZW50LFxyXG4gIHByb2ZpbGVCdXR0b25SZXNldCxcclxuICBwcm9maWxlTmFtZSxcclxuICBwcm9maWxlSm9iLFxyXG4gIHByb2ZpbGVBZGRCdXR0b24sXHJcbiAgYWRkQ2FyZFBvcHVwLFxyXG4gIGFkZENhcmRQb3B1cFJlc2V0QnV0dG9uLFxyXG4gIGFkZENhcmRQb3B1cEZvcm0sXHJcbiAgcGljdHVyZVBvcHVwLFxyXG4gIG5hbWVJbnB1dCxcclxuICBqb2JJbnB1dCxcclxuICBjYXJkc0xpc3QsXHJcbiAgdmFsaWRhdGlvblNldHRpbmdzLFxyXG59IGZyb20gXCIuLi91dGlscy9jb25zdGFudHMuanNcIjtcclxuaW1wb3J0IFBvcHVwV2l0aEltYWdlIGZyb20gXCIuLi9jb21wb25lbnRzL1BvcHVwV2l0aEltYWdlLmpzXCI7XHJcbmltcG9ydCBTZWN0aW9uIGZyb20gXCIuLi9jb21wb25lbnRzL1NlY3Rpb24uanNcIjtcclxuXHJcbmNvbnN0IGVkaXRGb3JtVmFsaWRhdG9yID0gbmV3IEZvcm1WYWxpZGF0b3IoXHJcbiAgdmFsaWRhdGlvblNldHRpbmdzLFxyXG4gIHByb2ZpbGVGb3JtRWxlbWVudFxyXG4pO1xyXG5jb25zdCBhZGRGb3JtVmFsaWRhdG9yID0gbmV3IEZvcm1WYWxpZGF0b3IoXHJcbiAgdmFsaWRhdGlvblNldHRpbmdzLFxyXG4gIGFkZENhcmRQb3B1cEZvcm1cclxuKTtcclxuXHJcbmVkaXRGb3JtVmFsaWRhdG9yLmVuYWJsZVZhbGlkYXRpb24oKTtcclxuYWRkRm9ybVZhbGlkYXRvci5lbmFibGVWYWxpZGF0aW9uKCk7XHJcblxyXG4vKmNvbnN0IGZvcm1WYWxpZGF0b3JzID0ge307XHJcblxyXG5jb25zdCBlbmFibGVWYWxpZGF0aW9uID0gKGNvbmZpZykgPT4ge1xyXG4gIGNvbnN0IGZvcm1MaXN0ID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGNvbmZpZy5mb3JtU2VsZWN0b3IpKTtcclxuICBmb3JtTGlzdC5mb3JFYWNoKChmb3JtRWxlbWVudCkgPT4ge1xyXG4gICAgY29uc3QgdmFsaWRhdG9yID0gbmV3IEZvcm1WYWxpZGF0b3IoZm9ybUVsZW1lbnQsIGNvbmZpZyk7XHJcbiAgICBjb25zdCBmb3JtTmFtZSA9IGZvcm1FbGVtZW50LmdldEF0dHJpYnV0ZSgnbmFtZScpO1xyXG4gICAgZm9ybVZhbGlkYXRvcnNbZm9ybU5hbWVdID0gdmFsaWRhdG9yO1xyXG4gICAgdmFsaWRhdG9yLmVuYWJsZVZhbGlkYXRpb24oKTtcclxuICB9KTtcclxufTtcclxuXHJcbmVuYWJsZVZhbGlkYXRpb24oY29uZmlnKTtcclxuXHJcblxyXG5mb3JtVmFsaWRhdG9yc1sgcHJvZmlsZUZvcm0uZ2V0QXR0cmlidXRlKCduYW1lJykgXS5yZXNldFZhbGlkYXRpb24oKTtcclxuZm9ybVZhbGlkYXRvcnNbJ3Byb2ZpbGUtZm9ybSddLnJlc2V0VmFsaWRhdGlvbigpOyovXHJcblxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuY29uc3QgbmV3UG9wdXBJbWFnZSA9IG5ldyBQb3B1cFdpdGhJbWFnZSh7IHBvcHVwU2VsZWN0b3I6IFwiI3BpY3R1cmUtcG9wdXBcIiB9KTtcclxubmV3UG9wdXBJbWFnZS5zZXRFdmVudExpc3RlbmVycygpO1xyXG5cclxuY29uc3QgY3JlYXRlQ2FyZCA9IChjYXJkRGF0YSkgPT4ge1xyXG4gIGNvbnN0IGNhcmQgPSBuZXcgQ2FyZChjYXJkRGF0YSwgXCIudGVtcGxhdGVcIiwgKGRhdGEpID0+IHtcclxuICAgIG5ld1BvcHVwSW1hZ2Uub3BlbihkYXRhKTtcclxuICB9KTtcclxuICByZXR1cm4gY2FyZC5nZXRWaWV3KCk7XHJcbn07XHJcblxyXG5jb25zdCBuZXdDYXJkU2VjdGlvbiA9IG5ldyBTZWN0aW9uKFxyXG4gIHsgaXRlbXM6IGluaXRpYWxDYXJkcywgcmVuZGVyZXI6IGNyZWF0ZUNhcmQgfSxcclxuICBcIi5jYXJkc19fbGlzdFwiXHJcbik7XHJcbm5ld0NhcmRTZWN0aW9uLnJlbmRlckl0ZW1zKCk7XHJcblxyXG5jb25zdCBuZXdQcm9maWxlUG9wdXAgPSBuZXcgUG9wdXBXaXRoRm9ybShcIiNwcm9maWxlLXBvcHVwXCIsIChpbnB1dFZhbHVlcykgPT4ge1xyXG4gIG5ld1VzZXJJbmZvLnNldFVzZXJJbmZvKGlucHV0VmFsdWVzLm5hbWUsIGlucHV0VmFsdWVzLmRlc2NyaXB0aW9uKTtcclxuICBlZGl0Rm9ybVZhbGlkYXRvci5kaXNhYmxlQnV0dG9uKCk7XHJcbn0pO1xyXG5cclxuY29uc3QgbmV3Q2FyZFBvcHVwID0gbmV3IFBvcHVwV2l0aEZvcm0oXCIjYWRkLWNhcmQtcG9wdXBcIiwgKGlucHV0VmFsdWVzKSA9PiB7XHJcbiAgY29uc3QgY2FyZCA9IGNyZWF0ZUNhcmQoeyBuYW1lOiBpbnB1dFZhbHVlcy50aXRsZSwgbGluazogaW5wdXRWYWx1ZXMuaW1hZ2UgfSk7XHJcbiAgbmV3Q2FyZFNlY3Rpb24uYWRkSXRlbShjYXJkKTtcclxufSk7XHJcblxyXG5jb25zdCBuZXdVc2VySW5mbyA9IG5ldyBVc2VySW5mbyh7XHJcbiAgbmFtZVNlbGVjdG9yOiBcIi5wcm9maWxlX190aXRsZVwiLFxyXG4gIGpvYlNlbGVjdG9yOiBcIi5wcm9maWxlX19kZXNjcmlwdGlvblwiLFxyXG59KTtcclxuXHJcbm5ld0NhcmRQb3B1cC5zZXRFdmVudExpc3RlbmVycygpO1xyXG5uZXdQcm9maWxlUG9wdXAuc2V0RXZlbnRMaXN0ZW5lcnMoKTtcclxuXHJcbnByb2ZpbGVBZGRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICBuZXdDYXJkUG9wdXAub3BlbigpO1xyXG4gIGFkZEZvcm1WYWxpZGF0b3IuZGlzYWJsZUJ1dHRvbigpO1xyXG59KTtcclxucHJvZmlsZUVkaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICBuZXdQcm9maWxlUG9wdXAub3BlbigpO1xyXG4gIGNvbnN0IHVzZXJEYXRhID0gbmV3VXNlckluZm8uZ2V0VXNlckluZm8oKTtcclxuICBuYW1lSW5wdXQudmFsdWUgPSB1c2VyRGF0YS5uYW1lO1xyXG4gIGpvYklucHV0LnZhbHVlID0gdXNlckRhdGEuZGVzY3JpcHRpb247XHJcbiAgYWRkRm9ybVZhbGlkYXRvci5kaXNhYmxlQnV0dG9uKCk7XHJcbn0pO1xyXG4iLCJpbXBvcnQgUG9wdXAgZnJvbSBcIi4vUG9wdXAuanNcIjtcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9wdXBXaXRoSW1hZ2UgZXh0ZW5kcyBQb3B1cCB7XHJcbiAgb3Blbih7IGxpbmssIG5hbWUgfSkge1xyXG4gICAgY29uc3QgaW1hZ2VPcGVuID0gdGhpcy5fcG9wdXBFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWxfX2ltYWdlLWNsaWNrZWRcIik7XHJcbiAgICBjb25zdCBpbWFnZVRleHQgPSB0aGlzLl9wb3B1cEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5tb2RhbF9faW1hZ2UtdGV4dFwiKTtcclxuICAgIGltYWdlT3Blbi5zcmMgPSBsaW5rO1xyXG4gICAgaW1hZ2VUZXh0LmFsdCA9IG5hbWU7XHJcbiAgICBpbWFnZVRleHQudGV4dENvbnRlbnQgPSBuYW1lO1xyXG4gICAgc3VwZXIub3BlbigpO1xyXG4gIH1cclxufVxyXG4iLCJjbGFzcyBDYXJkIHtcclxuICBjb25zdHJ1Y3RvcihkYXRhLCBjYXJkU2VsZWN0b3IsIGhhbmRsZUNhcmRDbGljaykge1xyXG4gICAgdGhpcy5fdGV4dCA9IGRhdGEubmFtZTtcclxuICAgIHRoaXMuX2xpbmsgPSBkYXRhLmxpbms7XHJcbiAgICB0aGlzLl9jYXJkU2VsZWN0b3IgPSBjYXJkU2VsZWN0b3I7XHJcbiAgICB0aGlzLl9oYW5kbGVDYXJkQ2xpY2sgPSBoYW5kbGVDYXJkQ2xpY2s7XHJcbiAgfVxyXG5cclxuICBfc2V0RXZlbnRMaXN0ZW5lcnMoKSB7XHJcbiAgICB0aGlzLl9lbGVtZW50XHJcbiAgICAgIC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRfX2xpa2UtYnV0dG9uXCIpXHJcbiAgICAgIC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gdGhpcy5faGFuZGxlTGlrZUJ1dHRvbigpKTtcclxuXHJcbiAgICB0aGlzLl9lbGVtZW50XHJcbiAgICAgIC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRfX3RyYXNoLWJ1dHRvblwiKVxyXG4gICAgICAuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHRoaXMuX2hhbmRsZVRyYXNoQnV0dG9uKCkpO1xyXG5cclxuICAgIHRoaXMuX2VsZW1lbnRcclxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9faW1hZ2VcIilcclxuICAgICAgLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PlxyXG4gICAgICAgIHRoaXMuX2hhbmRsZUNhcmRDbGljayh7IG5hbWU6IHRoaXMuX3RleHQsIGxpbms6IHRoaXMuX2xpbmsgfSlcclxuICAgICAgKTtcclxuICB9XHJcblxyXG4gIF9oYW5kbGVMaWtlQnV0dG9uKCkge1xyXG4gICAgdGhpcy5fZWxlbWVudFxyXG4gICAgICAucXVlcnlTZWxlY3RvcihcIi5jYXJkX19saWtlLWJ1dHRvblwiKVxyXG4gICAgICAuY2xhc3NMaXN0LnRvZ2dsZShcImNhcmRfX2xpa2UtYnV0dG9uX2FjdGl2ZVwiKTtcclxuICB9XHJcblxyXG4gIF9oYW5kbGVUcmFzaEJ1dHRvbigpIHtcclxuICAgIHRoaXMuX2VsZW1lbnQucmVtb3ZlKCk7XHJcbiAgICB0aGlzLl9lbGVtZW50ID0gbnVsbDtcclxuICB9XHJcblxyXG4gIF9nZXRUZW1wbGF0ZSgpIHtcclxuICAgIHJldHVybiBkb2N1bWVudFxyXG4gICAgICAucXVlcnlTZWxlY3Rvcih0aGlzLl9jYXJkU2VsZWN0b3IpXHJcbiAgICAgIC5jb250ZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZFwiKVxyXG4gICAgICAuY2xvbmVOb2RlKHRydWUpO1xyXG4gIH1cclxuXHJcbiAgZ2V0VmlldygpIHtcclxuICAgIHRoaXMuX2VsZW1lbnQgPSB0aGlzLl9nZXRUZW1wbGF0ZSgpO1xyXG4gICAgdGhpcy5fc2V0RXZlbnRMaXN0ZW5lcnMoKTtcclxuICAgIGNvbnN0IGNhcmRJbWFnZSA9IHRoaXMuX2VsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkX19pbWFnZVwiKTtcclxuICAgIGNvbnN0IGNhcmRUZXh0ID0gdGhpcy5fZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRfX3RleHRcIik7XHJcbiAgICBjYXJkSW1hZ2Uuc3JjID0gdGhpcy5fbGluaztcclxuICAgIGNhcmRJbWFnZS5hbHQgPSB0aGlzLl90ZXh0O1xyXG4gICAgY2FyZFRleHQudGV4dENvbnRlbnQgPSB0aGlzLl90ZXh0O1xyXG4gICAgcmV0dXJuIHRoaXMuX2VsZW1lbnQ7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDYXJkO1xyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBTZWN0aW9uIHtcclxuICBjb25zdHJ1Y3Rvcih7IGl0ZW1zLCByZW5kZXJlciB9LCBjb250YWluZXIpIHtcclxuICAgIHRoaXMuX2l0ZW1zID0gaXRlbXM7XHJcbiAgICB0aGlzLl9yZW5kZXJlciA9IHJlbmRlcmVyO1xyXG4gICAgdGhpcy5fY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihjb250YWluZXIpO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVySXRlbXMoKSB7XHJcbiAgICB0aGlzLl9pdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgIGNvbnN0IHRlc3QgPSB0aGlzLl9yZW5kZXJlcihpdGVtKTtcclxuICAgICAgdGhpcy5hZGRJdGVtKHRlc3QpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBhZGRJdGVtKGVsZW1lbnQpIHtcclxuICAgIHRoaXMuX2NvbnRhaW5lci5wcmVwZW5kKGVsZW1lbnQpO1xyXG4gIH1cclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBVc2VySW5mbyB7XHJcbiAgY29uc3RydWN0b3IoeyBuYW1lU2VsZWN0b3IsIGpvYlNlbGVjdG9yIH0pIHtcclxuICAgIHRoaXMuX25hbWVFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihuYW1lU2VsZWN0b3IpO1xyXG4gICAgdGhpcy5fam9iRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioam9iU2VsZWN0b3IpO1xyXG4gIH1cclxuXHJcbiAgZ2V0VXNlckluZm8oKSB7XHJcbiAgICBjb25zdCB1c2VyRGF0YSA9IHtcclxuICAgICAgbmFtZTogdGhpcy5fbmFtZUVsZW1lbnQudGV4dENvbnRlbnQsXHJcbiAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLl9qb2JFbGVtZW50LnRleHRDb250ZW50LFxyXG4gICAgfTtcclxuICAgIHJldHVybiB1c2VyRGF0YTtcclxuICB9XHJcblxyXG4gIHNldFVzZXJJbmZvKG5hbWUsIGpvYikge1xyXG4gICAgdGhpcy5fbmFtZUVsZW1lbnQudGV4dENvbnRlbnQgPSBuYW1lO1xyXG4gICAgdGhpcy5fam9iRWxlbWVudC50ZXh0Q29udGVudCA9IGpvYjtcclxuICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbImNvbnN0cnVjdG9yIiwic2V0dGluZ3MiLCJmb3JtRWxlbWVudCIsInRoaXMiLCJfaW5wdXRTZWxlY3RvciIsImlucHV0U2VsZWN0b3IiLCJfc3VibWl0QnV0dG9uU2VsZWN0b3IiLCJzdWJtaXRCdXR0b25TZWxlY3RvciIsIl9pbmFjdGl2ZUJ1dHRvbkNsYXNzIiwiaW5hY3RpdmVCdXR0b25DbGFzcyIsIl9pbnB1dEVycm9yQ2xhc3MiLCJpbnB1dEVycm9yQ2xhc3MiLCJfZXJyb3JDbGFzcyIsImVycm9yQ2xhc3MiLCJfZm9ybSIsIl9zaG93SW5wdXRFcnJvciIsImlucHV0RWwiLCJlcnJvck1lc3NhZ2VFbCIsInF1ZXJ5U2VsZWN0b3IiLCJpZCIsImNsYXNzTGlzdCIsImFkZCIsInRleHRDb250ZW50IiwidmFsaWRhdGlvbk1lc3NhZ2UiLCJfaGlkZUlucHV0RXJyb3IiLCJyZW1vdmUiLCJfdG9nZ2xlQnV0dG9uU3RhdGUiLCJfaGFzSW52YWxpZElucHV0IiwiZGlzYWJsZUJ1dHRvbiIsIl9lbmFibGVCdXR0b24iLCJfaW5wdXRMaXN0IiwiZXZlcnkiLCJ2YWxpZGl0eSIsInZhbGlkIiwiX2NoZWNrSW5wdXRWYWxpZGl0eSIsIl9zdWJtaXRCdXR0b24iLCJkaXNhYmxlZCIsIl9zZXRFdmVudExpc3RlbmVycyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JFYWNoIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJlbmFibGVWYWxpZGF0aW9uIiwicHJldmVudERlZmF1bHQiLCJQb3B1cCIsIl9yZWYiLCJwb3B1cFNlbGVjdG9yIiwiZXZ0Iiwia2V5IiwiY2xvc2UiLCJfcG9wdXBFbGVtZW50IiwiZG9jdW1lbnQiLCJvcGVuIiwiX2hhbmRsZUVzY0Nsb3NlIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInNldEV2ZW50TGlzdGVuZXJzIiwidGFyZ2V0IiwibWF0Y2hlcyIsIlBvcHVwV2l0aEZvcm0iLCJzdWJtaXRDYWxsYmFjayIsInN1cGVyIiwiX3BvcHVwRm9ybSIsIl9zdWJtaXRDYWxsYmFjayIsIl9nZXRJbnB1dFZhbHVlcyIsImlucHV0cyIsImlucHV0T2JqZWN0IiwiaW5wdXQiLCJuYW1lIiwidmFsdWUiLCJyZXNldCIsInByb2ZpbGVFZGl0QnV0dG9uIiwicHJvZmlsZVBvcHVwIiwicHJvZmlsZUZvcm1FbGVtZW50IiwibmFtZUlucHV0Iiwiam9iSW5wdXQiLCJwcm9maWxlQWRkQnV0dG9uIiwiYWRkQ2FyZFBvcHVwIiwiYWRkQ2FyZFBvcHVwRm9ybSIsInZhbGlkYXRpb25TZXR0aW5ncyIsImVkaXRGb3JtVmFsaWRhdG9yIiwiRm9ybVZhbGlkYXRvciIsImFkZEZvcm1WYWxpZGF0b3IiLCJuZXdQb3B1cEltYWdlIiwibGluayIsImltYWdlT3BlbiIsImltYWdlVGV4dCIsInNyYyIsImFsdCIsImNyZWF0ZUNhcmQiLCJjYXJkRGF0YSIsImRhdGEiLCJjYXJkU2VsZWN0b3IiLCJoYW5kbGVDYXJkQ2xpY2siLCJfdGV4dCIsIl9saW5rIiwiX2NhcmRTZWxlY3RvciIsIl9oYW5kbGVDYXJkQ2xpY2siLCJfZWxlbWVudCIsIl9oYW5kbGVMaWtlQnV0dG9uIiwiX2hhbmRsZVRyYXNoQnV0dG9uIiwidG9nZ2xlIiwiX2dldFRlbXBsYXRlIiwiY29udGVudCIsImNsb25lTm9kZSIsImdldFZpZXciLCJjYXJkSW1hZ2UiLCJjYXJkVGV4dCIsIm5ld0NhcmRTZWN0aW9uIiwiY29udGFpbmVyIiwiaXRlbXMiLCJyZW5kZXJlciIsIl9pdGVtcyIsIl9yZW5kZXJlciIsIl9jb250YWluZXIiLCJyZW5kZXJJdGVtcyIsIml0ZW0iLCJ0ZXN0IiwiYWRkSXRlbSIsImVsZW1lbnQiLCJwcmVwZW5kIiwibmV3UHJvZmlsZVBvcHVwIiwiaW5wdXRWYWx1ZXMiLCJuZXdVc2VySW5mbyIsInNldFVzZXJJbmZvIiwiZGVzY3JpcHRpb24iLCJuZXdDYXJkUG9wdXAiLCJjYXJkIiwidGl0bGUiLCJpbWFnZSIsIm5hbWVTZWxlY3RvciIsImpvYlNlbGVjdG9yIiwiX25hbWVFbGVtZW50IiwiX2pvYkVsZW1lbnQiLCJnZXRVc2VySW5mbyIsImpvYiIsInVzZXJEYXRhIl0sInNvdXJjZVJvb3QiOiIifQ==