import { PipeTransform, BadRequestException } from '@nestjs/common';
import { QuoteStatus } from '../quote-status.enum';

export class QuoteStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    QuoteStatus.ACTIVE,
    QuoteStatus.ARCHIVED,
    QuoteStatus.DELETED,
  ];

  transform(value: any) {
    if (!this.isValidStatus(value)) throw new BadRequestException(`Value ${value} is not a valid status.`);
    value = value.toUpperCase();
    return value;
  }

  private isValidStatus(status: any) {
    return this.allowedStatuses.indexOf(status) !== -1 ? true : false;
  }
}
