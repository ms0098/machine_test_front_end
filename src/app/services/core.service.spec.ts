import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreService } from './core.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('CoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [CoreService],
    imports: [
      RouterTestingModule,
      HttpClientTestingModule,
      MatSnackBarModule
    ]
  }));

  it('should be created', () => {
    const service: CoreService = TestBed.get(CoreService);
    expect(service).toBeTruthy();
  });
});
