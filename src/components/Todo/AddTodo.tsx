import { useCallback, useRef } from "react";
import type { Item } from "./TodoItem";

export type AddItem = (item: Item) => void;

type Props = {
  onAddItem: AddItem;
};

export function AddTodo({ onAddItem }: Props) {
  const nameRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

  const handleAdd = useCallback(() => {
    const name = nameRef.current!.value;
    const description = descriptionRef.current!.value;

    nameRef.current!.value = "";
    descriptionRef.current!.value = "";

    return onAddItem({ name, description });
  }, [onAddItem]);

  return (
    <div>
      <input ref={nameRef} type="text" name="name" />
      <hr />
      <textarea name="description" ref={descriptionRef} />
      <hr />
      <button onClick={handleAdd}>Add todo</button>
    </div>
  );
}
