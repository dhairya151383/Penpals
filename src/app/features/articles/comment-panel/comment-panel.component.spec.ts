import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommentPanelComponent } from './comment-panel.component';
import { CommentsComponent } from '../comments/comments.component';

describe('CommentPanelComponent', () => {
  let component: CommentPanelComponent;
  let fixture: ComponentFixture<CommentPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentPanelComponent, CommentsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CommentPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have default visibility as false', () => {
    expect(component.visible).toBe(false);
  });

  it('should accept articleId as input', () => {
    component.articleId = 'abc123';
    expect(component.articleId).toBe('abc123');
  });

  it('should emit "closed" event when close() is called', () => {
    const spy = jest.spyOn(component.closed, 'emit');
    component.close();
    expect(spy).toHaveBeenCalled();
  });
});
