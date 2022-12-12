/** 액스뷰에서 사용하는 돔 형식 */
export interface AxeViewDomInterface
{
	/**
	 * 대상 돔
	 * 사용하는 옵션에 따라 HTMLElement나 Node가 저장될 수 있다.
	 * 이 오ㅂ
	 * */
	Dom: HTMLElement | Node;


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
}
