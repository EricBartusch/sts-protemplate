"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");

module.exports = class extends Generator {
  async prompting() {
    this.log(
      yosay(
        `Welcome to the ${chalk.red("sts")}${chalk.green("-pro")}${chalk.blue(
          "tem"
        )}${chalk.magenta("plate")} generator!`
      )
    );

    this.answers = await this.prompt([
      {
        type: "input",
        name: "modIdPascal",
        message: "Mod ID PascalCase:",
        validate: function(input) {
          if (input === "") {
            return "Your mod ID can't be blank.";
          }

          return true;
        }
      },
      {
        type: "author",
        name: "author",
        message: "Who is making this?"
      },
      {
        type: "input",
        name: "steamPath",
        message:
          "Where is steam installed? If blank, will default to: C:\\Program Files (x86)\\Steam\\steamapps",
        default: "C:\\Program Files (x86)\\Steam\\steamapps"
      }
    ]);

    this.log(yosay(`Ok, now to customize your template.`));

    this.makeAll = await this.prompt({
      type: "confirm",
      name: "makeAll",
      message: "Do you want the entire template generated?"
    });

    if (!this.makeAll.makeAll) {
      this.makeEmpty = await this.prompt({
        type: "confirm",
        name: "makeEmpty",
        message: "Do you want a nearly blank template instead?"
      });
    }

    if (!this.makeAll.makeAll && !this.makeEmpty.makeEmpty) {
      this.log(yosay(`Alright then let's choose which parts to generate.`));
      this.templateChoices = await this.prompt({
        type: "checkbox",
        name: "options",
        message: "What parts do you want to generate?",
        choices: [
          "Cards",
          "Relics",
          "CardMods",
          "Powers",
          "Actions",
          "Character"
        ]
      });
    }

    // If they chose to make everything
    if (this.makeAll.makeAll) {
      this.customizations = {
        createCards: true,
        createRelics: true,
        createCardMods: true,
        createPowers: true,
        createActions: true,
        createChar: true
      };
    }

    // If they chose to make an empty template
    else if (this.makeEmpty.makeEmpty) {
      this.customizations = {
        createCards: false,
        createRelics: false,
        createCardMods: false,
        createPowers: false,
        createActions: false,
        createChar: false
      };
    }

    // Go through the list of picked options and set each create option
    else {
      this.customizations = {};
      Object.assign(
        this.customizations,
        this.templateChoices.options.includes("Cards") && { createCards: true },
        this.templateChoices.options.includes("Relics") && {
          createRelics: true
        },
        this.templateChoices.options.includes("CardMods") && {
          createCardMods: true
        },
        this.templateChoices.options.includes("Powers") && {
          createPowers: true
        },
        this.templateChoices.options.includes("Actions") && {
          createActions: true
        },
        this.templateChoices.options.includes("Character") && {
          createChar: true
        }
      );
    }

    this.answers.modIdPascal =
      this.answers.modIdPascal.charAt(0).toUpperCase() +
      this.answers.modIdPascal.slice(1);
    this.modIdCamel = toCamelCase(this.answers.modIdPascal);
  }

  writing() {
    // Entrypoint
    this.fs.copyTpl(
      this.templatePath(`src/main/java/theTodo/TodoMod.java`),
      this.destinationPath(
        `src/main/java/${this.modIdCamel}/${this.answers.modIdPascal}.java`
      ),
      {
        modIdPascal: this.answers.modIdPascal,
        modIdCamel: this.modIdCamel,
        modIdLower: this.answers.modIdPascal.toLowerCase(),
        createCards: this.customizations.createCards,
        createRelics: this.customizations.createRelics,
        createPowers: this.customizations.createPowers,
        createChar: this.customizations.createChar
      }
    );

    // Custom Character
    if (this.customizations.createChar) {
      this.fs.copyTpl(
        this.templatePath(`src/main/java/theTodo/TheTodo.java`),
        this.destinationPath(`src/main/java/${this.modIdCamel}/TheTodo.java`),
        {
          modIdPascal: this.answers.modIdPascal,
          modIdCamel: this.modIdCamel,
          createCards: this.customizations.createCards,
          createRelics: this.customizations.createRelics
        }
      );
    }

    // Pom
    this.fs.copyTpl(
      this.templatePath("pom.xml"),
      this.destinationPath("pom.xml"),
      {
        modIdPascal: this.answers.modIdPascal,
        modIdCamel: this.modIdCamel,
        modIdLower: this.answers.modIdPascal.toLowerCase(),
        modIdSpaces: this.answers.modIdPascal
          .replace(/([A-Z])/g, " $1")
          .slice(1),
        steamPath: this.answers.steamPath
      }
    );

    // Actions
    if (this.customizations.createActions) {
      this.fs.copyTpl(
        this.templatePath(`src/main/java/theTodo/actions/*`),
        this.destinationPath(`src/main/java/${this.modIdCamel}/actions/`),
        {
          modIdPascal: this.answers.modIdPascal,
          modIdCamel: this.modIdCamel
        },
        null,
        { globOptions: { dot: true } }
      );
    }

    // Cardmods
    if (this.customizations.createCardMods) {
      this.fs.copyTpl(
        this.templatePath(`src/main/java/theTodo/cardmods/*`),
        this.destinationPath(`src/main/java/${this.modIdCamel}/cardmods/`),
        {
          modIdPascal: this.answers.modIdPascal,
          modIdCamel: this.modIdCamel
        },
        null,
        { globOptions: { dot: true } }
      );
    }

    // Cards
    if (this.customizations.createCards) {
      this.fs.copyTpl(
        this.templatePath(`src/main/java/theTodo/cards/**/*`),
        this.destinationPath(`src/main/java/${this.modIdCamel}/cards/`),
        {
          modIdPascal: this.answers.modIdPascal,
          modIdCamel: this.modIdCamel
        },
        null,
        { globOptions: { dot: true } }
      );
    }

    // Powers
    if (this.customizations.createPowers) {
      this.fs.copyTpl(
        this.templatePath(`src/main/java/theTodo/powers/*`),
        this.destinationPath(`src/main/java/${this.modIdCamel}/powers/`),
        {
          modIdPascal: this.answers.modIdPascal,
          modIdCamel: this.modIdCamel
        },
        null,
        { globOptions: { dot: true } }
      );
    }

    // Relics
    if (this.customizations.createRelics) {
      this.fs.copyTpl(
        this.templatePath(`src/main/java/theTodo/relics/*`),
        this.destinationPath(`src/main/java/${this.modIdCamel}/relics/`),
        {
          modIdPascal: this.answers.modIdPascal,
          modIdCamel: this.modIdCamel
        },
        null,
        { globOptions: { dot: true } }
      );
    }

    // Util
    this.fs.copyTpl(
      this.templatePath(`src/main/java/theTodo/util/*`),
      this.destinationPath(`src/main/java/${this.modIdCamel}/util/`),
      {
        modIdPascal: this.answers.modIdPascal,
        modIdCamel: this.modIdCamel,
        createPowers: this.customizations.createPowers,
        createActions: this.customizations.createActions
      },
      null,
      { globOptions: { dot: true } }
    );

    // Resources
    this.fs.copyTpl(
      this.templatePath(`src/main/resources/todomodResources/**/*`),
      this.destinationPath(
        `src/main/resources/${this.answers.modIdPascal.toLowerCase()}Resources/`
      ),
      {
        modIdPascal: this.answers.modIdPascal,
        modIdCamel: this.modIdCamel
      },
      null,
      { globOptions: { dot: true } }
    );

    this.fs.copyTpl(
      this.templatePath(`src/main/resources/ModTheSpire.json`),
      this.destinationPath(`src/main/resources/ModTheSpire.json`),
      {
        modIdPascal: this.answers.modIdPascal,
        modIdCamel: this.modIdCamel,
        author: this.answers.author
      }
    );

    // Delete unused stuff
    if (!this.customizations.createCards) {
      this.fs.delete(
        `src/main/java/${this.modIdCamel}/util/CardArtRoller.java`
      );
      this.fs.delete(
        `src/main/resources/${this.answers.modIdPascal.toLowerCase()}Resources/localization/eng/Cardstrings.json`
      );
    }

    if (!this.customizations.createRelics) {
      this.fs.delete(
        `src/main/resources/${this.answers.modIdPascal.toLowerCase()}Resources/localization/eng/Relicstrings.json`
      );
    }

    if (!this.customizations.createCardMods) {
      this.fs.delete(
        `src/main/java/${this.modIdCamel}/cards/democards/complex/InlineCardModDemo.java`
      );
      this.fs.delete(
        `src/main/java/${this.modIdCamel}/cards/democards/complex/SelectCardsPlusCardMods.java`
      );
    }

    if (!this.customizations.createPowers) {
      this.fs.delete(
        `src/main/resources/${this.answers.modIdPascal.toLowerCase()}Resources/localization/eng/Powerstrings.json`
      );
    }

    if (!this.customizations.createChar) {
      this.fs.delete(
        `src/main/resources/${this.answers.modIdPascal.toLowerCase()}Resources/images`
      );
      this.fs.delete(
        `src/main/resources/${this.answers.modIdPascal.toLowerCase()}Resources/localization/eng/Charstrings.json`
      );
    }
  }
};

function toCamelCase(modId) {
  if (modId) {
    let firstChar = modId.charAt(0).toLowerCase();
    let newName = firstChar + modId.slice(1);

    return newName;
  }

  return modId;
}
