/** 액스뷰에서 사용하는 돔 형식 */
export interface AxeViewDomInterface
{
	/**
	 * 대상 돔
	 * 사용하는 옵션에 따라 각이 다른 오브젝트가 저장될 수 있다.
	 * */
	Dom: HTMLElement | Node | Attr;


	AxeViewDomType: AxeViewDomType;
}

export const enum AxeViewDomType
{
	/** 없음. 동작하지 않음 */
	none = 1,

	/** HTMLElement로 변환하여 동작함 */
	HTMLElement,

	/** Node로 변환하여 동작함 */
	Node,

	/** 속성 - 값없는 속성 */
	Attr_Valueless,
	/** 속성 - 값이 하나만 있는 속성 */
	Attr_OneValue,
	/** 속성 - 값을 교체해야 하는 경우 */
	Attr_ReplaceValue,

	/** 이벤트 */
	Attr_Event,
}
