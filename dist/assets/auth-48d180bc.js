document.addEventListener("DOMContentLoaded",()=>{const o=document.querySelector(".login-form"),t=document.getElementById("restricted-content");function r(){return!!localStorage.getItem("isLoggedIn")}function s(){t&&(r()?(t.classList.add("active"),document.getElementById("login-message").style.display="none"):(t.classList.remove("active"),document.getElementById("login-message").style.display="block"))}s(),o&&o.addEventListener("submit",function(i){i.preventDefault();const n=new FormData(o),c=n.get("email"),l=n.get("password");fetch("https://jo435.brighton.domains/ci601/login.php",{method:"POST",credentials:"include",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:c,password:l})}).then(e=>e.json()).then(e=>{e.success?(console.log("Login successful"),localStorage.setItem("isLoggedIn",!0),t&&t.classList.add("active"),window.location.href="https://infection-control-alerts.vercel.app"):(console.error("Login failed",e.message),document.querySelector(".error-message").textContent=e.message,document.querySelector(".error-message").style.display="block")}).catch(e=>{console.error("Error:",e),e instanceof SyntaxError?(console.error("Unexpected non-JSON response from the server"),document.querySelector(".error-message").textContent="Login failed due to a server error."):(console.error("Login failed due to a network error or other exception:",e),document.querySelector(".error-message").textContent="Login failed due to a network error or other exception."),document.querySelector(".error-message").style.display="block"})})});
//# sourceMappingURL=auth-48d180bc.js.map