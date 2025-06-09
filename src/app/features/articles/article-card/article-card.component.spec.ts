import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArticleCardComponent } from './article-card.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ArticleDatePipe } from '../../../shared/pipes/article-date.pipe';
import { Component } from '@angular/core';

describe('ArticleCardComponent', () => {
  let component: ArticleCardComponent;
  let fixture: ComponentFixture<ArticleCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticleCardComponent, RouterTestingModule, ArticleDatePipe],
    }).compileComponents();

    fixture = TestBed.createComponent(ArticleCardComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set showTags to true if showTags input is undefined', () => {
    component.showTags = undefined as unknown as boolean;

    component.ngOnChanges({
      showTags: {
        currentValue: undefined,
        previousValue: true,
        firstChange: true,  // Add this property
        isFirstChange: () => true,
      }
    });

    expect(component.showTags).toBe(true);
  });

  it('should respect the value of showTags when defined', () => {
    component.showTags = false;

    component.ngOnChanges({
      showTags: {
        currentValue: false,
        previousValue: true,
        firstChange: false,  // Add this property
        isFirstChange: () => false,
      }
    });

    expect(component.showTags).toBe(false);
  });

  it('should bind article input', () => {
    const testArticle = {
      title: 'Test Article',
      briefDescription: 'Brief',
      content: 'Full content',
      authorId: '123',
      publishDate: new Date(),
    };

    component.article = testArticle;
    fixture.detectChanges();

    expect(component.article.title).toBe('Test Article');
  });
});
