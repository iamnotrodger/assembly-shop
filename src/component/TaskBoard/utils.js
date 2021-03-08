export const filterTask = (tasks) => {
    const todo = [];
    const doing = [];
    const done = [];

    tasks.forEach((task, index) => {
        const { completed, activeLog, totalTime } = task;
        task.index = index;

        if (completed) {
            done.push(task);
        } else if (activeLog || totalTime > 0) {
            doing.push(task);
        } else {
            todo.push(task);
        }
    });

    return { todo, doing, done };
};
