import { Transit } from "./transit.model";
import { Node } from "./node.model";

export class FlowInfo {
  matchNode!: Node;
  formId!: string;
  currentNodeId!: string;
  nodes!: Node[];
  transits!: Transit[];
  id: string = '';
}