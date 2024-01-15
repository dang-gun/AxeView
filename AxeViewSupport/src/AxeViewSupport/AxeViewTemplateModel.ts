//AxeView.njsproj 프로젝트를 상대경로로 참조
import AxeView, {
	Overwatch
	, OverwatchInterface
	, OverwatchingOutputType
	, OverwatchingType
} from "../../../AxeView/src/AxeView/AxeView";

import FixString from './Global/GlobalAxeViewSupport_FixString';
import GlobalAxeViewSupport from './Global/GlobalAxeViewSupport';

/** 
 * Axe View Template 모델 
 * 
 */
export default class AxeViewTemplateModel
{
	/** 구분용 이름 - 원본*/
	private NameOri: string = "";
	/** 구분용 이름*/
	public get Name(): string
	{
		return this.NameOri;
	}
	/** 구분용 이름*/
	public set Name(value: string)
	{
		this.NameOri = value;
	}

	/** 가지고 있는 템플릿 엘리먼트 원본*/
	private TemplateElem: HTMLTemplateElement | null = null;


	/**
	 * Axe View Template을 세팅한다.
	 * 전달된 Element의 자식만 템플릿으로 사용된다.
	 * @param domParent 템플릿으로 사용할 자식이 들어있는 부모 개체
	 * @param bParenAttrRemove 부모의 템플릿을 지정하는 속성을 제거할지 여부  
	 */
	constructor(
		domParent: Element
		, bParenAttrRemove: boolean)
	{
		//템플릿을 저장할 엘리먼트 생성
		this.TemplateElem = document.createElement("template");

		//모든 자식을 옮긴다.
		while (domParent.firstChild)
		{
			this.TemplateElem.appendChild(domParent.firstChild);
		}

		if (true == bParenAttrRemove)
		{//부모의 템플릿 속성 제거
			this.TemplateElem.removeAttribute(FixString.AxeViewTemplate);
		}
	}
	
	
}

