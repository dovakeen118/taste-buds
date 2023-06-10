class StepSerializer {
  static getList(steps) {
    return steps.map((step) => this.getDetails(step));
  }

  static getDetails(step) {
    const allowedAttributes = ["id", "body"];

    let serializedStep = {};
    for (const attribute of allowedAttributes) {
      serializedStep[attribute] = step[attribute];
    }

    return serializedStep;
  }
}

export default StepSerializer;
