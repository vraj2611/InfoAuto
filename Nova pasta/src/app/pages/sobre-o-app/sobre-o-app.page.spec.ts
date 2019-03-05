import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SobreOAppPage } from './sobre-o-app.page';

describe('SobreOAppPage', () => {
  let component: SobreOAppPage;
  let fixture: ComponentFixture<SobreOAppPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SobreOAppPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SobreOAppPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
