const Helper = require("../../../../../common/helper")
const Command = require("../command")
const Node = require("../node")
const SocketUtil = require("../../../util/socket_util")

class ActionEntry extends Node {
  static build(parent, data, handleActionValues) {
    let klass = this
    return new klass(parent, data, handleActionValues)
  }

  constructor(parent, data, handleActionValues=true) {
    super(parent.game, data)

    this.parent = parent
    this.commandBlock = parent.commandBlock

    this.actionKey = data.actionKey || ""

    this.el = this.createEl()
    this.el.addEventListener("click", this.onContainerClick.bind(this), true)

    if(handleActionValues) this.handleActionValues(data) 

    this.parent.addAction(this)
  }

  handleActionValues(data) {
    throw new Error("must implement handleActionValues")
  }

  finishAdd(data) {
    this.actionKey = data.value
    this.replaceId(data.id)
    this.redraw()
  }

  createEl() {
    throw new Error("must implement createEl")
  }

  onContainerClick() {

  }

  redraw() {
    this.el.querySelector(".action_key").innerText = Helper.capitalize(this.actionKey)
  }

  appendChildEl(el) {
    this.el.querySelector(".action_value_list").appendChild(el)
  }

  submitSave() {
    let data = {
      operation: "add",
      tempId: this.id,
      parentId: this.parent.id,
      value: this.actionKey,
      type: "ActionEntry"
    }

    SocketUtil.emit("EditCommandBlock", data)
  }

  remove() {
    super.remove()
    this.parent.removeAction(this)
  }

}

module.exports = ActionEntry