
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
	 * 단순 출력 - html 
	 * */
	Output_Html = 101,
	
	/**
	 * 변수에 변화가 있으면 반영한다.(문자열, 숫자 등등)
	 * 'Action'으로 들어온 값을 감시하고 있다가 변화가 있으면 수정된다.
	 * 내부적으로는 dom개체의 주소가 백업되고 get/set이 생성된다.
	 * */
	Monitoring_String = 200,
	
	Monitoring_Html = 201,

}