import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleListCarouselComponent } from './article-list-carousel.component';

describe('ArticleListCarouselComponent', () => {
  let component: ArticleListCarouselComponent;
  let fixture: ComponentFixture<ArticleListCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticleListCarouselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticleListCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
