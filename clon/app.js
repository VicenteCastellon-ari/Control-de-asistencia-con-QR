const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");

if (menuBtn && sidebar) {
    menuBtn.addEventListener("click", () => {
        sidebar.classList.toggle("open");
    });
}

const clockEl = document.getElementById("liveClock");
if (clockEl) {
    const updateClock = () => {
        const now = new Date();
        clockEl.textContent = now.toLocaleTimeString("es-VE", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        });
    };
    updateClock();
    setInterval(updateClock, 1000);
}

const punchBtn = document.getElementById("punchBtn");
const punchStatus = document.getElementById("punchStatus");
const activityBody = document.getElementById("activityBody");
let isClockedIn = false;

if (punchBtn && punchStatus && activityBody) {
    punchBtn.addEventListener("click", () => {
        isClockedIn = !isClockedIn;
        const time = new Date().toLocaleTimeString("es-VE", {
            hour: "2-digit",
            minute: "2-digit"
        });

        if (isClockedIn) {
            punchBtn.textContent = "Registrar Salida QR";
            punchStatus.textContent = `Jornada activa desde las ${time}`;
        } else {
            punchBtn.textContent = "Registrar Entrada QR";
            punchStatus.textContent = `Última salida registrada a las ${time}`;
        }

        const row = document.createElement("tr");
        const action = isClockedIn ? "Entrada QR" : "Salida QR";
        const badgeClass = isClockedIn ? "badge-ok" : "badge-warn";
        row.innerHTML = `
      <td>Vicente Castellón</td>
      <td>${time}</td>
      <td>Laboratorio 2</td>
      <td><span class="badge ${badgeClass}">${action}</span></td>
    `;
        activityBody.prepend(row);
    });
}

const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");
const sheetBody = document.getElementById("sheetBody");

if (searchInput && statusFilter && sheetBody) {
    const filterRows = () => {
        const query = searchInput.value.toLowerCase();
        const status = statusFilter.value;
        const rows = sheetBody.querySelectorAll("tr");

        rows.forEach((row) => {
            const text = row.textContent.toLowerCase();
            const rowStatus = row.getAttribute("data-status");
            const matchesText = text.includes(query);
            const matchesStatus = status === "todos" || rowStatus === status;
            row.style.display = matchesText && matchesStatus ? "" : "none";
        });
    };

    searchInput.addEventListener("input", filterRows);
    statusFilter.addEventListener("change", filterRows);
}

const qrModal = document.getElementById("qrModal");
const modalName = document.getElementById("modalName");
const modalCode = document.getElementById("modalCode");
const closeModal = document.getElementById("closeModal");

document.querySelectorAll(".qr-trigger").forEach((btn) => {
    btn.addEventListener("click", () => {
        if (!qrModal || !modalName || !modalCode) return;
        modalName.textContent = btn.getAttribute("data-name");
        modalCode.textContent = btn.getAttribute("data-code");
        qrModal.classList.add("open");
    });
});

if (closeModal && qrModal) {
    closeModal.addEventListener("click", () => {
        qrModal.classList.remove("open");
    });
}