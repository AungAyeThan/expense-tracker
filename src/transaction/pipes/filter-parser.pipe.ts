import { Injectable, PipeTransform } from '@nestjs/common';

import { Filter } from '../type/filter';
@Injectable()
export class FilterParserPipe implements PipeTransform {
    async transform(filter?: string): Promise<Filter> {
        if (!filter) {
            return {};
        }
        
        return filter.split(',').reduce((acc, part) => {
            const [key, value] = part.split('=').map(decodeURIComponent);
            acc[key] = value;
            return acc;
        }, {} as Filter);
    }
}