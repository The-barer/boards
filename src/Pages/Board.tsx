import { useParams } from 'react-router-dom'
import { AddTask, CreateTask } from '@/Features/Task/CreateTask'

const tasks = [
    {
        id: '4f259a07-c2a7-48e7-89d1-6d895c89a998',
        title: 'таска',
        description: '',
        status: 'inprogress',
        dueDate: null,
        priorityOrder: 2,
        createdAt: '2023-11-22T18:55:40.081Z',
        updatedAt: '2023-11-22T18:55:40.081Z',
    },
    {
        id: '7dce9326-2e34-44c9-bb04-06fd243b5480',
        title: 'Завершена',
        description: 'Описать суть таски',
        status: 'done',
        dueDate: null,
        priorityOrder: 3,
        createdAt: '2023-11-22T18:56:13.544Z',
        updatedAt: '2023-11-22T19:37:44.574Z',
    },
    {
        id: 'f95ca02f-4ffd-4b79-bbfc-589439c1835b',
        title: 'таска',
        description: 'Описать суть таски',
        status: 'backlog',
        dueDate: null,
        priorityOrder: 3,
        createdAt: '2023-12-01T08:22:03.064Z',
        updatedAt: '2023-12-01T08:22:03.064Z',
    },
    {
        id: 'c3ff9b84-fc97-445f-a585-876a7fa52579',
        title: 'таска',
        description: 'Описать суть таски',
        status: 'todo',
        dueDate: null,
        priorityOrder: 3,
        createdAt: '2023-12-01T08:22:27.392Z',
        updatedAt: '2023-12-01T08:22:27.392Z',
    },
    {
        id: '1286f5a8-993e-4068-8e00-f591228d9518',
        title: 'таска',
        description: 'Описать суть таски',
        status: 'review1',
        dueDate: null,
        priorityOrder: 3,
        createdAt: '2023-12-01T08:23:43.965Z',
        updatedAt: '2023-12-01T08:23:43.965Z',
    },
]

export const Board = () => {
    const { boardId } = useParams()

    return (
        <div>
            <div className="title">Board {boardId}</div>
            <AddTask />
            <CreateTask close={() => console.log('close')} />
        </div>
    )
}
