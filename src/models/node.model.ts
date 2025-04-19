import { NodeType } from "./enum/node-type.enum";

export interface Node {
  name: string;
  receiveType: number;
  receiveId: string;
  nodeType: NodeType;
  activationStatus: number;
  id: string;
}