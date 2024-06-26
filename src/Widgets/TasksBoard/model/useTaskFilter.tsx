import { ITask, selectTaskFilter } from '@/Entities/Tasks'
import { useAppSelector } from '@/Shared/Lib/Hooks'

export const useTaskFilter = (tasks?: ITask[]): ITask[] | [] => {
    const filter = useAppSelector(selectTaskFilter)

    if (!tasks) {
        return []
    }

    if (!filter) {
        return [...tasks]
    }

    switch (filter.type) {
        case 'tag':
            return tasks.filter((task) => {
                const temptags =
                    !task.tags && task.dueDate
                        ? ['food', 'birthday', 'fun', 'attention', 'game']
                        : task.tags
                          ? task.tags
                          : []
                return temptags.includes(filter.value)
            })

        default:
            return [...tasks]
    }
}
