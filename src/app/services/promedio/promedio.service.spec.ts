import { TestBed } from '@angular/core/testing';
import { PromedioService } from './promedio.service';

describe('PromedioService', () => {
  let service: PromedioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PromedioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
