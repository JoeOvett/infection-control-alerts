document.addEventListener("DOMContentLoaded",()=>{const o=document.querySelector(".login-form"),t=document.getElementById("restricted-content");function r(){return!!localStorage.getItem("isLoggedIn")}r()&&t&&(t.style.display="flex"),o&&o.addEventListener("submit",function(s){s.preventDefault();const n=new FormData(o),c=n.get("email"),l=n.get("password");fetch("https://jo435.brighton.domains/ci601/login.php",{method:"POST",credentials:"include",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:c,password:l})}).then(e=>e.json()).then(e=>{e.success?(console.log("Login successful"),localStorage.setItem("isLoggedIn",!0),t&&(t.style.display="flex"),window.location.href="https://infection-control-alerts.vercel.app"):(console.error("Login failed",e.message),document.querySelector(".error-message").textContent=e.message,document.querySelector(".error-message").style.display="block")}).catch(e=>{console.error("Error:",e),document.querySelector(".error-message").textContent="Login failed due to a network error.",document.querySelector(".error-message").style.display="block"})})});
//# sourceMappingURL=auth-6021a360.js.map
