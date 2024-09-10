import { TestBed } from '@angular/core/testing';

import { MusicCheckerService } from './music-checker.service';

describe('MusicCheckerService', () => {
  let service: MusicCheckerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MusicCheckerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
