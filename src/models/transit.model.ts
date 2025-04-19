import { TransitType } from "./enum/transit-type.enum";
import { Node } from "./node.model";

export class Transit {
  transitType: TransitType | undefined;
  name: string | undefined;
  entryNode: Node | undefined;
  exitNode: Node | undefined;
  id: string | undefined;
}