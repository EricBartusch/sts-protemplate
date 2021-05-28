"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");

module.exports = class extends Generator {
  async prompting() {
    this.log(
      yosay(`Welcome to the ${chalk.red("sts-protemplate")} generator!`)
    );

    this.answers = await this.prompt([
      {
        type: "input",
        name: "modIdPascal",
        message: "Mod ID PascalCase:"
      },
      {
        type: "input",
        name: "steamPath",
        message:
          "Where is steam installed? If blank, will default to: C:\\Program Files (x86)\\Steam\\steamapps",
        default: "C:\\Program Files (x86)\\Steam\\steamapps"
      },
      {
        type: "confirm",
        name: "createCards",
        message: "Are you making new cards?"
      },
      {
        type: "confirm",
        name: "createRelics",
        message: "Relics?"
      }
    ]);

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
        createCards: this.answers.createCards,
        createRelics: this.answers.createRelics
      }
    );

    // Custom Character
    this.fs.copyTpl(
      this.templatePath(`src/main/java/theTodo/TheTodo.java`),
      this.destinationPath(`src/main/java/${this.modIdCamel}/TheTodo.java`),
      {
        modIdPascal: this.answers.modIdPascal,
        modIdCamel: this.modIdCamel,
        createCards: this.answers.createCards,
        createRelics: this.answers.createRelics
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
        steamPath: this.answers.steamPath
      }
    );

    // Actions
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

    // Cardmods
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

    // Cards
    if (this.answers.createCards) {
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

    // Relics
    if (this.answers.createRelics) {
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
        modIdCamel: this.modIdCamel
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
        modIdCamel: this.modIdCamel
      }
    );

    // Delete unused stuff
    if (!this.answers.createCards) {
      this.fs.delete(
        `src/main/java/${this.modIdCamel}/util/CardArtRoller.java`
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
