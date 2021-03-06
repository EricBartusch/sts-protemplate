"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const path = require("path");
const mkdirp = require("mkdirp");

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.option("empty");

    Boolean(this.options.empty);
  }

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
        message: "Where is steam installed?",
        default: "C:\\Program Files (x86)\\Steam\\steamapps"
      },
      {
        type: "input",
        name: "description",
        message: "Provide a description of your mod"
      }
    ]);

    this.answers.modIdPascal =
      this.answers.modIdPascal.charAt(0).toUpperCase() +
      this.answers.modIdPascal.slice(1);
    this.modIdCamel = toCamelCase(this.answers.modIdPascal);

    if (!this.options.empty) {
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

      // Go through the list of picked options and set each create option
      this.customizations = {};
      Object.assign(
        this.customizations,
        this.templateChoices.options.includes("Cards") && {
          createCards: true
        },
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

      this.answers.modIdPascal =
        this.answers.modIdPascal.charAt(0).toUpperCase() +
        this.answers.modIdPascal.slice(1);
      this.modIdCamel = toCamelCase(this.answers.modIdPascal);

      if (this.customizations.createChar) {
        this.character = await this.prompt([
          {
            type: "input",
            name: "charName",
            message: "What is the name of the character (in PascalCase)?",
            default: "TheTodo"
          },
          {
            type: "input",
            name: "charColor",
            message: "What is the color for this character?",
            default: "GREY"
          }
        ]);
      } else {
        this.character = { charName: "TheTodo", charColor: "GREY" };
      }

      // Change TheTodo to THE_TODO for use in Enums
      this.character.charNameEnum = this.character.charName
        .split(/(?=[A-Z])/)
        .join("_")
        .toUpperCase();
      // Change TheTodo to The Todo and the Todo for charstrings
      this.character.charStringsCapital = this.character.charName
        .replace(/([A-Z])/g, " $1")
        .trim();
      this.character.charStringsFirstLower =
        this.character.charStringsCapital.slice(0, 1).toLowerCase() +
        this.character.charStringsCapital.slice(1);
      // Change color Enum
      this.character.charColor = (
        this.character.charName.toLowerCase().replace("the", "") +
        "_" +
        this.character.charColor
      ).toUpperCase();
    }
  }

  writing() {
    if (!this.options.empty) {
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
          createChar: this.customizations.createChar,
          charName: this.character.charName,
          charNameEnum: this.character.charNameEnum,
          charColor: this.character.charColor
        }
      );

      // Custom Character
      if (this.customizations.createChar) {
        this.fs.copyTpl(
          this.templatePath(`src/main/java/theTodo/TheTodo.java`),
          this.destinationPath(
            `src/main/java/${this.modIdCamel}/${this.character.charName}.java`
          ),
          {
            modIdPascal: this.answers.modIdPascal,
            modIdCamel: this.modIdCamel,
            createCards: this.customizations.createCards,
            createRelics: this.customizations.createRelics,
            charName: this.character.charName,
            charNameEnum: this.character.charNameEnum,
            charColor: this.character.charColor
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
          steamPath: this.answers.steamPath,
          description: this.answers.description
        }
      );

      // README
      this.fs.copyTpl(
        this.templatePath("README"),
        this.destinationPath("README.md")
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
            modIdCamel: this.modIdCamel,
            createChar: this.customizations.createChar,
            charName: this.character.charName,
            charColor: this.character.charColor
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
            modIdCamel: this.modIdCamel,
            modIdLower: this.answers.modIdPascal.toLowerCase()
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
            modIdCamel: this.modIdCamel,
            createChar: this.customizations.createChar,
            charName: this.character.charName,
            charColor: this.character.charColor
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
          modIdCamel: this.modIdCamel,
          charName: this.character.charName,
          charStringsCapital: this.character.charStringsCapital,
          charStringsFirstLower: this.character.charStringsFirstLower
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
        this.fs.delete(
          `src/main/java/${this.modIdCamel}/cards/democards/complex/ExampleTwoAmountPowerCard.java`
        );
        this.fs.delete(
          `src/main/java/${this.modIdCamel}/cards/democards/complex/InlinePowerDemo.java`
        );
      }

      if (!this.customizations.createChar) {
        this.fs.delete(
          `src/main/resources/${this.answers.modIdPascal.toLowerCase()}Resources/images/char`
        );
        this.fs.delete(
          `src/main/resources/${this.answers.modIdPascal.toLowerCase()}Resources/images/charSelect`
        );
        this.fs.delete(
          `src/main/resources/${this.answers.modIdPascal.toLowerCase()}Resources/localization/eng/Charstrings.json`
        );
      }

      if (!this.customizations.createActions) {
        this.fs.delete(
          `src/main/java/${this.modIdCamel}/cards/democards/complex/EasyModalChoiceDemo.java`
        );
        this.fs.delete(
          `src/main/java/${this.modIdCamel}/cards/democards/complex/EasyXCostDemo.java`
        );
        this.fs.delete(
          `src/main/java/${this.modIdCamel}/cards/democards/complex/InlinePowerDemo.java`
        );
      }
    } else {
      // Entrypoint
      this.fs.copyTpl(
        this.templatePath(`empty/src/main/java/theTodo/TodoMod.java`),
        this.destinationPath(
          `src/main/java/${this.modIdCamel}/${this.answers.modIdPascal}.java`
        ),
        {
          modIdPascal: this.answers.modIdPascal,
          modIdCamel: this.modIdCamel,
          modIdLower: this.answers.modIdPascal.toLowerCase()
        }
      );

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
          steamPath: this.answers.steamPath,
          description: this.answers.description
        }
      );

      // Resources
      mkdirp.sync(
        path.join(
          this.destinationPath(),
          `src/main/resources/${this.answers.modIdPascal.toLowerCase()}Resources/`
        )
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

      // README
      this.fs.copyTpl(
        this.templatePath("README"),
        this.destinationPath("README.md")
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
