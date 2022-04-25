import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MockService} from './mock.service';
import {tap} from 'rxjs';
import {
  PortableTextConfigInterface
} from '../../projects/portable-text/src/lib/interfaces/portable-text-config.interface';
import {ArbitraryTypedObject} from "@portabletext/types";

@Component({
  selector: 'app-root',
  template: '<ngx-portable-text [nodes]="nodes" [config]="config"></ngx-portable-text>',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  config: PortableTextConfigInterface = {};
  nodes: ArbitraryTypedObject[] = [];

  /**
   *
   * @param cdr
   * @param mockService
   */
  constructor(private cdr: ChangeDetectorRef,
              private mockService: MockService) {}

  /**
   *
   */
  ngOnInit(): void {
    this.mockService.getMock('simple.json').pipe(
      tap((nodes: ArbitraryTypedObject[]) => {
        this.nodes = nodes;
        this.cdr.detectChanges();
      })
    ).subscribe();
  }
}
