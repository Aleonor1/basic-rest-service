'use strict';
class DogClipper {
  constructor(name, description, difficultyLevel, id) {
    this.name = name;
    this.description = description;
    this.difficultyLevel = difficultyLevel;
    this.id = id;
  }

  getName() {
    return this.name;
  }

  getDescription() {
    return this.description;
  }

  getDifficultyLevel() {
    return this.difficultyLevel;
  }

  getId() {
    return this.id;
  }

  setName(name) {
    this.name = name;
  }

  setDescription(description) {
    this.description = description;
  }

  setDifficultyLevel(level) {
    this.difficultyLevel = level;
  }

  setId(id) {
    this.id = id;
  }
}

module.exports = DogClipper;
