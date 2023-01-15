import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

/** Directive used in <button/> component.
 *
 * @usage
 * <button class="btn btn-success" loadingButton
 *  [label]="'Buscar'"
 *  [loadingLabel]="'Buscando...'"
 *  [isDisabledButton]="isSearchingData"
 *  [icon]="'fas fa-chevron-circle-down'"
 *  [isDisabledByValidation]="form.invalid">
 * </button>
 */

@Directive({
  selector: '[loadingButton]'
})
export class LoadingButton implements OnChanges {
  /**
   * @property [isDisabledButton] controlls the button disabled state, default "false"
   */
  @Input() isDisabledButton = false;

  /**
   * @property [isDisabledByValidation] controlls the button disabled state, default "null"
   */
  @Input() isDisabledByValidation: boolean;

  /**
   * Required
   *
   * @property [label] text displayed in the button callback
   */
  @Input() label: string;

  /**
   * NO Required
   *
   * @property [loadingLabel] text displayed in the button while it's in loading state
   */
  @Input() loadingLabel: string;

  /**
   * @property [icon] icon displayed in the button while it is not in loading state
   */
  @Input() icon: string;

  constructor(private elementRef: ElementRef) { }

  ngOnChanges(): void {
    if (this.isDisabledByValidation === true) {
      this.elementRef.nativeElement.disabled = this.isDisabledByValidation;
      this.elementRef.nativeElement.innerHTML = this.buildLabelTpl(this.icon, this.label);
    } else {
      this.elementRef.nativeElement.disabled = this.isDisabledButton;
      this.elementRef.nativeElement.innerHTML = this.isDisabledButton
        ? this.buildLoadingTplContent(this.loadingLabel)
        : this.buildLabelTpl(this.icon, this.label);
    }
  }

  /**
   * Build a HTML template to use as label while it is not in loading state
   *
   * @param icon
   * @param label
   * @return a HTML either with an icon plus label, or just the label, the result is depending if the icon has a value
   */
  private buildLabelTpl = (icon: string, label: string): string =>
    icon
      ? `<i class="${icon}" aria-hidden="true"></i><span> ${label} </span>`
      : `<span> ${label} </span>`;

  /**
   * Build a loading HTML template to use as label while it is in loading state
   *
   * @param loadingLabel
   * @return a HTML either with just a spin icon, or a spin icon plus loading label, the result is depending if the loading label has a value.
   */
  private buildLoadingTplContent = (loadingLabel: string): string =>
    loadingLabel
      ? `Descargando PDF... <b> ${loadingLabel} </b>`
      : `Descargando PDF...`;
}
