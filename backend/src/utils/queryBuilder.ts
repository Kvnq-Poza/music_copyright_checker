import { FilterQuery, Types } from 'mongoose';
import { Model } from 'mongoose';

export const buildQuery = (model: Model<any>, query: any): FilterQuery<any> => {
    const builtQuery: FilterQuery<any> = {};

    if (!model) {
        throw new Error('Model is required');
    }

    const schemaPaths = model.schema.paths;

    const processField = (key: string, value: any) => {
        const originalKey = key.replace(/_(start|end)$/, '');
        if (schemaPaths[originalKey]) {
            const fieldType = schemaPaths[originalKey].instance;
            switch (fieldType) {
                case 'ObjectId':
                    if (Types.ObjectId.isValid(value)) {
                        builtQuery[key] = new Types.ObjectId(value);
                    }
                    break;
                case 'String':
                    if (value) {
                        builtQuery[key] = { $regex: new RegExp(value, 'i') };
                    }
                    break;
                case 'Number':
                    if (!isNaN(value)) {
                        builtQuery[key] = parseInt(value, 10);
                    }
                    break;
                case 'Boolean':
                    builtQuery[key] = value;
                    break;
                case 'Date':
                    if (value) {
                        const dateCondition = key.endsWith('_start') ? '$gte' : key.endsWith('_end') ? '$lte' : null;

                        if (dateCondition) {
                            if (!builtQuery[originalKey]) {
                                builtQuery[originalKey] = {};
                            }

                            builtQuery[originalKey][dateCondition] = new Date(value);
                        }
                    }
                    break;
                case 'Mixed':
                    if (typeof JSON.parse(value) === 'object') {
                        for (const nestedField in JSON.parse(value)) {
                            const nestedValue = JSON.parse(value)[nestedField];
                            builtQuery[`${key}.${nestedField}`] = nestedValue
                        }
                    }
                    break;
                // case 'Array':
                //     if (Array.isArray(value)) {
                //         builtQuery[key] = { $in: value };
                //     }
                //     break;
            }
        }
    };

    for (const key in query) {
        processField(key, query[key]);
    }

    const page = parseInt(query.page, 10) || 1;
    const limit = parseInt(query.limit, 10) || 10;
    const skip = (page - 1) * limit;
    console.log('Generated Query:', { query: builtQuery, options: { limit, skip } });
    return { query: builtQuery, options: { limit, skip } };
};


