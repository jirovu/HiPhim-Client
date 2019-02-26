import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadBottomSheetComponent } from './upload-bottom-sheet.component';

describe('UploadBottomSheetComponent', () => {
  let component: UploadBottomSheetComponent;
  let fixture: ComponentFixture<UploadBottomSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadBottomSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
