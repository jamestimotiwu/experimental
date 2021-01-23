import EffectNode from "./effectnode";
const TYPE = "TransformNode";

class TransformNode extends VideoContext.NODES.EffectNode {
  constructor(gl, renderGraph, definition) {
    super(gl, renderGraph, definition);
    this._displayName = TYPE;
    this._propertyUpdates = [];
  }

  updateProperty(propertyName, value) {
    this._propertyUpdates.push({
      property: propertyName,
      value: value,
    })
  }

  _update(currentTime) {
    super._update(currentTime);
    for(const prop of this._propertyUpdates) {
      this[prop.property] = prop.value;
    }
    this._propertyUpdates = [];
  }
}

export { TYPE as TRANSFORMTYPE };
export default TransformNode;
