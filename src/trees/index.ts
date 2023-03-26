import { PrimitiveSingle } from "../../types";

type PrimitiveRecord = Record<string, PrimitiveSingle|PrimitiveSingle[]>;

type Node<T extends PrimitiveRecord> = T & {
    children?: NodeTree<T>
};

type NodeTree<T extends PrimitiveRecord = PrimitiveRecord> = Array<T | Node<T>>

function isLeafNode<T extends PrimitiveRecord>(node: T | Node<T>): node is T {
    if ('children' in node) {
        return false;
    } else {
        return true;
    }
}

export function *iterateLeaves<T extends PrimitiveRecord>(parentNode: Node<T>):Iterable<T> {
    if (!parentNode.children || !(parentNode.children && parentNode.children.length)) {
        if (parentNode.children) {
            delete parentNode.children;
        }
        yield parentNode;
    } else {
        for (const child of parentNode.children) {
            if (!isLeafNode(child)) {
                yield *iterateLeaves(child);
            } else {
                yield child;
            }
        }
    }
}