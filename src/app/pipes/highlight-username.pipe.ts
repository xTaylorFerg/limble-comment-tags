import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlightUsername',
  standalone: true
})
export class HighlightUsernamePipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return value;

    const usernamePattern = /(^|\s)@(\w+)/g;

    return value.replace(usernamePattern, '$1<strong>@$2</strong>');
  }

}
