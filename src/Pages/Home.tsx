import { DraggableList } from '@/Features/Category/DraggableList/ui/draggableList'

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

const categoriesList = [
    {
        id: '39e7d9b3-c111-40b2-bed6-441ddef09d88',
        title: 'new one',
        priorityOrder: 1,
        createdAt: '2023-11-20T19:10:51.704Z',
        updatedAt: '2023-11-20T19:10:51.704Z',
    },
    {
        id: 'c9ea8e2d-d505-45e6-a9e7-40a5cd5bd316',
        title: 'new on2e',
        priorityOrder: 1,
        createdAt: '2023-11-20T19:11:29.389Z',
        updatedAt: '2023-11-20T19:11:29.389Z',
    },
    {
        id: '74fb7735-2cd5-4631-a6de-1b9b06bb1952',
        title: 'new on23e',
        priorityOrder: 2,
        createdAt: '2023-11-20T19:12:46.912Z',
        updatedAt: '2023-11-20T19:12:46.912Z',
    },
    {
        id: 'c6c6fdbd-1b2b-47d5-83c8-6a2435a44728',
        title: 'on23e2',
        priorityOrder: 2,
        createdAt: '2023-11-22T08:04:31.515Z',
        updatedAt: '2023-11-22T08:04:31.515Z',
    },
    {
        id: '137b1b88-d3a8-41db-842e-abfd329cecf9',
        title: 'новая 3',
        priorityOrder: 100,
        createdAt: '2023-11-22T18:28:59.052Z',
        updatedAt: '2023-11-22T18:28:59.052Z',
    },
    {
        id: '79d7701b-a8f2-40be-803b-96d5b167a8d8',
        title: 'Novaya',
        priorityOrder: 99,
        createdAt: '2023-11-22T18:28:12.741Z',
        updatedAt: '2023-11-22T18:39:24.914Z',
    },
]
export default function HomePage() {
    return (
        <div style={{ backgroundColor: 'white' }}>
            <p>Добро пожаловать в TheBoards - todoApp by Dmitry Barer</p>
            <br />

            <DraggableList arr={categoriesList} />
        </div>
    )
}
