import { Pipe, PipeTransform } from '@angular/core';
import { Article } from '../models/article.model';

@Pipe({
  name: 'articleDate',
  standalone: true
})
export class ArticleDatePipe implements PipeTransform {
  transform(article: Article | null | undefined): Date | null {
    if (!article) {
      return null;
    }
    const dateToUse: Date | string | null | undefined = article.updatedAt || article.publishDate;

    if (dateToUse instanceof Date) {
        return dateToUse;
    } else if (typeof dateToUse === 'string') {
        // This case should ideally not happen if ArticleService works as expected,
        // but it's a safeguard for the type checker.
        try {
            const parsedDate = new Date(dateToUse);
            if (!isNaN(parsedDate.getTime())) {
                return parsedDate;
            }
        } catch (e) {
            console.error("Error parsing date string in ArticleDatePipe:", dateToUse, e);
        }
    }
    return null;
  }
}