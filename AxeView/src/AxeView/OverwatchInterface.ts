﻿import { Overwatch } from "./Overwatch";
import { OverwatchingOutputType, OverwatchingType } from "./OverwatchingType";
import { AxeViewDomInterface, AxeViewMoveType } from "./AxeViewDomInterface";

/** 감시자 인터페이스 */
export interface OverwatchInterface
{
	/** 
	 * 찾을 이름
	 * 중괄호 두개({{이름}})로 감싸있는 이름을 찾는다.
	 * 옵션이 있는경우 골뱅이(@)로 구분한다({{이름@옵션}})
	 * 이 값은 대소문자를 구분해야한다.
	 * ☆주의☆ html은 속성(attribute)으로 사용할때는 케밥케이스(kebab-case)나 소문자로 사용해야 한다.
	 * html을 변환할때 속성은 소문자로 변환된다. (이로인해 문자 인식을 못하는 경우가 생길 수 있다.)
	 * */
	Name: string,
	/** 처음 바인딩될 동작
	 * 이벤트를 제외하면 문자열을 사용한다.
	 * 이벤트 함수는 'function (sender, event, owThis)' 이렇게 데이터가 전달된다.
	 * OverwatchingOutputType.Dom 경우에만 빈값이 허용된다.
	 * event : 이벤트 발생에 사용된 이벤트 개체(이벤트에 따라 다른 개체가 넘어옴)
	 * sender : 연결된 엘리먼트 개체
	 * owThis : 이 함수에 연결된 감시자 개체(Overwatch) */
	FirstData: string | Function | HTMLElement,

	/** 감시 타입 */
	OverwatchingOutputType: OverwatchingOutputType,
	/** 감시 방식 */
	OverwatchingType: OverwatchingType,
	/** 
	 *  한개만 감시할지 여부
	 *  true이면 일치하는것 하나만 나와도 뒤에 는 무시한다.
	 *  매칭 순서가 TextNode가 가장 우선이므로 눈으로 보이는 순서와 다를수 있다.
	 * */
	OverwatchingOneIs: boolean,

	/** 
	 * 전달할 옵션 
	 * 액스뷰 바인딩이 끝나고 전달할 옵션
	 * 옵션은 Html로 전달한 옵션을 최우선으로 사용한다.
	 */
	TossOption?: { [key: string]: string },

	/**
	 * Set동작이 시작되기전에 동작할 함수
	 * 이 이벤트는 연결된 개체의 개수만큼 호출된다.
	 * 리턴값인 문자열(string)은 해당 돔에 적용할 데이터가 문자열일때만 사용된다.(나머지 형식은 무시)
	 * @param objThis 이 이벤트가 발생한 감시대상
	 * @param axeDom 이 이벤트를 호출한 액스돔 개체
	 * @param data 전달된 값
	 */
	AxeDomSet_DataEdit?: (objThis: Overwatch, axeDom: AxeViewDomInterface, data: any) => string,
}

/** 감시자 전달 인터페이스 */
export interface OverwatchTossOptions<T>
{
	[key: string]: T;
}