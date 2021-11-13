const buildContextMenuOptions = (modules) => {
  return modules.reduce((optionsArr, currentModule) => {
    const { moduleName, shortName, enabledProperty } = currentModule;
    if (game.modules.get(moduleName).active) {
      optionsArr.push(
        {
          name: shortName,
          icon: "<i class='fas fa-toggle-on fa-lg'></i>",
          condition: () => game.settings.get(moduleName, enabledProperty),
          callback: async () => {
            await game.settings.set(moduleName, enabledProperty, false);
          },
        },
        {
          name: shortName,
          icon: "<i class='fas fa-toggle-off fa-lg'></i>",
          condition: () => !game.settings.get(moduleName, enabledProperty),
          callback: async () => {
            await game.settings.set(moduleName, enabledProperty, true);
          },
        }
      );
    }
    return optionsArr;
  }, []);
};

Hooks.once("renderChatLog", (app, html, data) => {
  const contextMenuOptions = buildContextMenuOptions([
    {
      moduleName: "dnd5e-perfect-crits",
      shortName: "Perfect Crits",
      enabledProperty: "usePerfectCrits",
    },
    {
      moduleName: "dnd5e-quick-item-rolls",
      shortName: "Quick Item Rolls",
      enabledProperty: "useQuickItemRolls",
    },
  ]);

  new ContextMenu(
    html,
    ".chat-control-icon",
    contextMenuOptions,
    "renderModuleContextMenuSettings"
  );
});
