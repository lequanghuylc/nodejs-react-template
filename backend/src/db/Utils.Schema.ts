
export const stringifyDataType = (property) => ({
  set(val) {
    const stringifyVal : any = JSON.stringify(val);
    this.setDataValue(property, stringifyVal);
  },
  get() {
    const toBeParsedValue : any = this.getDataValue(property);
    if (toBeParsedValue) return JSON.parse(toBeParsedValue);
  }
});

export const compareOldNewValue = (model, property) => {
  // console.log('old ' + property, model?.dataValues[property])
  // console.log('new ' + property, model?._previousDataValues[property])
  return model?.dataValues[property] === model?._previousDataValues[property];
}

