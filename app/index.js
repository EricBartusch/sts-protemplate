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
      }
    ]);
  }

  writing() {
    // The big two
    this.fs.copyTpl(
      this.templatePath("src/main/java/theTodo/*"),
      this.destinationPath("output/src/main/java/theTodo/"),
      {
        modIdPascal: this.answers.modIdPascal,
        modIdCamal: toCamelCase(this.answers.modIdPascal)
      },
      null,
      { globOptions: { dot: true } }
    );

    // Actions
    this.fs.copyTpl(
      this.templatePath("src/main/java/theTodo/actions/*"),
      this.destinationPath("output/src/main/java/theTodo/actions/"),
      {
        modIdPascal: this.answers.modIdPascal,
        modIdCamal: toCamelCase(this.answers.modIdPascal)
      },
      null,
      { globOptions: { dot: true } }
    );

    // Cardmods
    this.fs.copyTpl(
      this.templatePath("src/main/java/theTodo/cardmods/*"),
      this.destinationPath("output/src/main/java/theTodo/cardmods/"),
      {
        modIdPascal: this.answers.modIdPascal,
        modIdCamal: toCamelCase(this.answers.modIdPascal)
      },
      null,
      { globOptions: { dot: true } }
    );

    // Cards
    this.fs.copyTpl(
      this.templatePath("src/main/java/theTodo/cards/**/*"),
      this.destinationPath("output/src/main/java/theTodo/cards/"),
      {
        modIdPascal: this.answers.modIdPascal,
        modIdCamal: toCamelCase(this.answers.modIdPascal)
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
