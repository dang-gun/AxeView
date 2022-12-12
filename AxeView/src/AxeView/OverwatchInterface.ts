import { OverwatchingType } from "./OverwatchingType"

/** 감시자 인터페이스 */
export interface OverwatchInterface
{
	/** 
	 *  찾을 이름
	 * 중괄호 두개({{이름}})로 감싸있는 이름을 찾는다
	 * */
	Name: string,
	/** 처음 바인딩될 동작
	 * 단순 출력 : string
	 * 모니터링 : string
	 * 이벤트(Event) : function */
	Action: any,

	/** 감시 타입 */
	OverwatchingType: OverwatchingType,
	/** 
	 *  한개만 감시할지 여부
	 *  true이면 일치하는것 하나만 나와도 뒤에 는 무시한다.
	 * */
	OverwatchingOneIs: boolean,
}