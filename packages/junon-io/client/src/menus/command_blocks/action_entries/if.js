const Node = require("../node")
const Comparison = require("../comparison")

class If extends Node {
  constructor(parent, data, render) {
    super(parent.game, data)

    this.parent = parent

    if(render) this.el = this.createEl()

    this.parseData(data)
  }

  parseData(data) {
    this.conditions = []

    if (!data.conditions) return

    data.conditions.forEach((condition) => {
      if (condition.comparison) {
        new Comparison(this, condition.comparison)
      }
    })
  }

  addCondition(condition) {
    this.conditions.push(condition)
  }

  removeCondition(condition) {
    let index = this.conditions.indexOf(condition)
    if (index !== -1) {
      this.conditions.splice(index, 1)
    }
  }

  finishAdd(data) {
    super.finishAdd(data)

    let comparison = new Comparison(this, {})
    comparison.submitSave()
  }

  createEl() {
    let row = document.createElement("div")
    row.classList.add('if')
    row.classList.add('tab_1')
    row.dataset.id = this.id
    row.innerText = "If:"

    this.parent.appendChildEl(row)
    return row
  }

  getNodeType() {
    return "if"
  }

  getNodeValue() {
    return "if"
  }

  appendChildEl(el) {
    this.el.appendChild(el)
  }

 
}

module.exports = If
