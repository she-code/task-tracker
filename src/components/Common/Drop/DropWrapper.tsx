import React from "react";
import { useDrop } from "react-dnd";
import { useAppSelector } from "../../../app/hooks";
import { RootState } from "../../../app/store";

export default function DropWrapper() {
  // const statuses = useAppSelector(
  //   (state: RootState) => state.statuses.statuses
  // );
  // const [{ isOver }, drop] = useDrop({
  //   accept: "CARD",
  //   // canDrop(item, monitor) {
  //   //     const itemIndex = status.cards.findIndex(
  //   //         (card) => card.id === item.id
  //   //     );
  //   //     const statusIndex = status.cards.findIndex(
  //   //         (card) => card.id === status.id
  //   //     );
  //   //     const isLastItem = status.cards.length - 1 === itemIndex;
  //   //     return (
  //   //         (statusIndex < itemIndex && statusIndex !== -1) || isLastItem
  //   //     );
  //   // },
  //   canDrop(item: any, monitor) {
  //     const itemIndex = statuses.findIndex((si) => si.id === item.status);
  //     const statusIndex = statuses.findIndex((si) => si.id === status.status);
  //     // const isLastItem = statuses.length - 1 === itemIndex;
  //     return [itemIndex + 1, itemIndex - 1, itemIndex].includes(statusIndex);
  //   },
  //   drop(item, monitor) {
  //     onDrop(item, monitor, status);
  //   },
  //   collect(monitor) {
  //     return {
  //       isOver: monitor.isOver(),
  //     };
  //   },
  // });
  // return <div ref={drop}>{React.cloneElement(children, { isOver })}</div>;
  return <div>DropWrapper</div>;
}
