import { useState, useEffect } from 'react';
import axios from 'axios';

// Todoのインターフェース
interface Todo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

// Postのインターフェース
// Todoを継承し、更にbodyプロパティを追加したもの
interface Post extends Todo {
    body: string;
}

// Itemのインターフェース
interface Item {
    id: number;
    title: string;
}

// リソースの種類
type ResourceType = 'todos' | 'posts';

export default function ItemList() {
    // 取得したアイテムを格納するための状態管理(初期状態は空配列)
    const [items, setItems] = useState<Item[]>([]);
    // どちらのリソースを取得するかの状態管理
    const [resource, setResource] = useState<ResourceType>('todos');

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get(
                    `https://jsonplaceholder.typicode.com/${resource}`
                );
                console.log(response);
                const itemData = response.data.map(
                    (responseData: Todo | Post) => {
                        return { id: responseData.id, title: responseData.title };
                    }
                );
                setItems(itemData);
            } catch (err) {
                console.error(err);
            }
        };
        fetchItems();
    }, [resource]);
    // ボタンクリックでどちらのリソースを取得するかを決める
    const onTodoButtonClick = () => {
        setResource('todos');
    };
    const onPostButtonClick = () => {
        setResource('posts');
    };
    return (
        <div>
            <button
                onClick={() => onTodoButtonClick()}

            >
                Todos
            </button>
            <button
                onClick={() => onPostButtonClick()}
            >
                Posts
            </button>
            <ul>
                {items.map((item) => (
                    <li key={item.id}>{item.title}</li>
                ))}

            </ul>
        </div>
    )    
}