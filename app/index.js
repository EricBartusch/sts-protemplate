"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");

module.exports = class extends Generator {
  async prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the ${chalk.red("generator-sts-test")} generator!`)
    );

    this.answers = await this.prompt([
      {
        type: "input",
        name: "modid",
        message: "Modid:"
      }
    ]);
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath("src/main/java/theTodo/_TodoMod.java"),
      this.destinationPath("output/src/main/java/theTodo/TodoMod.java"),
      { modid: this.answers.modid }
    );
  }
};

/*
Modid
modName - camal
ModName - pascal
description
steam path

*/
