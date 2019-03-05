import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VeiculoscadastradosPage } from './veiculoscadastrados.page';

describe('VeiculoscadastradosPage', () => {
  let component: VeiculoscadastradosPage;
  let fixture: ComponentFixture<VeiculoscadastradosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VeiculoscadastradosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VeiculoscadastradosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
