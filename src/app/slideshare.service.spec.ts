import { TestBed } from '@angular/core/testing';

import { SlideshareService } from './slideshare.service';

describe('SlideshareService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SlideshareService = TestBed.get(SlideshareService);
    expect(service).toBeTruthy();
  });
});
