import { createContext, useContext, useEffect, useReducer } from 'react';
import { getTasks } from '../../api/TaskAPI';
import { useLoadingAction } from '../LoadingContext';
import { reducer, TASK_ACTIONS } from './utils';

const TasksContext = createContext();

export const TasksProvider = ({ children, projectID }) => {
    const [tasks, tasksDispatch] = useReducer(reducer, []);

    const setLoading = useLoadingAction();

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const tasks = await getTasks(projectID);
                tasksDispatch({ type: TASK_ACTIONS.LOAD, payload: tasks });
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        })();
    }, [projectID, setLoading]);

    return (
        <TasksContext.Provider value={{ tasks, tasksDispatch }}>
            {children}
        </TasksContext.Provider>
    );
};

const useTasks = () => {
    const context = useContext(TasksContext);
    if (context === undefined) {
        throw new Error('useTasks must be used within a TasksProvider');
    }
    return context;
};

export default useTasks;
