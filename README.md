
# sts-protemplate
Yeoman generator for starting up new Slay the Spire mods.
Based on the [template made by DarkVexon](https://github.com/DarkVexon/ProTemplate)

Note: If you're new to modding Slay the Spire, don't use this.
Instead follow the guide [here](https://github.com/Gremious/StS-DefaultModBase/wiki)

## How to use

1. Install [yeoman](https://yeoman.io/learning/)
2. Run `npm install -g generator-sts-protemplate`
3. Navigate to your local git repo
4. Run `yo sts-protemplate` and follow prompts

If you want to start at an absolutely blank slate, run `yo sts-protemplate --empty` and follow the prompts

## Don't want to use yeoman? Try this:

Download the .zip of [this branch](https://github.com/EricBartusch/sts-protemplate/tree/no-yeoman-please)

Replace all:

1. `<%= modIdPascal %>` with your mod name in PascalCase
2. `<%= modIdCamel %>` with your mod name in camelCase
3. `<%= modIdLower %>` with your mod name in lowercase
4. `<%= modIdSpaces %>` with your mod name With Spaces
5. `<%= steamPath %>` with your steam path (e.g. C:\Program Files (x86)\Steam\steamapps)
6. Change the folder name from `src\main\java\theTodo\` to `src\main\java\camelCaseModName`
7. Change the name of `TodoMod.java` to `PascalModName.java`

## Future TODOs
* Include Intellij (and other?) files so debugging is available without additional setup 
