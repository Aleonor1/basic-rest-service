"use strict";
class DogClipper {
  constructor(name, description, difficultyLevel, id) {
    this.name = name;
    this.description = description;
    this.difficultyLevel = difficultyLevel;
    this.id = id;
  }

  get getName() {
    return this.name;
  }

  get getDescription() {
    return this.description;
  }

  get getDifficultyLevel() {
    return this.difficultyLevel;
  }

  get getId() {
    return this.id;
  }

  set setName(name) {
    this.name = name;
  }

  set setDescription(description) {
    this.description = description;
  }

  set setDifficultyLevel(level) {
    this.difficultyLevel = level;
  }

  set setId(id) {
    this.id = id;
  }
}

module.exports = DogClipper;
