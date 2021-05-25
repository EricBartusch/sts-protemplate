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
    copyActions();
    copyCardMods();
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

function copyActions() {
  this.fs.copyTpl(
    this.templatePath(
      "src/main/java/theTodo/actions/_ApplyCardModifierAction.java"
    ),
    this.destinationPath(
      "output/src/main/java/theTodo/actions/ApplyCardModifierAction.java"
    ),
    {
      modIdPascal: this.answers.modIdPascal,
      modIdCamal: toCamelCase(this.answers.modIdPascal)
    }
  );
  this.fs.copyTpl(
    this.templatePath(
      "src/main/java/theTodo/actions/_EasyModalChoiceAction.java"
    ),
    this.destinationPath(
      "output/src/main/java/theTodo/actions/EasyModalChoiceAction.java"
    ),
    {
      modIdPascal: this.answers.modIdPascal,
      modIdCamal: toCamelCase(this.answers.modIdPascal)
    }
  );
  this.fs.copyTpl(
    this.templatePath("src/main/java/theTodo/actions/_EasyXCostAction.java"),
    this.destinationPath(
      "output/src/main/java/theTodo/actions/EasyXCostAction.java"
    ),
    {
      modIdPascal: this.answers.modIdPascal,
      modIdCamal: toCamelCase(this.answers.modIdPascal)
    }
  );
  this.fs.copyTpl(
    this.templatePath("src/main/java/theTodo/actions/_RepeatCardAction.java"),
    this.destinationPath(
      "output/src/main/java/theTodo/actions/RepeatCardAction.java"
    ),
    {
      modIdPascal: this.answers.modIdPascal,
      modIdCamal: toCamelCase(this.answers.modIdPascal)
    }
  );
  this.fs.copyTpl(
    this.templatePath("src/main/java/theTodo/actions/_TimedVFXAction.java"),
    this.destinationPath(
      "output/src/main/java/theTodo/actions/TimedVFXAction.java"
    ),
    {
      modIdPascal: this.answers.modIdPascal,
      modIdCamal: toCamelCase(this.answers.modIdPascal)
    }
  );
}

function copyCardMods() {
  this.fs.copyTpl(
    this.templatePath("src/main/java/theTodo/cardmods/_EtherealMod.java"),
    this.destinationPath(
      "output/src/main/java/theTodo/cardmods/EtherealMod.java"
    ),
    {
      modIdPascal: this.answers.modIdPascal,
      modIdCamal: toCamelCase(this.answers.modIdPascal)
    }
  );
  this.fs.copyTpl(
    this.templatePath("src/main/java/theTodo/cardmods/_ExhaustMod.java"),
    this.destinationPath(
      "output/src/main/java/theTodo/cardmods/ExhaustMod.java"
    ),
    {
      modIdPascal: this.answers.modIdPascal,
      modIdCamal: toCamelCase(this.answers.modIdPascal)
    }
  );
  this.fs.copyTpl(
    this.templatePath("src/main/java/theTodo/cardmods/_LambdaMod.java"),
    this.destinationPath(
      "output/src/main/java/theTodo/cardmods/LambdaMod.java"
    ),
    {
      modIdPascal: this.answers.modIdPascal,
      modIdCamal: toCamelCase(this.answers.modIdPascal)
    }
  );
  this.fs.copyTpl(
    this.templatePath("src/main/java/theTodo/cardmods/_LambdaMod.java"),
    this.destinationPath(
      "output/src/main/java/theTodo/cardmods/LambdaMod.java"
    ),
    {
      modIdPascal: this.answers.modIdPascal,
      modIdCamal: toCamelCase(this.answers.modIdPascal)
    }
  );
}

// Function copyCards() {}

/*
Modid
modName - camal
ModName - pascal
description
steam path

*/
