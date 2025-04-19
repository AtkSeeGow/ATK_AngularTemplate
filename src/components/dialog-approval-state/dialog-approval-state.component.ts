import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlowInfo } from '../../models/flow-info.model';
import { NodeType } from '../../models/enum/node-type.enum';
import { TransitType } from '../../models/enum/transit-type.enum';
import { Transit } from '../../models/transit.model';
import { Node } from '../../models/node.model';

@Component({
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  selector: 'dialog-approval-state',
  templateUrl: './dialog-approval-state.html'
})
export class DialogApprovalStateComponent implements OnChanges {
  @Input() flowInfo: FlowInfo = new FlowInfo();

  nodes: Node[] = [];
  NodeType = NodeType;
  
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.flowInfo && this.flowInfo.transits) {
      var node = this.flowInfo.nodes.find((node: Node) => node.nodeType === NodeType.Start);
      this.nodes.push(node!);

      while (node) {
        var transit = this.flowInfo.transits.find((transit: Transit) =>
          transit.entryNode?.id === node!.id && (
            transit.transitType == TransitType.Submit ||
            transit.transitType == TransitType.Approve ||
            transit.transitType == TransitType.None))!;
        node = undefined;
        if (transit) {
          node = transit?.exitNode!;
          this.nodes.push(node);
        }
      }
    }
  }


}