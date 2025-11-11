enum Button {
  ABILITY_1 = "Ability 1",
  ABILITY_2 = "Ability 2",
  CROUCH = "Crouch",
  INTERACT = "Interact",
  JUMP = "Jump",
  MELEE = "Melee",
  PRIMARY = "Primary Fire",
  RELOAD = "Reload",
  SECONDARY = "Secondary Fire",
  ULTIMATE = "Ultimate",
}

const ButtonComboToString = (buttons: Button[]): string => {
  return buttons.map((button) => button).join(" + ")
}

/**
 * Maps button combinations to their corresponding quick action indices in `quickAction.del`.
 */
const DefaultButtonComboMappings: Record<string, number> = {
  [ButtonComboToString([Button.CROUCH, Button.INTERACT])]: 5,
  [ButtonComboToString([Button.CROUCH, Button.MELEE])]: 4,
  [ButtonComboToString([Button.CROUCH, Button.INTERACT])]: 8,
  [ButtonComboToString([Button.CROUCH, Button.JUMP])]: 3,
  [ButtonComboToString([Button.INTERACT, Button.ABILITY_1])]: 9,
  [ButtonComboToString([Button.INTERACT, Button.ABILITY_2])]: 6,
  [ButtonComboToString([Button.INTERACT, Button.ULTIMATE])]: 1,
}

const ButtonComboToArrayString = (buttons: Button[]): string => {
  return `["${buttons.map((b) => `Button.${b}`).join('", "')}"]`
}
const ComboTemplateString = `WorkshopSettingCombo(QuickActionsCategory, "%BUTTONCOMBO%", %QUICKACTIONINDEX%, QuickActionLabels, 0)`

const AllCombos = Object.values(Button).flatMap((button1, i) =>
  Object.values(Button).slice(i + 1).map((button2) => [button1, button2]),
)
// console.log(AllCombos)

let PossibleTriggersOutput = "[\n";
let ActionSettingsOutput = "[\n";

AllCombos.forEach((combo) => {
  const comboString = ButtonComboToString(combo);
  const comboArrayString = ButtonComboToArrayString(combo);
  const quickActionIndex = DefaultButtonComboMappings[comboString] ?? 0;

  PossibleTriggersOutput += `  [${combo.map((b) => `Button.${b.replaceAll(" ", "")}`).join(", ")}],\n`;
  ActionSettingsOutput += `  ${ComboTemplateString
    .replace("%BUTTONCOMBO%", ButtonComboToString(combo))
    .replace("%QUICKACTIONINDEX%", quickActionIndex.toString())
  },\n`;
});

PossibleTriggersOutput += "]\n";
ActionSettingsOutput += "]\n";

console.log("Possible Triggers:\n" + PossibleTriggersOutput);
console.log("Action Settings:\n" + ActionSettingsOutput);
