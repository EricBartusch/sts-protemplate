"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");

module.exports = class extends Generator {
  async prompting() {
    this.log(
      yosay(`Welcome to the ${chalk.red("StS-yo-protemplate")} generator!`)
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
        message: "Where is steam installed? (ex. E:\\Games\\Steam\\steamapps)",
        default: "C:\\Program Files (x86)\\Steam\\steamapps"
      }
    ]);
    this.modIdCamel = toCamelCase(this.answers.modIdPascal);
  }

  writing() {
    // The big two
    this.fs.copyTpl(
      this.templatePath(`src/main/java/theTodo/TheTodo.java`),
      this.destinationPath(
        `output/src/main/java/${this.modIdCamel}/TheTodo.java`
      ),
      {
        modIdPascal: this.answers.modIdPascal,
        modIdCamel: this.modIdCamel
      }
    );

    this.fs.copyTpl(
      this.templatePath(`src/main/java/theTodo/TodoMod.java`),
      this.destinationPath(
        `output/src/main/java/${this.modIdCamel}/${this.answers.modIdPascal}.java`
      ),
      {
        modIdPascal: this.answers.modIdPascal,
        modIdCamel: this.modIdCamel
      }
    );

    // Pom
    this.fs.copyTpl(
      this.templatePath("pom.xml"),
      this.destinationPath("output/pom.xml"),
      {
        modIdPascal: this.answers.modIdPascal,
        modIdCamel: this.modIdCamel,
        modIdLower: this.answers.modIdPascal.toLowerCase(),
        steamPath: this.answers.steamPath
      }
    );

    // Actions
    this.fs.copyTpl(
      this.templatePath(`src/main/java/theTodo/actions/*`),
      this.destinationPath(`output/src/main/java/${this.modIdCamel}/actions/`),
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
      this.destinationPath(`output/src/main/java/${this.modIdCamel}/cardmods/`),
      {
        modIdPascal: this.answers.modIdPascal,
        modIdCamel: this.modIdCamel
      },
      null,
      { globOptions: { dot: true } }
    );

    // Cards
    this.fs.copyTpl(
      this.templatePath(`src/main/java/theTodo/cards/**/*`),
      this.destinationPath(`output/src/main/java/${this.modIdCamel}/cards/`),
      {
        modIdPascal: this.answers.modIdPascal,
        modIdCamel: this.modIdCamel
      },
      null,
      { globOptions: { dot: true } }
    );

    // Powers
    this.fs.copyTpl(
      this.templatePath(`src/main/java/theTodo/powers/*`),
      this.destinationPath(`output/src/main/java/${this.modIdCamel}/powers/`),
      {
        modIdPascal: this.answers.modIdPascal,
        modIdCamel: this.modIdCamel
      },
      null,
      { globOptions: { dot: true } }
    );

    // Relics
    this.fs.copyTpl(
      this.templatePath(`src/main/java/theTodo/relics/*`),
      this.destinationPath(`output/src/main/java/${this.modIdCamel}/relics/`),
      {
        modIdPascal: this.answers.modIdPascal,
        modIdCamel: this.modIdCamel
      },
      null,
      { globOptions: { dot: true } }
    );

    // Util
    this.fs.copyTpl(
      this.templatePath(`src/main/java/theTodo/util/*`),
      this.destinationPath(`output/src/main/java/${this.modIdCamel}/util/`),
      {
        modIdPascal: this.answers.modIdPascal,
        modIdCamel: this.modIdCamel
      },
      null,
      { globOptions: { dot: true } }
    );

    // Resources
    this.fs.copyTpl(
      this.templatePath(`src/main/resources/**/*`),
      this.destinationPath(`output/src/main/resources/`),
      {
        modIdPascal: this.answers.modIdPascal,
        modIdCamel: this.modIdCamel
      },
      null,
      { globOptions: { dot: true } }
    );
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

/*
Modid
modName - camal
ModName - pascal
description
steam path

*/
