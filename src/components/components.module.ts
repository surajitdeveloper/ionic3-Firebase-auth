import { NgModule } from '@angular/core';
import { Header1Component } from './header1/header1';
import { ReviewsComponent } from './reviews/reviews';
import { SpecificationComponent } from './specification/specification';
import { TechnicalDetailsComponent } from './technical-details/technical-details';
@NgModule({
	declarations: [Header1Component,
    ReviewsComponent,
    SpecificationComponent,
    TechnicalDetailsComponent],
	imports: [],
	exports: [Header1Component,
    ReviewsComponent,
    SpecificationComponent,
    TechnicalDetailsComponent]
})
export class ComponentsModule {}
