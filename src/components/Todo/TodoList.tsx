import { useCallback, useEffect, useState } from "react";
import { AddItem, AddTodo } from "./AddTodo";
import { Item, RemoveItem, ChangeItem, TodoItem } from "./TodoItem";

const LS_KEY = "todo_list_pwa";

type ItemWithKey = Item & { key: number };

type ItemList = ItemWithKey[];

function toLocalStorage(list: ItemList) {
  localStorage.setItem(LS_KEY, JSON.stringify(list));
}

function fromLocalStorage(): ItemList {
  return JSON.parse(localStorage.getItem(LS_KEY) ?? JSON.stringify([]));
}

export function TodoList() {
  const [list, setList] = useState(fromLocalStorage);

  useEffect(() => {
    toLocalStorage(list);
  }, [list]);

  const addItem: AddItem = useCallback((item) => {
    setList((currentList) => {
      const itemWithKey: ItemWithKey = {
        ...item,
        key: Date.now(),
      };
      return [...currentList, itemWithKey];
    });
  }, []);

  const removeItem: RemoveItem = useCallback((index) => {
    setList((currentList) =>
      currentList.filter((item) => item !== currentList[index])
    );
  }, []);

  const updateItem: ChangeItem = useCallback((index, newItem) => {
    setList((currentList) => {
      const item = currentList[index];

      return Object.assign([], currentList, {
        [index]: { ...item, ...newItem },
      });
    });
  }, []);

  return (
    <>
      <ol>
        {list.map((item, index) => (
          <TodoItem
            onChangeItem={updateItem}
            onRemoveItem={removeItem}
            index={index}
            item={item}
            key={item.key}
          />
        ))}
      </ol>

      <AddTodo onAddItem={addItem} />
    </>
  );
}
