document.addEventListener("DOMContentLoaded",function(){const t=n("token");console.log("JWT from cookie: ",t),t?fetch("https://jo435.brighton.domains/protected",{method:"GET",credentials:"include"}).then(o=>{if(console.log("Response status: ",o.status),o.ok)console.log("Token is valid, showing restricted content."),document.getElementById("restricted-content").style.display="block";else throw new Error("Not authorized")}).catch(o=>{console.error("Authentication error:",o),window.location.href="https://jo435.brighton.domains/ci601/login.php"}):(console.log("No token found, redirecting to login."),window.location.href="https://jo435.brighton.domains/ci601/login.php")});function n(t){const e=`; ${document.cookie}`.split(`; ${t}=`);return e.length===2?e.pop().split(";").shift():null}
//# sourceMappingURL=auth-401bf45e.js.map