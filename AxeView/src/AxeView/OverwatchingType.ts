﻿
/** 출력 방식 */
export const enum OverwatchingOutputType
{
	/** 설정없음.*/
	None = 0,

	/**
	 * 문자열 출력
	 * 속성(attribute)값에 적용된경우 교체(all replace)를 시도하므로 
	 * 이미 일치하는 문자열이 있으면 잘못교체될 수 있음을 명심해야 한다.
	 * 'Monitoring_OneValue'옵션을 사용할 수 있는 상황이면 성능향상에 도움이 된다.
	 * 
	 * String, Html, Dom은 Overwatch.OutputTypeChange_All을 이용하여 출력타입을 변경할 수 있다.
	 * 
	 * OverwatchingType.Unidentified : 감시 타입을 모를때는 대부분 문자열로 동작한다.
	 * */
	String,


	/**
	 * html 출력 - 노드 전용
	 * '속성(attribute)'과 같이 html이 적용되지 않는 경우 무시(감시하지 않음) 된다.
	 * 
	 * String, Html, Dom은 Overwatch.OutputTypeChange_All을 이용하여 출력타입을 변경할 수 있다.
	 * */
	Html,
	
	/**
	 * 함수 연결 - 속성(attribute)이름 그대로 사용, 속성 전용
	 * 함수는 속성(attribute)에서만 동작한다.(그외는 감시하지 않음)
	 * 함수는 부분교체가 없고 무조건 전체교체다.
	 * 함수로 감시자가 매칭되면 해당 속성은 제거되고 이벤트 리스너가 추가된다.
	 * 이때 이벤트 리스너는 속성이름을 그대로 사용한다.
	 * 이렇게 되면 'onClick'으로 연결한 이벤트가 'click'으로 변환되지 않으므로 클릭이벤트가 발생하지 않는다.
	 * 이런경우 'Function_NameRemoveOn'타입을 사용해야 한다.
	 * 
	 * 함수 타입은 무조건 'OverwatchingType.Monitoring'으로만 동작한다.
	 * */
	Function,

	/**
	 * 함수 연결 - 속성(attribute)이름 앞에 'on'이 있으면 제거, 속성 전용
	 * 함수는 속성(attribute)에서만 동작한다.
	 * 속성이름이 'onClick'이면 이벤트리스너에 'click'으로 등록한다.
	 * 속성에서 추가하는 이벤트 이름에 'on'이 추가되어 있는 경우 사용한다.
	 * 이렇게 해야 클릭 이벤트가 발생했을때 동작한다.
	 * 
	 * 함수 타입은 무조건 'OverwatchingType.Monitoring'으로만 동작한다.
	 * 
	 * Unidentified : 불확실 타입인데 이벤트로 판단되면 이 타입이 사용된다.
	 * */
	Function_NameRemoveOn,

	/**
	 * 돔 개체 - 노드 전용
	 * 속해있는 돔 개체(HTMLElement)를 가지고 있는다.
	 * Set을하면 replaceChild으로 처리된다.
	 * ☆주의☆ html dom은 한개만 감시가 가능하다.
	 * 여러개를 감시하려고하면 'replaceChild'에서 에러가 발생한다.
	 * 
	 * String, Html, Dom은 Overwatch.OutputTypeChange_All을 이용하여 출력타입을 변경할 수 있다.
	 */
	Dom,

}

/** 감시 방식  */
export const enum OverwatchingType
{
	/** 
	 *  첫 바인딩될때만 출력.
	 *  첫 바인딩 될때만 출력하고 추적하지 않는다.
	 * */
	OutputFirst,

	/**
	 * data가 업데이트되면 같이 업데이트.
	 * 속성(attribute)의 경우 무조건 교체(replace)로만 동작한다.
	 * '교체'는 빈값을 할수 없으므로 가능하면 빈값을 넣지 않는것이 좋다.
	 * 속성(attribute)에서 쓸때는 교체가능한 고유값을 아무거나 넣어서 교체할 수 있도록 하자.
	 * 만약 빈값이 들어가게되면 임의의 이름이 생성되어 들어가게 된다.
	 * 
	 * 띄어쓰기에 의한 오류 가능성이 있다.
	 * 가능하면 데이터에 띄어쓰기를 넣지 않는것이 좋다.
	 * */
	Monitoring,

	/**
	 * data가 업데이트되면 같이 업데이트.
	 * 문자열 전용으로 'OverwatchingOutputType.String'일때만 동작한다.
	 * 속성값에 사용되는 경우 자신외에 다른 데이터가 없으면 
	 * 리플레이스가 아닌 전체값을 변경하는 동작을 한다.
	 * 당연히 'Monitoring'보다 속도가 더 빠르다.
	 * 
	 * 대신 액스뷰외의 다른방식으로 dom을 컨트롤 하는 경우 데이터가 소실된다.
	 * 다른 데이터가 없으면 재할당으로 동작하므로 빈값이여도 동작한다.
	 * 단, 다른 데이터가 있으면 교체(replace)로 동작한다.
	 * '교체'는 빈값을 할수 없으므로 빈값을 넣으면 임의의 값으로 변환된다.
	 * */
	Monitoring_OneValue,

	/**
	 * 속성(attribute)의 값(value)만 모니터링 하고 사용자의 입력값을 감시한다.
	 * 문자열 전용으로 'OverwatchingOutputType.String'일때만 동작한다.
	 * 무조건 UI에 있는 값을 우선한다.(data를 읽으면 UI의 값과 일치한다.)
	 * 이 옵션을 선택하면 속성의 이름이 'value'인것만 감시하게 된다.
	 * 무조건 전체 교체로만 동작하므로 주의해야 한다.
	 * 
	 * 이 옵션은 'OverwatchingOneIs=true'와 함께 사용하는 것이 좋은데
	 * 여러개가 적중하더라도 값은 맨처음 적중한 dom 하나만 출력되기 때문이다.
	 * 
	 * 내부적으로는 이벤트리스너의 'change'이벤트로 구현되어 있다.
	 * 돔개체를 가지고 있어도 읽기/쓰기가 되는데 UI에서 값을 변경하면 
	 * 이유는 모르겠지만 기존 돔연결이 깨지는 것 처럼 보이는 현상이 있다.
	 * 이 이유때문에 값(value)가 재대로 읽어지질 않는다.
	 * 그래서 'change'를 넣어 값이 변경되면 돔이 가지고 있는 값도 수정하도록 변경하였다.
	 * 'change'이벤트 특성상 포커스가 없어져야 데이터가 갱신된다.
	 * */
	Monitoring_AttrValue,

	/**
	 * 속성(attribute)의 값(value)만 모니터링 하고 사용자의 입력값을 감시한다.
	 * Monitoring_AttrValue동일하지만 연결하는 이벤트만 'input'로 변경됐다.
	 * 'input'으로 연결되어 키보드가 입력될 때 마다 데이터가 갱신된다.
	 * 
	 * 불확실(Unidentified) 타입인 경우 input태그는 모두 이 속성으로 변경된다.
	 */
	Monitoring_AttrValue_Input,


	/**
	 * 불확실
	 * 어떤 타입인지 모를때 보다는 자동으로 타입을 찾을때 사용한다.
	 * 이 타입으로 지정되어 있으면 기본값으로 설정된 다른 옵션들이 무시되거나 변경될 수 있다.
	 * 다른 타입이 확정되면 이 타입은 강제로 확정된 타입으로 변경된다.
	 * 불확실 타입은 값이 고정되면 의미가 없으므로 OutputFirst로는 절대 동작할 수 없다.(무조건 모니터링만 가능)
	 * 
	 * 노드를 검사하여 적절하다고 판단되는 감시방식중 하나를 선택하여 변경해준다.
	 * (OutputFirst로는 변경되지 않음)
	 * 속성(attribute)과 이벤트(Event)는 구분할 방법이 없으므로 속성으로만 동작한다.
	 */
	Unidentified,

}