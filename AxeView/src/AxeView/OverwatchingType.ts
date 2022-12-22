
/** 출력 방식 */
export const enum OverwatchingOutputType
{
	/** 설정없음.*/
	None = 0,

	/**
	 * 문자열 출력
	 * dom을 수정하지만 추적하지는 않는다.
	 * 속성(attribute)값에 적용된경우 교체(all replace)를 시도하므로 
	 * 이미 일치하는 문자열이 있으면 잘못교체될 수 있음을 명심해야 한다.
	 * */
	String,

	/**
	 * html 출력
	 * '속성(attribute)'과 같이 html이 적용되지 않는 경우 무시 된다.
	 * 
	 * */
	Html,
	
	/**
	 * 함수 연결 - 속성(attribute)이름 그대로 사용
	 * 함수는 속성(attribute)에서만 동작한다.
	 * 함수는 부분교체가 없고 무조건 전체교체다.
	 * 함수로 감시자가 매칭되면 해당 속성은 제거되고 이벤트 리스너가 추가된다.
	 * 이때 이벤트 리스너는 속성이름을 그대로 사용한다.
	 * 이렇게 되면 'onClick'으로 연결한 이벤트가 'click'으로 변환되지 않으므로 클릭이벤트가 발생하지 않는다.
	 * 이런경우 'Function_NameRemoveOn'타입을 사용해야 한다.
	 * */
	Function,

	/**
	 * 함수 연결 - 속성(attribute)이름 앞에 'on'이 있으면 제거
	 * 함수는 속성(attribute)에서만 동작한다.
	 * 속성이름이 'onClick'이면 이벤트리스너에 'click'으로 등록한다.
	 * 속성에서 추가하는 이벤트 이름에 'on'이 추가되어 있는 경우 사용한다.
	 * 이렇게 해야 클릭 이벤트가 발생했을때 동작한다.
	 * */
	Function_NameRemoveOn,
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
	 * data가 업데이트되면 같이 업데이트
	 * */
	Monitoring,
}