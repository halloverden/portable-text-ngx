import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MockService } from '@core/services/mock.service';
import { tap } from 'rxjs';
import { PortableTextConfigInterface } from '../../projects/portable-text/src/lib/interfaces/portable-text-config.interface';
import { ArbitraryTypedObject } from "@portabletext/types";
import { ContentService } from '@core/services/content.service';
import { ClassifiedArbitraryTypedObject } from '../../projects/portable-text/src/lib/helpers/arbitrary-typed-object.helper';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  config: PortableTextConfigInterface = {
    overrides: {
      orderedList: (cato: ClassifiedArbitraryTypedObject) => {
        console.log(cato);
        return 'wef';
      }
    }
  };
  nodes: ArbitraryTypedObject[] = [];

  /**
   *
   * @param cdr
   * @param contentService
   * @param mockService
   */
  constructor(private cdr: ChangeDetectorRef,
              private contentService: ContentService,
              private mockService: MockService) {
  }

  /**
   *
   */
  ngOnInit(): void {
    this.contentService.getSamorgLocalUnionIntroData().pipe(
      tap((nodes: ArbitraryTypedObject[]) => {
        this.nodes = nodes;
        this.cdr.detectChanges();
      })
    ).subscribe();

    // this.mockService.getMock('simple.json').pipe(
    //   tap((nodes: ArbitraryTypedObject[]) => {
    //     this.nodes = nodes;
    //     this.cdr.detectChanges();
    //   })
    // ).subscribe();
  }
}
