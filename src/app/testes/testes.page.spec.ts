import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestesPage } from './testes.page';

describe('TestesPage', () => {
  let component: TestesPage;
  let fixture: ComponentFixture<TestesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
