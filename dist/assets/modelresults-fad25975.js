function c(){return fetch("https://jo435.brighton.domains/ci601/get-locations.php").then(n=>{if(!n.ok)throw new Error("Network response was not ok");return n.json()}).catch(n=>{console.error("There has been a problem with your fetch operation:",n)})}function d(n){const i=n.filter(e=>e.Source.trim()==="RAE"),s=n.filter(e=>e.Source.trim()==="RCOUR7"),r=n.filter(e=>e.Source.trim()==="RL14"),a=n.filter(e=>e.Source.trim()==="IPICK"),l=n.filter(e=>e.Source.trim()==="RRENU");i.forEach(e=>{const t=document.getElementById("rae-point");t&&(t.querySelector(".label").textContent=e.Name||"A&E Department",t.querySelector(".text").innerHTML=`
            <p><strong>Lab No:</strong> ${e.LabNo.trim()}</p>
                <p><strong>Isolate:</strong> ${e.Isolate}</p>
            `,document.querySelector(".loading-container").classList.contains("hidden")?t.classList.add("visible"):setTimeout(()=>{t.classList.add("visible")},5e3))}),s.forEach(e=>{const t=document.getElementById("rcour-point");t&&(t.querySelector(".label").textContent="Courtyard",t.querySelector(".text").innerHTML=`
                <p><strong>Isolate:</strong> ${e.Isolate}</p>
                <p><strong>Lab No:</strong> ${e.LabNo.trim()}</p>
            `,document.querySelector(".loading-container").classList.contains("hidden")?t.classList.add("visible"):setTimeout(()=>{t.classList.add("visible")},5e3))}),r.forEach(e=>{const t=document.getElementById("rl14-point");t&&(t.querySelector(".label").textContent="Level 14",t.querySelector(".text").innerHTML=`
            <p><strong>Lab No:</strong> ${e.LabNo.trim()}</p>
                <p><strong>Isolate:</strong> ${e.Isolate}</p>
            `,document.querySelector(".loading-container").classList.contains("hidden")?t.classList.add("visible"):setTimeout(()=>{t.classList.add("visible")},5e3))}),a.forEach(e=>{const t=document.getElementById("seh-point");t&&(t.querySelector(".label").textContent="SEH Ward",t.querySelector(".text").innerHTML=`
            <p><strong>Lab No:</strong> ${e.LabNo.trim()}</p>
            <p><strong>Isolate:</strong> ${e.Isolate}</p>
            `,document.querySelector(".loading-container").classList.contains("hidden")?t.classList.add("visible"):setTimeout(()=>{t.classList.add("visible")},5e3))}),l.forEach(e=>{const t=document.getElementById("rrenu-point");t&&(t.querySelector(".label").textContent="Renal Unit",t.querySelector(".text").innerHTML=`
                <p><strong>Lab No:</strong> ${e.LabNo.trim()}</p>
                <p><strong>Isolate:</strong> ${e.Isolate}</p>
            `,document.querySelector(".loading-container").classList.contains("hidden")?t.classList.add("visible"):setTimeout(()=>{t.classList.add("visible")},5e3))})}document.addEventListener("DOMContentLoaded",function(){c().then(n=>{n?d(n):console.error("Failed to fetch data or data is empty")})});
//# sourceMappingURL=modelresults-fad25975.js.map
