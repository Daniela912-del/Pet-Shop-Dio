const MAX_WATER = 30;
const MAX_SHAMPOO = 10;

const state = {
    water: MAX_WATER,
    shampoo: MAX_SHAMPOO,
    pet: null,
    machineClean: true
};

let selectedChoice = "";

const elements = {
    form: document.querySelector("#pet-form"),
    petInput: document.querySelector("#pet-input"),
    petName: document.querySelector("#pet-name"),
    petBadge: document.querySelector("#pet-status-badge"),
    petEmoji: document.querySelector("#pet-emoji"),
    machineStatus: document.querySelector("#machine-status"),
    waterValue: document.querySelector("#water-value"),
    shampooValue: document.querySelector("#shampoo-value"),
    waterProgress: document.querySelector("#water-progress"),
    shampooProgress: document.querySelector("#shampoo-progress"),
    waterFill: document.querySelector(".water-fill"),
    shampooFill: document.querySelector(".shampoo-fill"),
    message: document.querySelector("#message"),
    messageText: document.querySelector("#message-text"),
    waterButton: document.querySelector("#water-button"),
    shampooButton: document.querySelector("#shampoo-button"),
    statusButton: document.querySelector("#status-button"),
    checkPetButton: document.querySelector("#check-pet-button"),
    bathButton: document.querySelector("#bath-button"),
    removeButton: document.querySelector("#remove-button"),
    cleanButton: document.querySelector("#clean-button"),
    exitButton: document.querySelector("#exit-button")
};

function showMessage(message, isError = false) {
    elements.messageText.textContent = selectedChoice
        ? `Você escolheu: ${selectedChoice}. ${message}`
        : message;
    elements.message.classList.toggle("is-error", isError);
    elements.message.querySelector(".message-icon").textContent = isError ? "⚠️" : "✨";
}

function confirmChoice(choice) {
    selectedChoice = choice;
}

function updateScreen() {
    const hasPet = state.pet !== null;

    elements.petName.textContent = hasPet ? state.pet.name : "Nenhum pet";
    elements.petBadge.textContent = hasPet
        ? (state.pet.clean ? "Banho concluído" : "Aguardando banho")
        : "Aguardando";
    elements.petBadge.classList.toggle("is-present", hasPet);
    elements.petEmoji.classList.toggle("is-empty", !hasPet);
    elements.petEmoji.textContent = hasPet ? "🐶" : "🐾";

    elements.machineStatus.classList.toggle("status-clean", state.machineClean);
    elements.machineStatus.classList.toggle("status-dirty", !state.machineClean);
    elements.machineStatus.innerHTML = `<span class="status-dot"></span> ${state.machineClean ? "Limpa" : "Precisa de limpeza"}`;

    elements.waterValue.textContent = state.water;
    elements.shampooValue.textContent = state.shampoo;
    elements.waterProgress.setAttribute("aria-valuenow", state.water);
    elements.shampooProgress.setAttribute("aria-valuenow", state.shampoo);
    elements.waterFill.style.width = `${(state.water / MAX_WATER) * 100}%`;
    elements.shampooFill.style.width = `${(state.shampoo / MAX_SHAMPOO) * 100}%`;

}

elements.statusButton.addEventListener("click", () => {
    confirmChoice("Ver status");
    const petStatus = state.pet
        ? `${state.pet.name} está na máquina${state.pet.clean ? " e já tomou banho" : " e aguarda o banho"}`
        : "não há pet na máquina";
    showMessage(
        `Água: ${state.water}/${MAX_WATER}; shampoo: ${state.shampoo}/${MAX_SHAMPOO}; máquina ${state.machineClean ? "limpa" : "suja"}; ${petStatus}.`
    );
});

elements.checkPetButton.addEventListener("click", () => {
    confirmChoice("Verificar pet na máquina");
    showMessage(
        state.pet
            ? `${state.pet.name} está na máquina${state.pet.clean ? " e já está limpinho(a)." : " e ainda precisa tomar banho."}`
            : "Não há pet na máquina."
    );
});

elements.form.addEventListener("submit", (event) => {
    event.preventDefault();
    confirmChoice("Colocar pet na máquina");

    const name = elements.petInput.value.trim();
    if (!name) {
        showMessage("Digite o nome do pet antes de colocá-lo na máquina.", true);
        elements.petInput.focus();
        return;
    }
    if (!state.machineClean) {
        showMessage("A máquina está suja. Limpe-a antes de colocar outro pet.", true);
        return;
    }
    if (state.pet) {
        showMessage("Já há um pet na máquina.", true);
        return;
    }

    state.pet = { name, clean: false };
    elements.petInput.value = "";
    updateScreen();
    showMessage(`${name} está na máquina. Quando quiser, é só iniciar o banho!`);
});

elements.bathButton.addEventListener("click", () => {
    confirmChoice("Dar banho no pet");
    if (!state.pet) {
        showMessage("Coloque um pet na máquina antes de iniciar o banho.", true);
        return;
    }
    if (state.pet.clean) {
        showMessage(`${state.pet.name} já tomou banho.`);
        return;
    }

    state.pet.clean = true;
    updateScreen();
    showMessage(`Banho concluído! ${state.pet.name} está limpinho(a).`);
});

elements.removeButton.addEventListener("click", () => {
    confirmChoice("Remover pet da máquina");
    if (!state.pet) {
        showMessage("Não há pet na máquina para remover.", true);
        return;
    }

    const removedPet = state.pet;
    state.machineClean = removedPet.clean;
    state.pet = null;
    updateScreen();
    showMessage(
        state.machineClean
            ? `${removedPet.name} foi removido(a). A máquina continua limpa.`
            : `${removedPet.name} foi removido(a). Agora é preciso limpar a máquina.`
    );
});

elements.waterButton.addEventListener("click", () => {
    confirmChoice("Abastecer água");
    if (state.water >= MAX_WATER) {
        showMessage("A capacidade de água já está no máximo.", true);
        return;
    }

    const previousWater = state.water;
    state.water = Math.min(state.water + 2, MAX_WATER);
    const addedWater = state.water - previousWater;
    updateScreen();
    showMessage(`Você colocou ${addedWater} unidades de água. Nível atual: ${state.water} de ${MAX_WATER}.`);
});

elements.shampooButton.addEventListener("click", () => {
    confirmChoice("Abastecer shampoo");
    if (state.shampoo >= MAX_SHAMPOO) {
        showMessage("A capacidade de shampoo já está no máximo.", true);
        return;
    }

    const previousShampoo = state.shampoo;
    state.shampoo = Math.min(state.shampoo + 2, MAX_SHAMPOO);
    const addedShampoo = state.shampoo - previousShampoo;
    updateScreen();
    showMessage(`Você colocou ${addedShampoo} unidades de shampoo. Nível atual: ${state.shampoo} de ${MAX_SHAMPOO}.`);
});

elements.exitButton.addEventListener("click", () => {
    confirmChoice("Sair");
    showMessage("Até logo! Obrigado por cuidar tão bem do seu pet. 🐾");
});

elements.cleanButton.addEventListener("click", () => {
    confirmChoice("Limpar a máquina");
    if (state.pet) {
        showMessage("Remova o pet antes de limpar a máquina.", true);
        return;
    }
    if (state.machineClean) {
        showMessage("A máquina já está limpa.");
        return;
    }
    if (state.water < 10 || state.shampoo < 2) {
        showMessage("Para limpar, são necessárias 10 unidades de água e 2 de shampoo.", true);
        return;
    }

    state.water -= 10;
    state.shampoo -= 2;
    state.machineClean = true;
    updateScreen();
    showMessage(`Máquina limpa! Restam ${state.water} unidades de água e ${state.shampoo} de shampoo.`);
});

updateScreen();
