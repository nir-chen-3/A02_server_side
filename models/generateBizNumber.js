import _ from "lodash";
import Card from "./cardModel.js";

async function generateBizNumber() {
  while (true) {
    const random = _.random(100, 9_999_999_999);
    const existing = await Card.findOne({ bizNumber: random });
    if (!existing) return random;
  }
}

export default generateBizNumber;
