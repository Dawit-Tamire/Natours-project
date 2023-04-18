require("@babel/polyfill");
var $jqtH7$axios = require("axios");

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}


const $3adf927435cf4518$export$516836c6a9dfc573 = ()=>{
    const el = document.querySelector(".alert");
    if (el) el.parentElement.removeChild(el);
};
const $3adf927435cf4518$export$de026b00723010c1 = (type, msg, time = 5)=>{
    $3adf927435cf4518$export$516836c6a9dfc573();
    const markup = `<div class="alert alert--${type}">${msg}</div>`;
    document.querySelector("body").insertAdjacentHTML("afterbegin", markup) // thêm HTML
    ;
    window.setTimeout($3adf927435cf4518$export$516836c6a9dfc573, time * 1000);
};


const $0e0246aa17379d59$export$596d806903d1f59e = async (data)=>{
    try {
        const res = await (0, ($parcel$interopDefault($jqtH7$axios)))({
            method: "POST",
            url: "/api/v1/users/login",
            data: data
        });
        if (res.data.status === "success") location.assign("/");
    } catch (err) {
        (0, $3adf927435cf4518$export$de026b00723010c1)("error", err.response.data.message);
    }
};
const $0e0246aa17379d59$export$7200a869094fec36 = async (data)=>{
    try {
        const res = await (0, ($parcel$interopDefault($jqtH7$axios)))({
            method: "POST",
            url: "/api/v1/users/signup",
            data: data
        });
        if (res.data.status === "success") {
            (0, $3adf927435cf4518$export$de026b00723010c1)("success", "Create new account successfully");
            window.setTimeout(()=>{
                location.assign("/");
            }, 1000);
        }
    } catch (err) {
        (0, $3adf927435cf4518$export$de026b00723010c1)("error", err.response.data.message);
    }
};
const $0e0246aa17379d59$export$a0973bcfe11b05c9 = async ()=>{
    try {
        const res = await (0, ($parcel$interopDefault($jqtH7$axios)))({
            method: "GET",
            url: "/api/v1/users/logout"
        });
        if (res.data.status === "success") location.assign("/");
    } catch (err) {
        (0, $3adf927435cf4518$export$de026b00723010c1)("error", err.response.data.message);
        window.setTimeout(()=>{
            location.assign("/login") // chuyển pages sau 2s
            ;
        }, 2000);
    }
};
const $0e0246aa17379d59$export$66791fb2cfeec3e = async (email)=>{
    try {
        const res = await (0, ($parcel$interopDefault($jqtH7$axios)))({
            method: "POST",
            url: "/api/v1/users/forgotPassword",
            data: {
                email: email
            }
        });
        if (res.data.status === "success") (0, $3adf927435cf4518$export$de026b00723010c1)("success", "Token sent to email. Check your email");
    } catch (err) {
        (0, $3adf927435cf4518$export$de026b00723010c1)("error", err.response.data.message);
    }
};
const $0e0246aa17379d59$export$dc726c8e334dd814 = async (data, resetToken)=>{
    try {
        const res = await (0, ($parcel$interopDefault($jqtH7$axios)))({
            method: "PATCH",
            url: `/api/v1/users/resetPassword/${resetToken}`,
            data: data
        });
        if (res.data.status === "success") {
            (0, $3adf927435cf4518$export$de026b00723010c1)("success", "Your password has changed");
            window.setTimeout(()=>{
                location.assign("/");
            }, 2000);
        }
    } catch (err) {
        (0, $3adf927435cf4518$export$de026b00723010c1)("error", err.response.data.message);
    }
};




const $d35900eb0f47ee8b$export$3bf0495508a61ee = async (data, type)=>{
    try {
        const url = type === "password" ? "/api/v1/users/updateMyPassword" : "/api/v1/users/updateMe";
        const res = await (0, ($parcel$interopDefault($jqtH7$axios)))({
            method: "PATCH",
            url: url,
            data: data
        });
        if (res.data.status === "success") (0, $3adf927435cf4518$export$de026b00723010c1)("success", `${type.toUpperCase()} update successfully`);
    } catch (err) {
        (0, $3adf927435cf4518$export$de026b00723010c1)("error", err.response.data.message);
    }
};
const $d35900eb0f47ee8b$export$aeb2b40572cfe38a = (input, imgSrc)=>{
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e)=>{
            document.querySelector(imgSrc).src = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
    }
};


/* eslint-disable */ 

const $6710bca62beba915$var$stripe = Stripe("pk_test_51Mx9ijLurg5wn2FXTzsIJsm0tXMPaBMsGKuZyGAxvrfb5CdkXIG5SWZY9iUV070tXOq8oGL7wlynCisKTdVGNFNU00jt8vUUfC");
const $6710bca62beba915$export$8d5bdbf26681c0c2 = async (tourId)=>{
    try {
        console.log("session will be received");
        // 1) Get checkout session from API
        const session = await (0, ($parcel$interopDefault($jqtH7$axios)))(`/api/v1/bookings/checkout-session/${tourId}`);
        console.log("session received");
        // 2) Create checkout form + chanre credit card
        await $6710bca62beba915$var$stripe.redirectToCheckout({
            sessionId: session.data.session.id
        });
    // await res.redirect(303, session.url);
    } catch (err) {
        console.log(err);
        (0, $3adf927435cf4518$export$de026b00723010c1)("error", err);
    }
};


// DOM ELEMENTS
const $d0f7ce18c37ad6f6$var$loginForm = document.querySelector(".form--login");
const $d0f7ce18c37ad6f6$var$signupForm = document.querySelector(".form--signup");
const $d0f7ce18c37ad6f6$var$logOutBtn = document.querySelector(".nav__el--logout");
const $d0f7ce18c37ad6f6$var$updateDataForm = document.querySelector(".form-user-data");
const $d0f7ce18c37ad6f6$var$updateAvaUser = document.querySelector(".form__upload");
const $d0f7ce18c37ad6f6$var$updatePasswordForm = document.querySelector(".form-user-password");
const $d0f7ce18c37ad6f6$var$forgotPasswordForm = document.querySelector(".form-forgot-password");
const $d0f7ce18c37ad6f6$var$resetPasswordForm = document.querySelector(".form-reset-password");
const $d0f7ce18c37ad6f6$var$bookBtn = document.getElementById("book-tour");
// DELEGATION
if ($d0f7ce18c37ad6f6$var$loginForm) $d0f7ce18c37ad6f6$var$loginForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    (0, $0e0246aa17379d59$export$596d806903d1f59e)({
        email: email,
        password: password
    });
});
if ($d0f7ce18c37ad6f6$var$signupForm) $d0f7ce18c37ad6f6$var$signupForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("passwordConfirm").value;
    (0, $0e0246aa17379d59$export$7200a869094fec36)({
        name: name,
        email: email,
        password: password,
        passwordConfirm: passwordConfirm
    });
});
if ($d0f7ce18c37ad6f6$var$logOutBtn) $d0f7ce18c37ad6f6$var$logOutBtn.addEventListener("click", (0, $0e0246aa17379d59$export$a0973bcfe11b05c9));
if ($d0f7ce18c37ad6f6$var$updateDataForm) $d0f7ce18c37ad6f6$var$updateDataForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    const form = new FormData(); // 1 object req.body từ input của form
    form.append("name", document.getElementById("name").value);
    form.append("email", document.getElementById("email").value);
    form.append("photo", document.getElementById("photo").files[0]);
    (0, $d35900eb0f47ee8b$export$3bf0495508a61ee)(form, "data");
});
if ($d0f7ce18c37ad6f6$var$updateAvaUser) $d0f7ce18c37ad6f6$var$updateAvaUser.addEventListener("change", (e)=>{
    (0, $d35900eb0f47ee8b$export$aeb2b40572cfe38a)($d0f7ce18c37ad6f6$var$updateAvaUser, ".form__user-photo");
});
if ($d0f7ce18c37ad6f6$var$updatePasswordForm) $d0f7ce18c37ad6f6$var$updatePasswordForm.addEventListener("submit", async (e)=>{
    e.preventDefault();
    document.querySelector(".btn--save-password").textContent = "Updating...";
    const passwordCurrent = document.getElementById("password-current").value;
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("password-confirm").value;
    await (0, $d35900eb0f47ee8b$export$3bf0495508a61ee)({
        passwordCurrent: passwordCurrent,
        password: password,
        passwordConfirm: passwordConfirm
    }, "password");
    document.querySelector(".btn--save-password").textContent = "Save password";
    document.getElementById("password-current").value = "";
    document.getElementById("password").value = "";
    document.getElementById("password-confirm").value = "";
});
if ($d0f7ce18c37ad6f6$var$forgotPasswordForm) $d0f7ce18c37ad6f6$var$forgotPasswordForm.addEventListener("submit", async (e)=>{
    e.preventDefault();
    document.querySelector(".btn-forgot-password").textContent = "Sending...";
    const email = document.getElementById("email").value;
    await (0, $0e0246aa17379d59$export$66791fb2cfeec3e)(email);
    document.querySelector(".btn-forgot-password").textContent = "Send";
    document.getElementById("email").value = "";
});
if ($d0f7ce18c37ad6f6$var$resetPasswordForm) $d0f7ce18c37ad6f6$var$resetPasswordForm.addEventListener("submit", (e)=>{
    const resetToken = document.querySelector("h3").innerText;
    e.preventDefault();
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("passwordConfirm").value;
    (0, $0e0246aa17379d59$export$dc726c8e334dd814)({
        password: password,
        passwordConfirm: passwordConfirm
    }, resetToken);
});
if ($d0f7ce18c37ad6f6$var$bookBtn) $d0f7ce18c37ad6f6$var$bookBtn.addEventListener("click", (e)=>{
    e.target.textContent = "Processing...";
    const { tourId: tourId  } = e.target.dataset;
    (0, $6710bca62beba915$export$8d5bdbf26681c0c2)(tourId);
});


//# sourceMappingURL=bundle.js.map
