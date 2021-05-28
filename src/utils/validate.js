import * as yup from 'yup';

export const ProjectNameSchema = yup
    .string()
    .min(1)
    .max(100)
    .matches(
        /^[a-zA-Z0-9 _.!#&()[\]/-]+$/i,
        'Project Name must now have special characters',
    )
    .required('Project Name is required');

export const TaskTitleSchema = yup.string().required('Task Title is required');

export const TeamNameSchema = yup
    .string()
    .min(1)
    .max(100)
    .matches(
        /^[a-zA-Z0-9 _.!#&()[\]/-]+$/i,
        'Team Name must now have special characters',
    )
    .required('Team Name is required');

export const ProjectSchema = yup.object().shape({
    name: ProjectNameSchema,
    team: yup
        .object()
        .shape({
            teamID: yup.number().required(),
        })
        .nullable()
        .required('Team is required'),
});

export const TeamSchema = yup.object().shape({
    name: TeamNameSchema,
});

export const TaskSchema = yup.object().shape({
    title: TaskTitleSchema,
});
