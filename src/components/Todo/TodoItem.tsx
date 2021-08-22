import { useCallback, useState } from "react";

export type Item = {
  name: string;
  description: string;
};

export type RemoveItem = (index: number) => void;
export type ChangeItem = (index: number, item: Item) => void;

type Props = {
  index: number;
  item: Item;
  onRemoveItem: RemoveItem;
  onChangeItem: ChangeItem;
};

export function TodoItem({ item, index, onChangeItem, onRemoveItem }: Props) {
  const [name, setName] = useState(item.name);
  const [description, setDescription] = useState(item.description);
  const handleBlur = useCallback(
    () => onChangeItem(index, { name, description }),
    [index, name, description, onChangeItem]
  );

  return (
    <li>
      <button onClick={() => onRemoveItem(index)} onBlur={handleBlur}>
        Remove
      </button>{" "}
      <input
        value={name}
        onChange={(event) => setName(event.target.value)}
        onBlur={handleBlur}
      />
      <hr />
      <textarea
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
    </li>
  );
}
