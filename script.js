
// =================================
// COPIAR COMANDOS
// =================================

document.querySelectorAll(".copy-btn").forEach(button => {
    button.addEventListener("click", async () => {
        const command = button
            .parentElement
            .querySelector("code")
            .textContent.trim();

        try {
            await navigator.clipboard.writeText(command);

            button.textContent = "¡Copiado!";
            button.style.background = "#16a34a";

            setTimeout(() => {
                button.textContent = "Copiar";
                button.style.background = "";
            }, 1500);

        } catch (error) {
            button.textContent = "Error";
            console.error("No se pudo copiar:", error);
        }
    });
});


// =================================
// BUSCADOR DE COMANDOS
// =================================

const searchInput = document.getElementById("searchInput");
const commandCards = document.querySelectorAll(".command-card");
const filters = document.querySelectorAll(".filter");
const emptyMessage = document.getElementById("emptyMessage");

let currentFilter = "todos";

function filterCommands() {
    const search = searchInput.value.toLowerCase().trim();
    let visibleCount = 0;

    commandCards.forEach(card => {
        const content = card.textContent.toLowerCase();
        const category = card.dataset.category;

        const matchesSearch = content.includes(search);

        const matchesCategory =
            currentFilter === "todos" ||
            category === currentFilter;

        const visible = matchesSearch && matchesCategory;

        card.style.display = visible ? "block" : "none";

        if (visible) visibleCount++;
    });

    emptyMessage.hidden = visibleCount !== 0;
}

searchInput.addEventListener("input", filterCommands);


// =================================
// FILTROS POR CATEGORÍA
// =================================

filters.forEach(button => {
    button.addEventListener("click", () => {

        filters.forEach(filter => {
            filter.classList.remove("active");
        });

        button.classList.add("active");

        currentFilter = button.dataset.filter;

        filterCommands();
    });
});


// =================================
// MODO OSCURO Y MODO CLARO
// =================================

const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");

    const isLight = document.body.classList.contains("light");

    themeBtn.textContent = isLight ? "☀" : "☾";

    localStorage.setItem(
        "theme",
        isLight ? "light" : "dark"
    );
});


// =================================
// CARGAR TEMA GUARDADO
// =================================

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
    document.body.classList.add("light");
    themeBtn.textContent = "☀";
}


// =================================
// AÑO AUTOMÁTICO DEL FOOTER
// =================================

const footerYear = document.querySelector("footer small");

if (footerYear) {
    footerYear.textContent =
        `© ${new Date().getFullYear()} DevGuide | Guía de Git y GitHub`;
}


// =================================
// FILTRAR AL INICIAR
// =================================

filterCommands();
