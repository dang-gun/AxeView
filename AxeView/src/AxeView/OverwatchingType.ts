
/** 감시 타입 */
export const enum OverwatchingType
{
	/** 설정없음.  Output과 똑같이 취급한다.*/
	None = 0,

	/**
	 * 단순 출력 - 문자열
	 * dom을 감시하기위한 get/set 도 생성하지 않는다.
	 * */
	Output_String = 100,

	/**
	 * 단순 출력 - html.
	 * '속성(attribute)'과 같이 html이 적용되지 않는 경우 무시 된다.
	 * */
	Output_Html = 101,
	
	/**
	 * 변수에 변화가 있으면 반영한다.(문자열, 숫자 등등)
	 * 'Action'으로 들어온 값을 감시하고 있다가 변화가 있으면 수정된다.
	 * 속성값에 적용된경우 교체(all replace)를 시도하므로 
	 * 이미 일치하는 문자열이 있으면 잘못교체될 수 있음을 명심해야 한다.
	 * */
	Monitoring_String = 200,
	/**
	 * 변수에 변화가 있으면 반영한다.(html 등등)
	 * '속성(attribute)'과 같이 html이 적용되지 않는 경우 무시 된다.
	 * */
	Monitoring_Html = 201,

}