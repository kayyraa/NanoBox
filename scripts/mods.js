import * as Api from "./api.js";

const Mods = JSON.parse(localStorage.getItem("Mods")) || [];
Mods.forEach(Mod => {
    if (Mod.Enabled) {
        eval(Mod.Content);
    }

    const ModItem = document.createElement("div");
    Api.ModsManager.querySelector(".Mods").appendChild(ModItem);

    const ModHeader = document.createElement("header");
    ModHeader.innerHTML = Mod.Name;
    ModItem.appendChild(ModHeader);

    const ModSettings = document.createElement("div");
    ModItem.appendChild(ModSettings);

    const ModEnabledLabel = document.createElement("span");
    ModEnabledLabel.innerHTML = Mod.Enabled ? "Enabled" : "Disabled";
    ModEnabledLabel.style.color = Mod.Enabled ? "rgb(120, 255, 120)" : "rgb(255, 0, 0)";
    ModSettings.appendChild(ModEnabledLabel);

    const ModToggleButton = document.createElement("button");
    ModToggleButton.innerHTML = "Toggle";
    ModToggleButton.addEventListener("click", () => {
        Mod.Enabled = !Mod.Enabled;
        ModEnabledLabel.innerHTML = Mod.Enabled ? "Enabled" : "Disabled";
        ModEnabledLabel.style.color = Mod.Enabled ? "rgb(120, 255, 120)" : "rgb(255, 0, 0)";
        ModWarnLabel.style.color = "rgb(120, 255, 120)";
        localStorage.setItem("Mods", JSON.stringify(Mods));
    });
    ModSettings.appendChild(ModToggleButton);

    const ModRemoveButton = document.createElement("button");
    ModRemoveButton.innerHTML = "Remove";
    ModRemoveButton.style.color = "rgb(255, 0, 0)";
    ModRemoveButton.addEventListener("click", () => {
        const Mods = JSON.parse(localStorage.getItem("Mods")) || [];
        const Index = Mods.findIndex(Item => Item.Name === Mod.Name);
        if (Index !== -1) {
            Mods.splice(Index, 1);
            localStorage.setItem("Mods", JSON.stringify(Mods));
            ModWarnLabel.style.color = "rgb(120, 255, 120)";
        }
    });    
    ModSettings.appendChild(ModRemoveButton);

    const ModWarnLabel = document.createElement("span");
    ModWarnLabel.innerHTML = "*Restart to apply changes";
    ModSettings.appendChild(ModWarnLabel);
});