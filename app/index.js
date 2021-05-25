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
    this.fs.copyTpl(
      this.templatePath("src/main/java/theTodo/_TodoMod.java"),
      this.destinationPath("output/src/main/java/theTodo/TodoMod.java"),
      {
        modIdPascal: this.answers.modIdPascal,
        modIdCamal: toCamelCase(this.answers.modIdPascal)
      }
    );
    this.fs.copyTpl(
      this.templatePath("src/main/java/theTodo/_TheTodo.java"),
      this.destinationPath("output/src/main/java/theTodo/TheTodo.java"),
      {
        modIdPascal: this.answers.modIdPascal,
        modIdCamal: toCamelCase(this.answers.modIdPascal)
      }
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
