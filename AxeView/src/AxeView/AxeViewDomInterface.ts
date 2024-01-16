/** 액스뷰에서 사용하는 돔 형식 */
export interface AxeViewDomInterface
{
	/**
	 * 대상 돔
	 * 사용하는 옵션에 따라 각이 다른 오브젝트가 저장될 수 있다.
	 * */
	Dom: HTMLElement | Node | Attr | Function;

	/**
	 * 소속 부모 돔
	 * this.Dom이 확정되었을때 기준 부모.
	 * 일반적으로 AxeView가 바인딩 될때 확정된 부모이다.
	 * 
	 * 각종 처리를 하다보면 부모돔을 찾을 수 없는 경우가 있어서 저장해 둔다.
	 * AxeView는 돔이동을 염두하지않으므로 확정된 돔만으로 처리한다.
	 * 처리 시점은 바인딩이 끝난시점이므로 그전에 접근하면 null이 나온다.
	 */
	ParentDom?: HTMLElement | null;

	/**
	 * 화면에 표시된 데이터
	 * 조건에 따라서 각 액스돔의 출력값이 다를 수 있다.
	 * 그래서 실제 표시된 값을 별도로 저장한다.
	 * !!주의!! 돔과 같은 특수동작의 경우 저장을 안할 수도 있다.
	 * !!주의!! undefined면 이상한 동작을 하므로 최소 빈값으로 초기화 해준다.
	 */
	DataView: string;

	/** 액스뷰에서 동작할 방식 */
	AxeViewDomType: AxeViewDomType;

	/** 이벤트 이름이 필요할때 추가한다. */
	EventName?: string | null;

	/** 이벤트 내용이 필요할때 추가한다. */
	Event?: EventListener | null;

	/**
	 * 뷰단에서 넘어온 옵션
	 */
	TossOption: { [key: string]: string };

	/** 
	 * 뷰단에서 넘어온 옵션을 지정한 형식으로 변환한다.
	 * 변환된 타입은 무조건 문자열(string)이다. 형식> {key:string}
	 * 인터페이스로 변환은 별도의 유틸리티를 사용하거나 직접 해야 한다.
	 */
	TossOptionType: <T>() => T;

}


/** 액스뷰에서 동작할 방식 */
export const enum AxeViewDomType
{
	/** 없음. 동작하지 않음 */
	none = 1,

	/** 
	 * HTMLElement로 변환하여 동작함 
	 * div를 생성하여 자식을 지우고 넣는다.
	 *
	 * Html문자열을 판별하여 HTMLElement로 변환하는 기능도 있다.
	 * 
	 * 
	 * */
	HTMLElement,

	/** 
	 * Node로 변환하여 동작함
	 * TextNode가 여기에 해당된다.(다른 경우는 없다.)
	 */
	Node,

	/** 
	 * Dom을 그대로 적용
	 * Dom이 아닌 다른 형식이 들어오면 무시된다.
	 * 
	 * 돔 자체를 교체한다.
	 * */
	Dom,

	/** 
	 * 속성 - 값없는 속성
	 * 이 속성으로 지정되면 동적 타입변경이 무시된다.
	 * html의 속성이름은 대문자를 허용하지 않으므로 실제론 소문자로 처리된다.(AxeView에서 변환하는 것이 아니다.)
	 * html에서 허용하지 않는 형식을 넣으면 실제 입력되는 값과 다르거나 오류를 일으킬 수 있다.
	 */
	Attr_Valueless,
	/** 속성 - 값이 하나만 있는 속성 */
	Attr_OneValue,
	/** 속성 - 값을 교체해야 하는 경우 */
	Attr_ReplaceValue,

	/** 속성 - 이벤트 */
	Attr_Event,

	/** 속성 - 값 모니터링(UI 우선), 전체 교체로만 동작함 */
	Attr_ValueMonitoring,

	
}
