import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";


@Injectable()
export class ParseUpperPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        if(typeof  value === 'string') {
            return value.toUpperCase();

        }

        if(typeof value === 'number'){
            throw new BadRequestException('El valor tiene que ser STRING')

        }
        return value;
    }

}