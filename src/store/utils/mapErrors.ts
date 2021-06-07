import { Error } from '../types';

export function mapErrors(errors: Error[]) {
    const mappedErrors: Record<string, any> = {};

    errors.forEach((error) => {
        if (error.path.length > 0) {
            if (error.path.length > 1) {
                if (!mappedErrors[error.path[0]]) {
                    mappedErrors[error.path[0]] = {};
                    mappedErrors[error.path[0]][error.path[1]] = error.message;
                } else {
                    mappedErrors[error.path[0]][error.path[1]] = error.message;
                }
            } else {
                mappedErrors[error.path[0]] = error.message;
            }
        }
    });

    return mappedErrors;
}
